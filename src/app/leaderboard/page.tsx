import LeaderboardComponent from "@/components/leaderboard/LeaderboardComponent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "leaderboard",
  title: "Leaderboard",
  description:
    "Every transmission package Fathom Grid delivered, ranked by days early or late against the contracted connection date.",
});

export default function LeaderboardPage() {
  return <LeaderboardComponent />;
}
