# VIKITAY GROUP Website

## Project Structure

```
vikitay-website/
├── index.html              # Entry point, loads EmailJS CDN + /src/main.jsx
├── src/
│   ├── main.jsx            # React root render (StrictMode + App)
│   ├── App.jsx             # Router: all routes for pages, services, cases
│   ├── vikitay-website.jsx # Main landing page (hero, services, about, cases, contact form)
│   ├── ServicePage.jsx     # Individual service detail page (reusable template)
│   ├── CasePage.jsx        # Case study gallery page
│   ├── servicesData.js     # Service data (transliterated EN + Russian versions)
│   ├── OrbitImages.jsx     # Animated elliptical orbit image carousel component
│   ├── OrbitImages.css     # Styles for orbit component
│   ├── index.css           # Tailwind CSS entry (@import "tailwindcss")
│   └── App.css             # Unused default Vite template CSS (can be deleted)
├── public/images/           # Static assets (PNG images, hero video, logo)
├── vite.config.js
├── postcss.config.js        # Tailwind v4 via @tailwindcss/postcss
├── eslint.config.js
├── wrangler.jsonc           # Cloudflare Pages config (SPA mode)
└── package.json
```

## Tech Stack

- **React 19** with JSX (no TypeScript)
- **Vite 7** for dev/build
- **React Router DOM 7** (BrowserRouter, client-side routing)
- **Motion (Framer Motion)** v12 — orbit animation component
- **Tailwind CSS v4** via PostCSS plugin
- **Lenis** — smooth scroll library (dependency, usage in main page)
- **EmailJS** — contact form submissions (loaded via CDN in index.html)

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint check
```

## Deployment

- **Domain**: vikitaygroup.ru
- **Hosting**: ISPmanager + Apache on remote server
- **Build**: `npm run build` produces `dist/` folder
- **Deploy process**: Build locally, zip dist/ as dist-upload.zip, upload via ISPmanager
- **Cloudflare Pages**: wrangler.jsonc configured as alternative (SPA mode, serves from dist/)

## Architecture Notes

- All CSS is inline via `<style>` tags in JSX components (not external CSS files except Tailwind base and OrbitImages)
- Services data lives in `servicesData.js` with both transliterated and Russian versions
- `servicesDataRu` is the Russian object used by the app; `servicesData` is the transliterated English version (unused in UI)
- Contact forms use EmailJS with service ID `service_4jkn3fn` and template `template_neucvsp`
- The orbit cases carousel uses CSS offset-path animation via motion library

## Known Issues / TODOs

- `App.css` and `src/assets/react.svg` are unused Vite template leftovers (safe to delete)
- Some service images may be missing from `public/images/` (service-consult.png, service-strategy.png, service-analysis.png, service-branding.png, service-packages.png) — verify on deployment
- `favicon.png` referenced in index.html should exist in `public/`
- The `Для сайта/` directory at project root contains source assets — not tracked in git
