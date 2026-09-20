import { Inter, Poppins } from "next/font/google";

import HeroSection from "./sections/HeroSection";
import MarketPulse from "./sections/MarketPulse";
import BentoSection from "./sections/BentoSection";
import IposSection from "./sections/IposSection";
import OfferingsSection from "./sections/OfferingsSection";
import PurposeSection from "./sections/PurposeSection";
import PlatformSection from "./sections/PlatformSection";
import ResearchSection from "./sections/ResearchSection";
import NewsSection from "./sections/NewsSection";
import LearnSection from "./sections/LearnSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import PricingSection from "./sections/PricingSection";
import FaqSection from "./sections/FaqSection";
import AppPromo from "./sections/AppPromo";
import StickyNudge from "./sections/StickyNudge";

import { getHomeContent } from "@/server/cms/homeContent";

import "./sbi-home.scss";

/* Typography/Family/Pre Login/* is Poppins; Typography/Family/Body, the
   shared Pre + Post library, is Inter. Both are attached to the .sb-scope
   wrapper rather than the document, so no other route loads them. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * SBI Securities pre-login home page, in the section order of the Figma
 * sources — HomePage - Desktop 1:56197 and HomePage - Mobile 0:33273.
 *
 * Async, and a Server Component: the CMS read happens here, on the server,
 * and each fold receives its copy as props. The folds keep their "use client"
 * markers and their interactivity — nothing fetches in the browser, and the
 * content is in the HTML the crawler is served.
 *
 * Only the hero reads from the CMS so far. The rest still take their copy
 * from the constants directly, which is why they are passed nothing.
 */
export default async function HomeComponent() {
  const content = await getHomeContent();

  return (
    <div className={`sb-scope ${poppins.variable} ${inter.variable}`}>
      <HeroSection content={content.hero} />
      <MarketPulse />
      <BentoSection />
      <IposSection />
      <OfferingsSection />
      <PurposeSection />
      <PlatformSection />
      <ResearchSection />
      <NewsSection />
      <LearnSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <AppPromo />
      <StickyNudge />
    </div>
  );
}
