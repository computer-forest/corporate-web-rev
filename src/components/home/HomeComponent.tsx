import { inter, poppins } from "@/components/ui/sb-fonts";

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

import "./sbi-home.scss";

/**
 * SBI Securities pre-login home page, in the section order of the Figma
 * sources — HomePage - Desktop 1:56197 and HomePage - Mobile 0:33273.
 */
export default function HomeComponent() {
  return (
    <div className={`sb-scope ${poppins.variable} ${inter.variable}`}>
      <HeroSection />
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
