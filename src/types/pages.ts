/**
 * The shapes the inner pages render from.
 *
 * Every field is always present: the CMS mappers (src/server/cms/*Content.ts)
 * fill each one from the CMS and fall back, field by field, to the constants in
 * src/constants. Components therefore never test for "was this set" — they
 * receive complete content, whether it came from the CMS or from the built-in
 * copy. Types only; nothing here is server-only.
 */

export interface Crumb {
  label: string;
  /** Absent on the current page. */
  href?: string;
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robots: string;
}

/* --- reused home folds --------------------------------------------------- */

export interface FaqContent {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  items: { question: string; answer: string }[];
}

export interface PromoContent {
  title: string;
  body: string;
  cta: string;
  ctaHref: string;
}

export interface NudgeContent {
  title: string;
  mobilePlaceholder: string;
  namePlaceholder: string;
  cta: string;
}

export interface SharedContent {
  faq: FaqContent;
  promo: PromoContent;
  nudge: NudgeContent;
}

export interface ResearchContent {
  title: string;
  tabs: {
    label: string;
    reports: { title: string; kind: string; date: string; cover: string }[];
  }[];
}

/* --- About --------------------------------------------------------------- */

export interface AboutProduct {
  key: string;
  /** May contain a line break. */
  label: string;
  badge: string;
  icon: string;
}

export interface AboutStatement {
  key: string;
  label: string;
  statement: string;
  restLetters: number;
}

export interface AboutValue {
  key: string;
  title: string;
  body: string;
  icon: string;
}

export interface AboutAward {
  logo: string;
  logoSize: readonly [number, number];
  /** Crop of the logo artwork inside its box, when the design sets one. */
  crop?: { w: number; h: number; left: number; top: number };
  offset: number;
  titleLines: readonly string[];
  title: string;
  text: string;
  textWidth: number;
  small?: boolean;
  pattern: {
    box: number;
    image: number;
    rotate: number;
    flip: boolean;
    left: number;
    top: number;
  };
}

export interface AboutActivity {
  key: string;
  title: string;
  text: string;
  /** Image layers, bottom first. */
  layers: string[];
}

export interface AboutSlide {
  title: string;
  body: string;
  front: { photo: string; dx: number; dy: number };
  left: { photo: string; dx: number; dy: number };
  right: { photo: string; dx: number; dy: number };
}

export interface AboutContent {
  breadcrumbs: Crumb[];
  seo: SeoContent;
  hero: {
    title: string;
    subtext: string;
    form: {
      mobileLabel: string;
      mobilePlaceholder: string;
      mobileHelp: string;
      nameLabel: string;
      namePlaceholder: string;
      consent: string;
      submit: string;
    };
    products: AboutProduct[];
  };
  who: { title: string; paragraphs: string[] };
  statements: AboutStatement[];
  values: { title: string; items: AboutValue[] };
  awards: { title: string; items: AboutAward[] };
  csr: { title: string; items: AboutActivity[] };
  life: {
    title: string;
    subtext: string;
    ctaLabel: string;
    ctaHref: string;
    readMore: string;
    viewLess: string;
    autoAdvanceMs: number;
    slides: AboutSlide[];
    photos: string[];
  };
  shared: SharedContent;
}

/* --- Leadership ---------------------------------------------------------- */

export interface LeaderContent {
  slug: string;
  name: string;
  role: string;
  photo: string;
  detailPhoto: string;
  bio: string[];
  /** Tab keys the leader is listed under. */
  groups: string[];
}

export interface LeadershipContent {
  breadcrumbs: Crumb[];
  detailBreadcrumbs: Crumb[];
  seo: SeoContent;
  heading: string;
  tabsLabel: string;
  tabs: { key: string; label: string }[];
  leaders: LeaderContent[];
  shared: Omit<SharedContent, "faq">;
}

/* --- Sector -------------------------------------------------------------- */

export interface SectorRow {
  name: string;
  stocks: number;
  advancing: number;
  declining: number;
  advDecRatio: number;
  marketCapPct: number;
  marketCap: string;
  pe: number;
  dayChange: number;
  exchanges: ("NSE" | "BSE")[];
}

export interface SectorStory {
  title: string;
  date: string;
  time: string;
  href: string;
  image: string;
}

export interface SectorContent {
  breadcrumbs: Crumb[];
  seo: SeoContent;
  snapshot: {
    title: string;
    viewLabels: { table: string; card: string; heatmap: string };
    paginationLabel: string;
    tablePageSize: number;
    cardPageSize: number;
    columns: {
      name: string;
      dayChange: string;
      stocks: string;
      advDec: string;
      ratio: string;
      capPct: string;
      cap: string;
      pe: string;
    };
    card: {
      advance: string;
      decline: string;
      ratio: string;
      dayChange: string;
      stocks: string;
      capPct: string;
      cap: string;
      pe: string;
    };
    /** Keyed by the registry key: overview | performance. */
    tabs: { overview: string; performance: string };
    /** Keyed by the registry key: all | nse | bse. */
    exchanges: { all: string; nse: string; bse: string };
  };
  sectors: SectorRow[];
  research: ResearchContent;
  news: {
    title: string;
    moreLabel: string;
    allLabel: string;
    allHref: string;
    stories: SectorStory[];
  };
  shared: SharedContent;
}
