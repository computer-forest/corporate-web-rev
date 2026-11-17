import type { Metadata } from "next";
import LeadershipListing from "@/components/leadership/LeadershipListing";
import { getLeadershipContent } from "@/server/cms/leadershipContent";
import { seoMetadata } from "@/server/cms/seoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return seoMetadata((await getLeadershipContent()).seo, "/leadership");
}

export default async function Leadership() {
  return <LeadershipListing content={await getLeadershipContent()} />;
}
