Drop client or project logo files into `source/`.

Supported formats: svg, png, jpg, jpeg, webp, avif.

Then run:

```bash
npm run logos:optimize
```

The optimizer writes rail-ready black-and-white transparent PNGs into `optimized/`. The homepage logo slider renders only files from `optimized/`.

File names become the accessible logo names, so use clear names like:

- milk.svg
- tripletto.png
- seyko-studios.webp

`npm run build` runs the optimizer automatically before building.
