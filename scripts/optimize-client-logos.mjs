import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "public", "client-logos", "source");
const outputDir = path.join(rootDir, "public", "client-logos", "optimized");
const logoExtensions = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const maxOutputWidth = 520;
const maxOutputHeight = 160;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function slugify(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function sampleBackground(pixels, width, height) {
  const size = Math.max(4, Math.floor(Math.min(width, height) * 0.08));
  const samples = [];

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const inCorner =
        (x < size && y < size) ||
        (x >= width - size && y < size) ||
        (x < size && y >= height - size) ||
        (x >= width - size && y >= height - size);

      if (!inCorner) continue;

      const offset = (y * width + x) * 4;
      if (pixels[offset + 3] > 240) {
        samples.push([pixels[offset], pixels[offset + 1], pixels[offset + 2]]);
      }
    }
  }

  if (!samples.length) {
    return { r: 255, g: 255, b: 255, lum: 255 };
  }

  const totals = samples.reduce(
    (acc, [r, g, b]) => {
      acc.r += r;
      acc.g += g;
      acc.b += b;
      return acc;
    },
    { r: 0, g: 0, b: 0 }
  );

  const r = totals.r / samples.length;
  const g = totals.g / samples.length;
  const b = totals.b / samples.length;

  return { r, g, b, lum: luminance(r, g, b) };
}

function getBounds(alphaMask, width, height) {
  let left = width;
  let right = -1;
  let top = height;
  let bottom = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (alphaMask[y * width + x] <= 8) continue;

      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }

  if (right < left || bottom < top) {
    return { left: 0, top: 0, width, height };
  }

  const pad = Math.max(2, Math.round(Math.min(width, height) * 0.02));
  left = Math.max(0, left - pad);
  top = Math.max(0, top - pad);
  right = Math.min(width - 1, right + pad);
  bottom = Math.min(height - 1, bottom + pad);

  return {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  };
}

function removeEnclosedLightCutouts(data, alphaMask, width, height) {
  const totalPixels = width * height;
  const visited = new Uint8Array(totalPixels);
  let visiblePixels = 0;

  for (let index = 0; index < totalPixels; index += 1) {
    if (alphaMask[index] > 16) {
      visiblePixels += 1;
    }
  }

  const maxCutoutArea = Math.max(16, Math.round(visiblePixels * 0.045));

  function isVisible(index) {
    return alphaMask[index] > 16;
  }

  function isLightPixel(index) {
    const offset = index * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const spread = Math.max(r, g, b) - Math.min(r, g, b);

    return alphaMask[index] > 96 && luminance(r, g, b) > 232 && spread < 58;
  }

  for (let index = 0; index < totalPixels; index += 1) {
    if (visited[index] || !isLightPixel(index)) continue;

    const stack = [index];
    const component = [];
    let touchesTransparent = false;
    visited[index] = 1;

    while (stack.length) {
      const current = stack.pop();
      component.push(current);

      const x = current % width;
      const y = Math.floor(current / width);
      const neighbors = [
        { next: current - 1, valid: x > 0 },
        { next: current + 1, valid: x < width - 1 },
        { next: current - width, valid: y > 0 },
        { next: current + width, valid: y < height - 1 },
      ];

      for (const { next, valid } of neighbors) {
        if (!valid) {
          touchesTransparent = true;
          continue;
        }

        if (!isVisible(next)) {
          touchesTransparent = true;
          continue;
        }

        if (!visited[next] && isLightPixel(next)) {
          visited[next] = 1;
          stack.push(next);
        }
      }
    }

    if (!touchesTransparent && component.length <= maxCutoutArea) {
      for (const cutoutIndex of component) {
        alphaMask[cutoutIndex] = 0;
      }
    }
  }
}

async function optimizeLogo(fileName) {
  const inputPath = path.join(sourceDir, fileName);
  const outputPath = path.join(outputDir, `${slugify(fileName)}.png`);
  const image = sharp(inputPath, { density: 320, limitInputPixels: false })
    .rotate()
    .resize({ width: 1800, height: 1000, fit: "inside", withoutEnlargement: true })
    .ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const background = sampleBackground(data, width, height);
  const transparentPixels = Array.from({ length: width * height }, (_, index) => data[index * 4 + 3]).filter(
    (alpha) => alpha < 245
  ).length;
  const hasUsefulAlpha = transparentPixels / (width * height) > 0.02;
  const darkBackground = !hasUsefulAlpha && background.lum < 130;
  const alphaMask = new Uint8ClampedArray(width * height);
  const output = Buffer.alloc(width * height * 4);

  for (let index = 0; index < width * height; index += 1) {
    const offset = index * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const sourceAlpha = data[offset + 3];
    const lum = luminance(r, g, b);
    const colorDistance = Math.max(Math.abs(r - background.r), Math.abs(g - background.g), Math.abs(b - background.b));

    let alpha = 0;
    if (hasUsefulAlpha) {
      alpha = sourceAlpha;
    } else if (darkBackground) {
      alpha = clamp((lum - background.lum - 22) * 5, 0, 255);
    } else {
      alpha = clamp((colorDistance - 18) * 6, 0, 255);
    }

    alphaMask[index] = alpha;
    output[offset] = 17;
    output[offset + 1] = 24;
    output[offset + 2] = 39;
    output[offset + 3] = alpha;
  }

  if (hasUsefulAlpha) {
    removeEnclosedLightCutouts(data, alphaMask, width, height);

    for (let index = 0; index < width * height; index += 1) {
      output[index * 4 + 3] = alphaMask[index];
    }
  }

  const bounds = getBounds(alphaMask, width, height);

  await sharp(output, { raw: { width, height, channels: 4 } })
    .extract(bounds)
    .resize({ width: maxOutputWidth, height: maxOutputHeight, fit: "inside", withoutEnlargement: false })
    .png({ compressionLevel: 9, palette: true })
    .toFile(outputPath);

  return path.relative(rootDir, outputPath);
}

async function main() {
  await fs.mkdir(sourceDir, { recursive: true });
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });

  const files = (await fs.readdir(sourceDir)).filter((fileName) => logoExtensions.has(path.extname(fileName).toLowerCase()));
  const optimized = [];

  for (const fileName of files.sort((a, b) => a.localeCompare(b))) {
    optimized.push(await optimizeLogo(fileName));
  }

  console.log(`Optimized ${optimized.length} client logo${optimized.length === 1 ? "" : "s"}.`);
  for (const filePath of optimized) {
    console.log(`- ${filePath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
