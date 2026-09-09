export interface Service {
  slug: string;
  station: string;
  title: string;
  lede: string;
  summary: string;
  deliverables: string[];
  duration: string;
}

export interface LeaderboardEntry {
  rank: number;
  project: string;
  client: string;
  region: string;
  capacityMw: number;
  cableKm: number;
  year: number;
  /** Days against the contracted connection date. Negative is early. */
  varianceDays: number;
  note: string;
}
