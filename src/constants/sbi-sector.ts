/**
 * Sector Snapshot — Figma "Sector Snapshot - Desktop" 4:117088 and the 360
 * frame 1:253323. The figures are the placeholder values the frames carry; the
 * real feed replaces SECTORS without touching the components.
 */

export const SECTOR_VIEWS = ["table", "card", "heatmap"] as const;
export type SectorView = (typeof SECTOR_VIEWS)[number];

export const SECTOR_TABS = ["Overview", "Performance"] as const;
export type SectorTab = (typeof SECTOR_TABS)[number];

export const SECTOR_EXCHANGES = ["All", "NSE", "BSE"] as const;
export type SectorExchange = (typeof SECTOR_EXCHANGES)[number];

export interface Sector {
  name: string;
  stocks: number;
  advancing: number;
  declining: number;
  advDecRatio: number;
  marketCapPct: number;
  /** Display string, e.g. "80.25 Cr". */
  marketCap: string;
  pe: number;
  /** Day change in percent — drives the Performance tab and the heatmap. */
  dayChange: number;
  exchanges: readonly Exclude<SectorExchange, "All">[];
}

export const SECTORS: readonly Sector[] = [
  { name: "Telecommunications Equipment", stocks: 834, advancing: 64, declining: 56, advDecRatio: 1.8, marketCapPct: 10, marketCap: "80.25 Cr", pe: 1.8, dayChange: 0.62, exchanges: ["NSE", "BSE"] },
  { name: "Consumer Durables", stocks: 142, advancing: 64, declining: 56, advDecRatio: 242.2, marketCapPct: 10, marketCap: "10 Cr", pe: 242.2, dayChange: -0.34, exchanges: ["NSE"] },
  { name: "Diversified Consumer Services", stocks: 245, advancing: 64, declining: 56, advDecRatio: 0.8, marketCapPct: 10, marketCap: "8 Cr", pe: 65.35, dayChange: 1.12, exchanges: ["NSE", "BSE"] },
  { name: "Healthcare", stocks: 222, advancing: 64, declining: 56, advDecRatio: 242.2, marketCapPct: 10, marketCap: "100 Cr", pe: 22.67, dayChange: 0.18, exchanges: ["BSE"] },
  { name: "Financial Services", stocks: 176, advancing: 64, declining: 56, advDecRatio: 1.25, marketCapPct: 10, marketCap: "45.27 Cr", pe: 0.8, dayChange: -1.04, exchanges: ["NSE", "BSE"] },
  { name: "Information Technology", stocks: 145, advancing: 64, declining: 56, advDecRatio: 1.8, marketCapPct: 10, marketCap: "12.76 Cr", pe: 80.46, dayChange: 2.31, exchanges: ["NSE"] },
  { name: "Realty", stocks: 203, advancing: 64, declining: 56, advDecRatio: 0.6, marketCapPct: 10, marketCap: "98.78 Cr", pe: 80.55, dayChange: -0.72, exchanges: ["NSE", "BSE"] },
  { name: "Capital Goods", stocks: 666, advancing: 64, declining: 56, advDecRatio: 1.25, marketCapPct: 10, marketCap: "98.78 Cr", pe: 22.67, dayChange: 0.45, exchanges: ["BSE"] },
  { name: "Metals & Mining", stocks: 100, advancing: 64, declining: 56, advDecRatio: 1.8, marketCapPct: 10, marketCap: "20 Cr", pe: 0.8, dayChange: -2.15, exchanges: ["NSE"] },
  { name: "Automobile & Auto Components", stocks: 87, advancing: 64, declining: 56, advDecRatio: 1.34, marketCapPct: 10, marketCap: "30.05 Cr", pe: 65.35, dayChange: 0.9, exchanges: ["NSE", "BSE"] },
  { name: "Oil, Gas & Consumable Fuels", stocks: 100, advancing: 64, declining: 56, advDecRatio: 1.8, marketCapPct: 10, marketCap: "20 Cr", pe: 0.8, dayChange: -0.08, exchanges: ["NSE"] },
  { name: "Fast Moving Consumer Goods", stocks: 29, advancing: 64, declining: 56, advDecRatio: 1.1, marketCapPct: 24.65, marketCap: "₹12.18L", pe: 48.7, dayChange: 0.62, exchanges: ["NSE", "BSE"] },
];

/** Overview: the "Table Container" has 12 rows; the card view shows six a page. */
export const TABLE_PAGE_SIZE = 12;
export const CARD_PAGE_SIZE = 6;

/** Market News rail - desktop 4:117176, mobile 1:253387. Placeholder stories. */
export const MARKET_NEWS = [
  { title: "Eternal Q1 Net Profit Jumps Nearly Four-Fold to Rs 92 Cr", date: "26 Jul 2026", time: "06:45 PM IST", image: "eternal" },
  { title: "Eternal Q1 Net Profit Jumps Nearly Four-Fold to Rs 92 Cr", date: "26 Jul 2026", time: "06:45 PM IST", image: "eternal" },
  { title: "Eternal Q1 Net Profit Jumps Nearly Four-Fold to Rs 92 Cr", date: "26 Jul 2026", time: "06:45 PM IST", image: "rupee" },
  { title: "Eternal Q1 Net Profit Jumps Nearly Four-Fold to Rs 92 Cr", date: "26 Jul 2026", time: "06:45 PM IST", image: "ola" },
] as const;
