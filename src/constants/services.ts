import type { Service } from "@/types";

// Ordered: these are the four survey stations of a transmission package,
// and the order is how the work actually runs.
export const SERVICES: Service[] = [
  {
    slug: "site-survey-metocean",
    station: "ST-01",
    title: "Site survey & metocean",
    lede: "Read the seabed before anyone commits a cable to it.",
    summary:
      "Geophysical and geotechnical campaigns, bathymetry, sediment mobility and a metocean record long enough to hold up under a lender's technical adviser.",
    deliverables: [
      "Multibeam bathymetry and sub-bottom profiling",
      "CPT and vibrocore programme with lab schedule",
      "50-year metocean hindcast and extremes analysis",
      "Unexploded ordnance risk register",
    ],
    duration: "8–16 weeks on site",
  },
  {
    slug: "cable-route-engineering",
    station: "ST-02",
    title: "Export cable route engineering",
    lede: "The shortest route is rarely the cheapest one to bury.",
    summary:
      "Route selection against burial risk, crossing agreements, thermal rating and installation vessel reach — optimised as one problem rather than four.",
    deliverables: [
      "Route position list and alignment sheets",
      "Burial assessment study and target depth of lowering",
      "Crossing and proximity agreements",
      "Thermal rating and loss modelling",
    ],
    duration: "12–20 weeks",
  },
  {
    slug: "substation-landfall-design",
    station: "ST-03",
    title: "Substation & landfall design",
    lede: "Where the sea route becomes civil works and planning consent.",
    summary:
      "Offshore platform electrical design, HDD landfall engineering and onshore substation layout carried through consent to issued-for-construction drawings.",
    deliverables: [
      "Single line diagrams to IFC",
      "HDD landfall design and exit pit arrangement",
      "Onshore substation general arrangement",
      "Consent-ready environmental appendices",
    ],
    duration: "20–40 weeks",
  },
  {
    slug: "grid-connection-commissioning",
    station: "ST-04",
    title: "Grid connection & commissioning",
    lede: "Energisation is a date, not an aspiration.",
    summary:
      "Compliance studies, owner's engineer support through installation, and the witness testing that turns a built asset into an energised one.",
    deliverables: [
      "Grid code compliance studies and derogation support",
      "Owner's engineer supervision during installation",
      "Pre-commissioning and witness test schedules",
      "As-built dossier and O&M handover",
    ],
    duration: "16–52 weeks",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
