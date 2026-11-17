import type { Metadata } from "next";
import SectorPage from "@/components/sector/SectorPage";
import { getSectorContent } from "@/server/cms/sectorContent";
import { seoMetadata } from "@/server/cms/seoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return seoMetadata((await getSectorContent()).seo, "/sector");
}

export default async function Sector() {
  return <SectorPage content={await getSectorContent()} />;
}
