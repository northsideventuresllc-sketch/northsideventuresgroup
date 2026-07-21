/**
 * SINGLE SOURCE OF TRUTH for Northside Ventures Group projects.
 *
 * Adding a company/product:
 * 1. Drop a transparent logo in /public/logos/<slug>.svg (or .png)
 * 2. Add an entry under the correct parent in VENTURE_TREE below
 * 3. Carousel, logo banner, and /projects glossary update automatically
 *
 * See ADDING-A-PROJECT.md at the repo root for the full agent workflow.
 */

export type VentureStatus = "live" | "placeholder";

export interface VentureNode {
  /** Stable id / logo filename stem */
  id: string;
  name: string;
  /** External URL when live; omit or null for placeholders */
  href?: string | null;
  /** Path under /public — e.g. /logos/match-fit.png */
  logo: string;
  status?: VentureStatus;
  /** Short line for glossary / carousel */
  blurb?: string;
  /** Nested ventures (division → products) */
  children?: VentureNode[];
  /**
   * When true, this node is an Intelligence Tool (IT).
   * New ITs should set this so they land in carousel + banner with the rest.
   */
  isIntelligenceTool?: boolean;
}

export const CONTACT_EMAIL = "jb@northsideventuresgroup.com";

export const SITE = {
  name: "Northside Ventures Group",
  legalName: "Northside Ventures Group LLC",
  shortName: "NVG",
  tagline: "The collective of north stars guiding ventures to a bright future.",
  overview:
    "Northside Ventures Group is the home for various for profit ventures and social enterprises that empower all industries with innovation and forward movement.",
  logo: "/logos/nvg.svg",
} as const;

export const BIO = {
  founderName: "J B",
  founderTitle: "Founder",
  /** Replace with real bio copy when ready */
  founderBio:
    "[Founder bio placeholder — a short note on why Northside exists, the through-line across ventures, and how you lead the group.]",
  cofoundersNote:
    "[Co-founders acknowledgement placeholder — credit partners and co-builders across Northside Intelligence, Foundation, and Creator Collective.]",
} as const;

/**
 * Hierarchical venture map.
 * Parents = divisions / holding entities.
 * Children = products, tools, and brands under them.
 */
export const VENTURE_TREE: VentureNode[] = [
  {
    id: "northside-intelligence",
    name: "Northside Intelligence",
    href: "https://northsideintelligence.com",
    logo: "/logos/ni.svg",
    status: "live",
    blurb: "Intelligence products, tools, and autonomous systems.",
    children: [
      {
        id: "match-fit",
        name: "Match Fit",
        href: "https://match-fit.net",
        logo: "/logos/match-fit.png",
        status: "live",
        blurb: "Athletic matching and coaching fit.",
      },
      {
        id: "streampass",
        name: "StreamPass",
        href: null,
        logo: "/logos/streampass.svg",
        status: "placeholder",
        blurb: "Cross-platform streaming command center. URL pending.",
      },
      {
        id: "wavscope",
        name: "WavScope",
        href: null,
        logo: "/logos/wavscope.svg",
        status: "placeholder",
        blurb: "Audio intelligence and waveform analysis. URL pending.",
      },
      {
        id: "axon",
        name: "AXON",
        href: "https://northsideintelligence.com/axon",
        logo: "/logos/axon.svg",
        status: "live",
        blurb: "Autonomous outreach and systems — AXON Home.",
      },
      // —— Intelligence Tools (ITs) ——
      // When a new IT ships, add it here with isIntelligenceTool: true.
      {
        id: "replyflow",
        name: "ReplyFlow",
        href: "https://northsideintelligence.com/replyflow",
        logo: "/logos/replyflow.svg",
        status: "live",
        blurb: "AI-powered customer service reply automation.",
        isIntelligenceTool: true,
      },
      {
        id: "grantbot",
        name: "GrantBot",
        href: "https://northsideintelligence.com/grantbot",
        logo: "/logos/grantbot.svg",
        status: "live",
        blurb: "AI grant finder and drafter.",
        isIntelligenceTool: true,
      },
      {
        id: "signaldesk",
        name: "Signal Desk",
        href: "https://northsideintelligence.com/signaldesk",
        logo: "/logos/signaldesk.svg",
        status: "live",
        blurb: "Unified intelligence signals hub.",
        isIntelligenceTool: true,
      },
      {
        id: "gapscan",
        name: "GapScan",
        href: "https://northsideintelligence.com/gapscan",
        logo: "/logos/gapscan.svg",
        status: "live",
        blurb: "Automated workflow gap detection.",
        isIntelligenceTool: true,
      },
      {
        id: "bridgeai",
        name: "BridgeAI",
        href: "https://northsideintelligence.com/bridgeai",
        logo: "/logos/bridgeai.svg",
        status: "live",
        blurb: "Cross-platform AI orchestration.",
        isIntelligenceTool: true,
      },
    ],
  },
  {
    id: "northside-foundation",
    name: "The Northside Foundation Inc.",
    href: null,
    logo: "/logos/foundation.svg",
    status: "placeholder",
    blurb: "Community and impact arm. Site coming soon.",
    children: [
      {
        id: "north-stars-swim",
        name: "North Stars Swim School",
        href: null,
        logo: "/logos/north-stars-swim.svg",
        status: "placeholder",
        blurb: "Swim education under the Foundation. Coming soon.",
      },
    ],
  },
  {
    id: "northside-creator-collective",
    name: "Northside Creator Collective",
    href: null,
    logo: "/logos/creator-collective.svg",
    status: "placeholder",
    blurb: "Music, culture, and creator ventures. Hub coming soon.",
    children: [
      {
        id: "northside-beats",
        name: "Northside Beats LLC",
        href: "https://northsidebeats.com",
        logo: "/logos/northside-beats.svg",
        status: "live",
        blurb: "Beats and production house.",
      },
      {
        id: "northside-artist",
        name: "NORTHSiDE",
        href: "https://linktr.ee/northsideofficial100",
        logo: "/logos/northside-artist.svg",
        status: "live",
        blurb: "Artist profile and links.",
      },
      {
        id: "lofi-by-northside",
        name: "LoFi by NORTHSiDE",
        href: "https://youtube.com/@lofibynorthside",
        logo: "/logos/lofi-northside.svg",
        status: "live",
        blurb: "LoFi channel and listening room.",
      },
      {
        id: "producer-collective",
        name: "Northside Beats Producer Collective",
        href: "https://northsidebeats100.beatstars.com",
        logo: "/logos/producer-collective.svg",
        status: "live",
        blurb: "Beat store and producer collective.",
      },
    ],
  },
];

/** Flatten every node that should appear in the holographic carousel. */
export function getCarouselItems(): VentureNode[] {
  const items: VentureNode[] = [];
  for (const group of VENTURE_TREE) {
    items.push(group);
    for (const child of group.children ?? []) {
      items.push(child);
    }
  }
  return items;
}

/** Flatten every project for the endless logo banner (logo + name). */
export function getBannerItems(): VentureNode[] {
  return getCarouselItems();
}

/** All live links only (for quick filters if needed). */
export function getLiveLinks(): VentureNode[] {
  return getCarouselItems().filter((n) => n.href && n.status !== "placeholder");
}
