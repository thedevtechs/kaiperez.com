import fs from "node:fs";
import path from "node:path";
import { clientLogoFallbacks, credibilitySection } from "../lib/content";
import VoicesSection from "./VoicesSection";

const logoExtensions = new Set([".svg", ".png", ".jpg", ".jpeg", ".webp", ".avif"]);

function humanizeLogoName(fileName) {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  const words = withoutExtension.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

  if (!words) {
    return "Client";
  }

  return words.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function getUploadedLogos() {
  const logoDir = path.join(process.cwd(), "public", "client-logos", "optimized");

  try {
    return fs
      .readdirSync(logoDir, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => logoExtensions.has(path.extname(fileName).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((fileName) => ({
        name: humanizeLogoName(fileName),
        src: `/client-logos/optimized/${encodeURIComponent(fileName)}`,
      }));
  } catch {
    return [];
  }
}

function LogoTrack({ logos }) {
  const marqueeLogos = Array.from({ length: 4 }, () => logos).flat();

  return (
    <div className="client-logo-track">
      {marqueeLogos.map((logo, index) => (
        <div className="client-logo-card" key={`${logo.name}-${index}`}>
          {logo.src ? (
            <img src={logo.src} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="client-logo-wordmark">{logo.name}</span>
          )}
          {logo.detail ? <small className="mono">{logo.detail}</small> : null}
        </div>
      ))}
    </div>
  );
}

export default function CredibilitySection() {
  const uploadedLogos = getUploadedLogos();
  const logos = uploadedLogos.length ? uploadedLogos : clientLogoFallbacks;

  return (
    <section className="section credibility-section" aria-labelledby="credibility-title">
      <div className="credibility-shell">
        <div className="credibility-head">
          <span className="sec-eyebrow mono">{credibilitySection.eyebrow}</span>
          <h2 id="credibility-title">{credibilitySection.title}</h2>
          <p>{credibilitySection.lede}</p>
        </div>

        <ul className="sr-only">
          {logos.map((logo) => (
            <li key={logo.name}>{logo.name}</li>
          ))}
        </ul>

        <div className="client-logo-marquee" aria-hidden="true">
          <LogoTrack logos={logos} />
        </div>

        <VoicesSection />
      </div>
    </section>
  );
}
