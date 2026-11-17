import { MARKET_NEWS, SECTORS, TABLE_PAGE_SIZE, CARD_PAGE_SIZE } from "@/constants/sbi-sector";
import { RESEARCH, RESEARCH_TABS } from "@/constants/sbi-home";
import type { Crumb, ResearchContent, SectorContent, SectorRow, SectorStory, SeoContent } from "@/types/pages";

import { getPageView, image, link, num, str, strs, type Json } from "./pageContent";
import { toCrumbs, toFaq, toNudge, toPromo, toSeo } from "./sharedContent";

/**
 * Sector Snapshot — /sector. CMS slug "sector"; the field names read here are
 * those of cms-website/src/server/cms/pages.ts.
 */

const CRUMBS: Crumb[] = [{ label: "Home", href: "/" }, { label: "Sector Snapshot" }];

const SEO: SeoContent = {
  title: "Sector Snapshot | SBI Securities",
  description: "Track how every sector is performing across NSE and BSE.",
  keywords: [],
  canonical: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  robots: "index,follow",
};

const DEFAULT_RESEARCH: ResearchContent = {
  title: "Analysis you can trust",
  tabs: RESEARCH_TABS.map((label) => ({
    label,
    reports: RESEARCH.map((r, i) => ({ ...r, cover: `/figma/research/report-${i + 1}.png` })),
  })),
};

/** An ISO date as the design prints it ("28 July 2026"); anything else as typed. */
function longDate(value: unknown): string {
  if (typeof value !== "string") return "";
  const d = /^\d{4}-\d{2}-\d{2}/.test(value) ? new Date(`${value.slice(0, 10)}T00:00:00Z`) : null;
  return d && !Number.isNaN(d.getTime())
    ? d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    : value;
}

/** The research fold's tabs and reports (a home fold reused on this page). */
function toResearch(raw: Json | undefined): ResearchContent {
  const tabsIn = Array.isArray(raw?.tabs) ? (raw!.tabs as unknown[]).filter((t): t is Json => typeof t === "object" && t !== null) : [];
  const block = raw && typeof raw.block === "object" && raw.block !== null ? (raw.block as Json) : {};
  const tabs = tabsIn
    .filter((t) => typeof t.label === "string" && t.label.trim() !== "")
    .map((t) => ({
      label: String(t.label),
      reports: (Array.isArray(t.reports) ? (t.reports as unknown[]) : [])
        .filter((r): r is Json => typeof r === "object" && r !== null && typeof (r as Json).title === "string")
        .map((r, i) => ({
          title: String(r.title),
          kind: str(r.kind, ""),
          date: longDate(r.date),
          cover: image(r.cover, `/figma/research/report-${(i % 4) + 1}.png`),
        })),
    }));
  return {
    title: str(block.title, DEFAULT_RESEARCH.title),
    tabs: tabs.length > 0 ? tabs : DEFAULT_RESEARCH.tabs,
  };
}

export const DEFAULT_SECTOR: SectorContent = {
  breadcrumbs: CRUMBS,
  seo: SEO,
  snapshot: {
    title: "Sector Snapshot",
    viewLabels: { table: "Table view", card: "Card view", heatmap: "Heatmap view" },
    paginationLabel: "Sector pages",
    tablePageSize: TABLE_PAGE_SIZE,
    cardPageSize: CARD_PAGE_SIZE,
    columns: {
      name: "Sector Name",
      dayChange: "Day Change %",
      stocks: "No. of Stocks",
      advDec: "Adv/Dec",
      ratio: "Adv/Dec Ratio",
      capPct: "Market Cap (%)",
      cap: "Market Cap (Cr.)",
      pe: "Sector PE",
    },
    card: {
      advance: "Advance",
      decline: "Decline",
      ratio: "Ratio:",
      dayChange: "Day Change %",
      stocks: "No. of\nStocks",
      capPct: "Mkt Cap\n(%)",
      cap: "Mkt Cap\n(Cr)",
      pe: "Sector\nPE",
    },
    tabs: { overview: "Overview", performance: "Performance" },
    exchanges: { all: "All", nse: "NSE", bse: "BSE" },
  },
  research: DEFAULT_RESEARCH,
  sectors: SECTORS.map((s) => ({ ...s, exchanges: [...s.exchanges] })),
  news: {
    title: "Market News",
    moreLabel: "Read More",
    allLabel: "All market news",
    allHref: "#market-news",
    stories: MARKET_NEWS.map((s) => ({
      title: s.title,
      date: s.date,
      time: s.time,
      href: "#market-news",
      image: `/figma/sector/news/${s.image}.png`,
    })),
  },
  shared: { faq: toFaq(null), promo: toPromo(null), nudge: toNudge(null) },
};

/** A row's label for a keyed collection (tabs, exchange filters). */
function labelFor(rows: Json[], key: string, fallback: string): string {
  const row = rows.find((r) => r.key === key);
  return str(row?.label, fallback);
}

export async function getSectorContent(): Promise<SectorContent> {
  const view = await getPageView("sector");
  if (!view) return DEFAULT_SECTOR;

  const D = DEFAULT_SECTOR;
  const snapshot = view.section("sector-snapshot");
  const b = snapshot?.block ?? {};
  const tabRows = snapshot?.items("tabs") ?? [];
  const exchangeRows = snapshot?.items("exchanges") ?? [];

  /* A sector needs a name; a row without one is skipped. Figures that are
     missing or not numbers read as 0 rather than breaking the table. */
  const sectors: SectorRow[] = (view.section("sectors")?.items("sectors") ?? [])
    .filter((r) => typeof r.name === "string" && r.name.trim() !== "")
    .map((r) => ({
      name: String(r.name),
      stocks: num(r.stocks, 0),
      advancing: num(r.advancing, 0),
      declining: num(r.declining, 0),
      advDecRatio: num(r.adv_dec_ratio, 0),
      marketCapPct: num(r.market_cap_pct, 0),
      marketCap: str(r.market_cap, ""),
      pe: num(r.pe, 0),
      dayChange: num(r.day_change, 0),
      exchanges: strs(r.exchanges, [])
        .map((e) => e.toUpperCase())
        .filter((e): e is "NSE" | "BSE" => e === "NSE" || e === "BSE"),
    }));

  const news = view.section("market-news");
  const stories: SectorStory[] = (news?.items("stories") ?? [])
    .filter((r) => typeof r.title === "string" && r.title.trim() !== "")
    .map((r, i) => ({
      title: String(r.title),
      date: str(r.date, ""),
      time: str(r.time, ""),
      href: link(r.href, "#market-news"),
      image: image(r.image, D.news.stories[i]?.image ?? D.news.stories[0].image),
    }));

  return {
    breadcrumbs: toCrumbs(view, "breadcrumbs", D.breadcrumbs),
    seo: toSeo(view, D.seo),
    snapshot: {
      title: str(b.title, D.snapshot.title),
      viewLabels: {
        table: str(b.table_view_label, D.snapshot.viewLabels.table),
        card: str(b.card_view_label, D.snapshot.viewLabels.card),
        heatmap: str(b.heatmap_view_label, D.snapshot.viewLabels.heatmap),
      },
      paginationLabel: str(b.pagination_label, D.snapshot.paginationLabel),
      tablePageSize: Math.max(1, Math.round(num(b.table_page_size, D.snapshot.tablePageSize))),
      cardPageSize: Math.max(1, Math.round(num(b.card_page_size, D.snapshot.cardPageSize))),
      columns: {
        name: str(b.col_name, D.snapshot.columns.name),
        dayChange: str(b.col_day_change, D.snapshot.columns.dayChange),
        stocks: str(b.col_stocks, D.snapshot.columns.stocks),
        advDec: str(b.col_adv_dec, D.snapshot.columns.advDec),
        ratio: str(b.col_ratio, D.snapshot.columns.ratio),
        capPct: str(b.col_cap_pct, D.snapshot.columns.capPct),
        cap: str(b.col_cap, D.snapshot.columns.cap),
        pe: str(b.col_pe, D.snapshot.columns.pe),
      },
      card: {
        advance: str(b.advance_label, D.snapshot.card.advance),
        decline: str(b.decline_label, D.snapshot.card.decline),
        ratio: str(b.ratio_label, D.snapshot.card.ratio),
        dayChange: str(b.day_change_label, D.snapshot.card.dayChange),
        stocks: str(b.fact_stocks, D.snapshot.card.stocks),
        capPct: str(b.fact_cap_pct, D.snapshot.card.capPct),
        cap: str(b.fact_cap, D.snapshot.card.cap),
        pe: str(b.fact_pe, D.snapshot.card.pe),
      },
      tabs: {
        overview: labelFor(tabRows, "overview", D.snapshot.tabs.overview),
        performance: labelFor(tabRows, "performance", D.snapshot.tabs.performance),
      },
      exchanges: {
        all: labelFor(exchangeRows, "all", D.snapshot.exchanges.all),
        nse: labelFor(exchangeRows, "nse", D.snapshot.exchanges.nse),
        bse: labelFor(exchangeRows, "bse", D.snapshot.exchanges.bse),
      },
    },
    research: toResearch(view.section("research")?.raw),
    sectors: sectors.length > 0 ? sectors : D.sectors,
    news: {
      title: str(news?.block.title, D.news.title),
      moreLabel: str(news?.block.more_label, D.news.moreLabel),
      allLabel: str(news?.block.all_label, D.news.allLabel),
      allHref: link(news?.block.all_href, D.news.allHref),
      stories: stories.length > 0 ? stories : D.news.stories,
    },
    shared: { faq: toFaq(view), promo: toPromo(view), nudge: toNudge(view) },
  };
}
