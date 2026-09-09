import type { LeaderboardEntry } from "@/types";

/**
 * Delivery leaderboard. Ranked on schedule variance against the contracted
 * connection date — negative days are early, positive days are late.
 */
export const LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    project: "Dogger Reach OFTO",
    client: "North Sea Transmission Partners",
    region: "North Sea, UK",
    capacityMw: 1200,
    cableKm: 168,
    year: 2024,
    varianceDays: -11,
    note: "Route re-cut twice during survey rather than accept a burial risk the installer would have priced.",
  },
  {
    rank: 2,
    project: "Changhua Crossing Package",
    client: "Taiwan Offshore Consortium",
    region: "Taiwan Strait",
    capacityMw: 900,
    cableKm: 121,
    year: 2023,
    varianceDays: -6,
    note: "Fourteen crossing agreements closed before cable award, holding a nine-week install window.",
  },
  {
    rank: 3,
    project: "Borssele Uprate",
    client: "TenneT",
    region: "Dutch North Sea",
    capacityMw: 700,
    cableKm: 56,
    year: 2022,
    varianceDays: -4,
    note: "Recovered 140 MW of continuous rating without laying new cable.",
  },
  {
    rank: 4,
    project: "Corrib Landfall Replacement",
    client: "EirGrid West",
    region: "County Mayo, Ireland",
    capacityMw: 480,
    cableKm: 42,
    year: 2023,
    varianceDays: -2,
    note: "Consent granted first pass; 940 m drill kept all plant off the beach.",
  },
  {
    rank: 5,
    project: "Moray Firth Tie-in",
    client: "Caledonia Energy",
    region: "Moray Firth, UK",
    capacityMw: 320,
    cableKm: 28,
    year: 2022,
    varianceDays: 0,
    note: "Brownfield connection into a live asset, delivered inside a fixed shutdown window.",
  },
  {
    rank: 6,
    project: "Skagerrak Link Study",
    client: "Nordkraft Transmisjon",
    region: "Skagerrak",
    capacityMw: 600,
    cableKm: 94,
    year: 2021,
    varianceDays: 3,
    note: "Three days lost to a re-survey after a third-party asset moved. We publish this one too.",
  },
];

export const LEADERBOARD_STATS = [
  { label: "Packages ranked", value: "6" },
  { label: "Median variance", value: "−5 days" },
  { label: "Delivered early", value: "4 of 6" },
  { label: "Delivered late", value: "1 of 6" },
];
