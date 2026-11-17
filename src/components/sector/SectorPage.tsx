import AppPromo from "@/components/home/sections/AppPromo";
import FaqSection from "@/components/home/sections/FaqSection";
import ResearchSection from "@/components/home/sections/ResearchSection";
import StickyNudge from "@/components/home/sections/StickyNudge";
import type { SectorContent } from "@/types/pages";
import SbScope from "@/components/ui/SbScope";
import MarketNews from "./MarketNews";
import SectorSnapshot from "./SectorSnapshot";

/** Sector Snapshot — desktop 4:117089, mobile 1:253323. */
export default function SectorPage({ content }: { content: SectorContent }) {
  return (
    <SbScope>
      <SectorSnapshot breadcrumbs={content.breadcrumbs} content={content} />
      <MarketNews news={content.news} />
      <ResearchSection content={content.research} />
      <FaqSection content={content.shared.faq} />
      <AppPromo content={content.shared.promo} />
      <StickyNudge content={content.shared.nudge} />
    </SbScope>
  );
}
