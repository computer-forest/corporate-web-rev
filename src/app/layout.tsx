import type { Metadata, Viewport } from "next";
import "./globals.scss";
import AppShell from "@/components/app-shell/AppShell";
import { SITE } from "@/constants/site";
import { SITE_URL, isIndexableEnvironment } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "offshore transmission",
    "export cable route engineering",
    "offshore wind grid connection",
    "landfall design",
    "marine survey",
  ],
  robots: isIndexableEnvironment
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071b24",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Public+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&family=Poppins:wght@400;500;600&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
