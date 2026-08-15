# Khairy Eid Ali — Personal Portfolio

A compact bilingual personal portfolio built with React, Vite, and a simple card-based visual system. The website is designed to run as a standalone static site on GitHub Pages without platform-specific analytics or visible branding.

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm check
pnpm build
```

The production output is generated in `dist/public`.

## GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` builds and deploys the `main` branch to GitHub Pages. In the repository settings, open **Pages**, choose **GitHub Actions** as the source, and push to `main` to trigger the deployment.

## Project links

Project URLs are intentionally empty until the real links are available. To activate a project button, add its URL to the corresponding `url` field in `client/src/pages/Home.tsx`. Until then, the modal displays a non-clickable “Link unavailable” state rather than sending visitors to a fake destination.
