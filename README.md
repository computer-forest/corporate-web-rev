# corporate-website

Marketing site for Fathom Grid, an offshore transmission engineering practice.

Next.js App Router, TypeScript, SCSS modules. The folder layout mirrors the
`onboarding-diy-pwa` project: thin route files under `src/app`, one feature
component folder per screen under `src/components`, and the shared
service/lib/hooks/constants/environments layers alongside them.

Three pages: **home**, **about us**, **leaderboard**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (development env config)
npm run build:uat  # NEXT_PUBLIC_ENV=uat
npm run build:prod # NEXT_PUBLIC_ENV=production
npm start          # serve a production build
```

## Layout

```
src/
├── app/                  route files only — metadata + one component each
│   ├── layout.tsx        html shell, fonts, global metadata
│   ├── globals.scss      design tokens and element defaults
│   ├── page.tsx          redirects to /home
│   ├── not-found.tsx     404 for anything off the three routes
│   ├── robots.ts sitemap.ts
│   ├── home/
│   ├── about/
│   └── leaderboard/
├── components/           one folder per feature: Component.tsx + module.scss
│   ├── app-shell/        skip link, header, main, footer
│   ├── header/ footer/   site chrome
│   ├── ui/               shared pieces incl. RouteChart, the hero signature
│   └── home/ about/ leaderboard/
├── constants/            site copy and content records
├── environments/         environment.ts, selected by NEXT_PUBLIC_ENV
├── hooks/                client-side hooks
├── lib/                  app-routing.ts (route table), seo.ts
├── services/             api, navigation, analytics
├── types/                shared interfaces
└── utils/                formatting, a11y, public paths
```

`src/lib/app-routing.ts` documents the route table and exports the `ROUTES`
helpers used for every internal link.

## Design

Palette and type are set as CSS custom properties in `src/app/globals.scss`:
sounding-ink ground, pale chart paper, contour teal, buoy amber. Archivo for
display, Public Sans for body, IBM Plex Mono for data and labels.

The signature element is `components/ui/RouteChart.tsx` — an export cable route
drawn across a bathymetric contour field, with the four delivery phases marked
as survey stations. It draws once on load and is static under
`prefers-reduced-motion`.
