/** Content for the Leadership pages — Figma "Leadership" 4:127541. */

export const LEADERSHIP_TABS = ["Board of Directors", "Managing Team"] as const;
export type LeadershipTab = (typeof LEADERSHIP_TABS)[number];

export interface Leader {
  slug: string;
  name: string;
  role: string;
  photo: string;
  /** Detail-page biography, one entry per paragraph. */
  bio?: readonly string[];
  /** Tabs this leader is listed under. */
  groups: readonly LeadershipTab[];
}

export const LEADERS: readonly Leader[] = [
  {
    slug: "ashwini-kumar-tewari",
    name: "Shri Ashwini Kumar Tewari",
    role: "Senior Vice President of Financial Services",
    photo: "leader-1",
    groups: ["Board of Directors"],
    bio: [
      "Shri Ashwini Kumar Tewari is a career banker and started his career in SBI in the year 1991 as a Probationary Officer and has spent more than three decades with the bank in India and abroad in various assignments.",
      "Presently since 21.11.2023, he is the Managing Director (Corporate Banking and Subsidiaries) of State Bank of India and a Whole Time Director handling the portfolio of Large Corporate and Commercial Credit business of the Bank alongwith Associates & Subsidiaries of the Bank. This includes major non-bank business like Credit cards, Mutual Fund, Life & General Insurance, Capital Markets, Custodial Services etc. and serving on the boards of all these companies.",
      "Prior to this assignment, he was Managing Director (Risk, Compliance and Stressed Assets) since June 2022. There he was focusing on driving Climate Risk Management in the bank and shaping the Stressed Assets Strategy of the bank. Earlier he was the Managing Director, handling International Banking, Information Technology and Non-Bank Subsidiaries of the Bank from January 2021. He was also involved in a big refresh in the technology space in SBI. Prior to becoming Managing Director at SBI, he served as Managing Director and CEO of SBI Cards and Payment Services Ltd where he oversaw key partnerships inked with GPay, PayTM, BPCL etc. and steered the company through the immediate aftermath of the Covid period.",
      "Earlier, he was the Country Head of the US Operations of State Bank of India from April 2017 to July 2020. Prior to that he was the Regional Head and General Manager, East Asia, for SBI, based in Hong Kong.",
      "Over the years, he held other leadership positions at State Bank of India, including, the Deputy General Manager (Operations & Information Systems) International Banking, Head of SBI’s Cash Management, Regional Manager, Branch Head, among others.",
      "An Electrical Engineer by degree, he is a Certified Associate of Indian Institute of Bankers (CAIIB), Certified Financial Planner (CFP) and has done a Certificate Course in Management from XLRI.",
    ],
  },
  {
    slug: "virendra-bansal",
    name: "Shri Virendra Bansal",
    role: "Nominee Director",
    photo: "leader-2",
    groups: ["Board of Directors"],
  },
  {
    slug: "gitika-kapoor",
    name: "Dr. Gitika Kapoor",
    role: "Independent Director",
    photo: "leader-3",
    groups: ["Board of Directors"],
  },
  {
    slug: "sharad-sharma",
    name: "Shri Sharad Sharma",
    role: "Director",
    photo: "leader-4",
    groups: ["Board of Directors"],
  },
  {
    slug: "dp-singh",
    name: "Shri D.P Singh",
    role: "Director",
    photo: "leader-5",
    groups: ["Board of Directors"],
  },
  {
    slug: "manoj-kumar",
    name: "Shri Manoj Kumar",
    role: "Nominee Director",
    photo: "leader-6",
    groups: ["Board of Directors"],
  },
  {
    slug: "atul-srivastava",
    name: "Shri Atul Srivastava",
    role: "Nominee Director",
    photo: "leader-7-overlay",
    groups: ["Board of Directors"],
  },
  {
    slug: "baldev-prakash",
    name: "Shri Baldev Prakash",
    role: "Managing Director & CEO",
    photo: "leader-8",
    groups: ["Board of Directors", "Managing Team"],
  },
  {
    slug: "vikas-bhargava",
    name: "Shri Vikas Bhargava",
    role: "Chief Financial Officer and Whole-Time Director",
    photo: "leader-9-overlay",
    groups: ["Board of Directors", "Managing Team"],
  },
];

export function getLeader(slug: string): Leader | undefined {
  return LEADERS.find((leader) => leader.slug === slug);
}

/** The detail-page portrait for a leader — only the first has its own crop. */
export function detailPhoto(leader: Leader): string {
  return leader.slug === "ashwini-kumar-tewari" ? "leader-1-detail" : leader.photo;
}
