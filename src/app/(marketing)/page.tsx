
import type { Metadata } from "next";

import HomeComponent from "@/components/home/HomeComponent";

export const metadata: Metadata = {
  title: "Online Trading and Investment Services",

  description:
    "Explore trading, investment products, financial calculators, market insights and investor services with SBI Securities.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    title:
      "Online Trading and Investment Services | SBI Securities",
    description:
      "Explore trading, investment products, financial calculators, market insights and investor services with SBI Securities.",
    siteName: "SBI Securities",
    locale: "en_IN",
  },
};

export default function HomePage() {
  return <HomeComponent />;
}
