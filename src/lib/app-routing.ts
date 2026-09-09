// app-routing.ts — the equivalent of Angular's AppRoutingModule.
// Routing in the App Router is file-based, so this file exists to document the
// route table in one place, the way the Angular project did.
//
// Route            → File
// ---------------------------------------------------------------------------
// ''               → src/app/page.tsx          (redirects to /home)
// 'home'           → src/app/home/page.tsx
// 'about'          → src/app/about/page.tsx
// 'leaderboard'    → src/app/leaderboard/page.tsx
// '**'             → src/app/not-found.tsx

export const ROUTES = {
  home: "/home",
  about: "/about",
  leaderboard: "/leaderboard",
} as const;

/** Routes that render without the site header (none today, kept for parity). */
export const CHROMELESS_ROUTES: string[] = [];
