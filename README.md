# Lakshan Perera — 3D Portfolio

A responsive minimal 3D developer portfolio built with React, TypeScript, Vite, Three.js, React Three Fiber, Drei and Framer Motion.

## Run locally

1. Install Node.js (Node 20 LTS recommended).
2. Open this folder in VS Code or Cursor.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Personalize

- Edit your name, introduction, links and project details in `src/data.ts`.
- Replace placeholder project URLs with your real GitHub repositories and live demos.
- Update the email address in `src/data.ts`.
- Add your own resume at `public/Lakshan-Perera-CV.pdf` and uncomment/update the resume link in `src/components/Hero.tsx`.

## Deploy

### Vercel
Import your GitHub repository into Vercel. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.

### GitHub Pages
This project uses a relative Vite base (`./`) so built assets can work on a project site. For a user site (`lakshanbp.github.io`), push the project to that repository and configure GitHub Actions to build and publish `dist`.

## Notes

The 3D canvas is intentionally lightweight. It respects reduced-motion preferences and uses a static CSS fallback when reduced motion is enabled.
