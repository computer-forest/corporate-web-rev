/** Content for the About us page — Figma "About us - Desktop" 4:127197. */

export const ABOUT_HERO = {
  title: "About us",
  subtext:
    "Whether you're starting small or building long-term wealth, SBI Securities is with\nyou every step of the way",
} as const;

/** The product grid inside the phone mockup in the hero. */
export const HERO_PRODUCTS = [
  { label: "Stocks", icon: "stocks" },
  { label: "Futures & Options", icon: "futures", badge: "New" },
  { label: "Mutual Funds", icon: "mutual-funds" },
  { label: "Option Arena", icon: "option-arena" },
  { label: "Exchange Traded\nFunds", icon: "etf" },
  { label: "Ideas", icon: "ideas", badge: "NEW" },
  { label: "Home Loan", icon: "home-loan" },
  { label: "Car Loan", icon: "car-loan" },
  { label: "SBI Cards", icon: "sbi-cards" },
] as const;

export const WHO_ARE_WE = {
  title: "Who are we?",
  paragraphs: [
    "SBI Securities is the embodiment of trust and reliability in the world of investment solutions. We are proud to be a wholly-owned subsidiary of SBI Capital Markets Ltd and a part of the State Bank Group, India's largest and most trusted banking conglomerate.",
    "With a rich legacy and unparalleled expertise, SBI Securities has earned its reputation as a leading player in the financial industry. Our commitment to excellence and our unwavering focus on our client's needs has made us the go-to choice for investors across categories. Trust us to help you achieve your financial goals and take your investments to new heights.",
  ],
} as const;

export const MISSION = {
  label: "Our Mission",
  statement:
    "To be an organization that inculcates true financial confidence in every Indian investor.",
  /** Letters already in the display colour at rest ("To be an organi"). */
  restLetters: 12,
} as const;

export const VISION = {
  label: "Our Vision",
  statement: "To be a trusted investment partner of choice to every Indian investor.",
  restLetters: 0,
} as const;

export const VALUES = [
  {
    key: "service",
    title: "Service",
    body: "SBI Securities aims to provide customer-centric investment solutions and deliver them with integrity, excellence, and trust. It focuses on creating lasting value for customers while contributing to the growth of India's financial ecosystem.",
  },
  {
    key: "transparency",
    title: "Transparency",
    body: "SBI Securities maintains transparency and accountability at every step, ensuring regulatory norms are strictly followed with due diligence. Such ethical practices strengthen customer trust and confidence.",
  },
  {
    key: "ethics",
    title: "Ethics",
    body: "SBI Securities proactively manages conflicts of interest in a fair and transparent manner. It continues to adhere to the highest standards of professional ethical conduct in its dealings with all stakeholders.",
  },
  {
    key: "politeness",
    title: "Politeness",
    body: "SBI Securities promotes a culture of respect, empathy, well-being, and inclusiveness within the workplace and across all customer interactions.",
  },
  {
    key: "sustainability",
    title: "Sustaianability",
    body: "SBI Securities collaborates with all stakeholders to create a positive impact on social, economic, and ecological fronts. As a responsible corporate citizen, we embrace opportunities to develop eco-friendly products, services, and processes that drive sustainable business and a greener future.",
  },
] as const;

export const AWARDS = [
  {
    logo: "technology-excellence",
    logoSize: [64, 50],
    /** Figma crops the artwork inside the logo box (image 3366). */
    crop: { w: 111.94, h: 114.63, left: -5.04, top: -6.95 },
    /** Offset of the copy block's centre above the card's midline. */
    offset: 22,
    titleLines: ["Technology Excellence", "Awards (2022)"],
    title: "Technology Excellence Awards (2022)",
    text: "(Quantic) Digital Customer Experience Transformation Initiative",
    textWidth: 186,
    pattern: { box: 360.945, image: 315, rotate: -9.12, flip: true, left: 82, top: -31 },
  },
  {
    logo: "cdsl",
    logoSize: [120, 42],
    offset: 26,
    titleLines: ["Appreciation from", "CDSL(2021)"],
    title: "Appreciation from CDSL(2021)",
    text: "Contribution to 3 Crore Active Accounts in CDSL (2021)",
    textWidth: 157,
    pattern: { box: 435.441, image: 315, rotate: 32.82, flip: false, left: 32, top: -54 },
  },
  {
    logo: "nsdl",
    logoSize: [105, 36],
    crop: { w: 128.46, h: 197.19, left: -14.91, top: -48.6 },
    offset: 35,
    titleLines: ["NSDL Star Performer", "Award (2019)"],
    title: "NSDL Star Performer Award (2019)",
    text: "Best performance in accounts growth\nrate (BIG DPs).",
    textWidth: 157,
    /** Post Login/Body/B4 — Inter 12/16, unlike the 14/20 on the others. */
    small: true,
    pattern: { box: 437.746, image: 316.667, rotate: -32.82, flip: true, left: 39, top: -131 },
  },
  {
    logo: "bse",
    logoSize: [96, 41],
    offset: 48.5,
    titleLines: ["BSE Award (2019)"],
    title: "BSE Award (2019)",
    text: "Top performer in OFS Segment FY 2018 -19",
    textWidth: 157,
    pattern: { box: 435.441, image: 315, rotate: 32.82, flip: false, left: 40, top: -54 },
  },
] as const;

export const CSR_ACTIVITIES = [
  {
    key: "tata-memorial",
    title: "TATA Memorial",
    text: "We proudly support TATA Memorial Centre in its mission to strengthen healthcare by contributing medical equipment that improves patient care and treatment outcomes.",
    layers: ["layer-0", "layer-1"],
  },
  {
    key: "matruchhaya",
    title: "Matruchhaya",
    text: "",
    layers: ["layer-0", "layer-1", "matruchhaya"],
  },
  {
    key: "army-welfare",
    title: "Army Welfare",
    text: "",
    layers: ["layer-0", "layer-1", "army-welfare"],
  },
  { key: "kshamta", title: "Kshamta", text: "", layers: ["layer-0", "layer-1", "kshamta"] },
] as const;

const WEEKEND_VIBES =
  "Before the launch of our employee engagement initiative, it was observed that the employees went through immense work stress, and there was no pause from this hectic routine. Taking this work culture into consideration, the employee engagement team came up with the idea of Weekend Vibes. Despite having Employees with extraordinary talents, they didn’t have a platform to display them. Weekend Vibes was launched for employees to participate in activities like Karaoke, Bollywood Quizzes, Bolly-fit Dance Fitness sessions, and Paint Their Hearts Out at corporate office as pilot project. After witnessing fabulous participation, we intend to extend same across other locations soon.";

const SSL_KALAKAARS =
  "2022 saw us upgrade to a ‘DIGITAL’ platform for employees to showcase their talent on WhatsApp. This helped us reach out to our talented employees from Pan India with this SSL Kalakaars group created. Employees have been using this group extensively to showcase and share their talent. Still not a part of the ‘Kalakaars’ group? Send a message to +91 80974 57041 with your Name and Employee Code.";

/**
 * Figma "Life at SSL" 4:127383 is a two-variant set: Weekend Vibes and SSL
 * Kalakaars. Each slide places the same three frames — two tilted behind, one
 * in front — with a photo and a small offset per layer; the smart-animate
 * between variants tweens those offsets and cross-fades the photos. The pager
 * reads 01/03 and 02/03 in the frames; the third slide is not designed (the
 * Figma note leaves the third image to be decided), so the total here is the
 * number of slides actually built.
 */
export const LIFE_AT_SSL = {
  title: "Life at SSL",
  subtext: "Very moment reflects our culture, passion, and teamwork.",
  slides: [
    {
      title: "Weekend Vibes",
      body: WEEKEND_VIBES,
      left: { photo: "photo-1", dx: 0, dy: 0 },
      right: { photo: "photo-1", dx: 0, dy: 0 },
      front: { photo: "photo-2", dx: 0, dy: 0 },
    },
    {
      title: "SSL Kalakaars",
      body: SSL_KALAKAARS,
      left: { photo: "photo-1", dx: 0, dy: 0 },
      right: { photo: "photo-2", dx: -0.48, dy: -8.43 },
      front: { photo: "photo-1", dx: 0.49, dy: 8.41 },
    },
  ],
  /** Frame centres (px) inside the 606 x 412 Images box, and tilt. */
  layers: {
    left: { x: 302.28, y: 204.72, rotate: -9.96 },
    right: { x: 302.43, y: 204.41, rotate: 11 },
    front: { x: 302, y: 196, rotate: 0 },
  },
  photos: ["photo-1", "photo-2"],
  careersHref: "/careers",
} as const;
