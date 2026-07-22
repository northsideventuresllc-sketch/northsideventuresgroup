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
  /**
   * Each entry is a collapsible section under the Founder Bio, in
   * order. Replace with the real bio copy (with its subtitles) when
   * ready — one entry per subtitle.
   */
  founderSections: [
    {
      heading: "General Background & Story",
      body: "Jonathan (Jonny) J Booth is an entrepreneur born and raised on the North Shore of Chicago in the city of Evanston Illinois. Jonny’s upbringing was not a typical upbringing for a young African American male. He was lucky enough to be born into a family of hard working, humble, and insightful parents that have always supported Jonny throughout his entire life in the best way they knew how. Jonny was no stranger to adversity though. Jonny was always bullied from a very young age all the way through high school. Being an African American boy in a predominantly caucasian area presented unique challenge. Jonny never wanted “stoop down” to others’ level and do the same thing that others did to him. At a young age he had a moral maturity far beyond his age. Jonny also started getting treatment for mental health conditions in his early adolescence. Unfortunately, he only was given about 30-40% of his true diagnosis in adolescence with generalized anxiety disorder and clinical depression. He was misdiagnosed through middle school and high school, which made his experience with day to day activities, even more challenging because of improper medication, continued bullying, negative self-talk with high expectations, and an overall sense of not belonging. Jonny grew up a competitive swimmer and started to qualify for regional swim meets and age group state swim meets around the age of 12 years old. He became VERY invested in the sport and was able to make his varsity swim team his freshman year of high school at Loyola Academy. Unfortunately, because of the demographics and social dynamics of a private Catholic school on the North Shore of Chicago combined with the severe negative side effects of medication that was improperly prescribed, Jonny lost determination to continue competing in the sport despite his high upside. Jonny also enjoyed playing basketball from a very young age and grew up starting to become a die-hard Chicago Bulls fan since the age of 11. His favorite player was Derrick Rose (and still is to this day). Jonny decided to change sports to basketball his sophomore year of high school and competed in AAU basketball his sophomore and junior year. Jonny dedicated himself to training and playing catch up to his peers and still plays and trains for basketball to the current day. Jonny always keeps fitness as a mandatory activity in his adult life including weightlifting/powerlifting, basketball training, and swimming for extra cardio. Being an athlete and being surrounded by parents who worked for everything they have instilled a work ethic that can be compared to those of Michael Jordan and Kobe Bryant. These qualities of being an athlete shaped his outlook on life and work ethic. Jonny graduated from an alternative high school in 2017, where he found his love for music. Jonny did play the flute and clarinet in 6th grade and 10th grade respectively. Playing others’ music did not give him the determination to continue with it though. When he went to his alternative school, he found recording arts and being an artist. Jonny fell in love with the entire process of making hiphop music and he started his artist brand (and future general brand) NORTHSiDE. Jonny continued to pursue production, engineering, recording, and developing his artist brand into adulthood. NORTHSiDE can be listened to on all streaming platforms. In adulthood, Jonny moved to Atlanta, GA and graduated from Georgia State University in the class of 2024 with a Bachelor of Science in Psychology minoring in entrepreneurship. As Jonny battled his mental health all throughout the remainder of his adolescence, a passion for learning about it to help others bloomed in his early adulthood. In his early 20s, Jonny got the full diagnosis he always was looking for in ADHD, Complex-PTSD, Psychogenic Non-Epileptic Seizures, and OCD. With the full understanding of his mental health and neurodivergence, he was able to piece together why what happened in his adolescence happened. He started doing more casual research about ADHD and other neurodivergence to increase his general knowledge on the subject. Jonny also is able to manage it to a healthy and sustainable manner through his adult life.",
    },
    {
      heading: "Career",
      body: "In his professional career, Jonny started as a swim instructor at his old club team the YWCA Flying Fish in Evanston Illinois. He developed his aquatics career slowly as he continued in his early adulthood and eventually started coaching competitive swimming when he moved to Newnan GA while attending Georgia State University. He fell in love with coaching and knew that this was going to be a huge part of his life. Due to unfair treatment and wrongful termination by two different organizations, Jonny started his first big entrepreneurial venture in July of 2022 called Northside Swim Academy. Northside Swim Academy grew to a multi-location aquatics program that offered lessons, swim team, and so much more. Jonny was overfilled with joy when he knew he built his own swim team. His family acted as investors in the first years of operation, but needed to pull funding earlier than expected. After countless attempts over the course of 7 months to keep the business going, he was forced to close it down in April of 2026. Jonny was absolutely devastated. In this transitional period to the next phase of his life and career, he vowed to never let a business he created go under again. With Northside Swim Academy filing for bankruptcy and not being able to pay his debts right outside of the gate, this put an extra chip on his shoulder to make sure his next venture was a success.",
    },
    {
      heading: "Foundation of Northside Ventures Group",
      body: "In May of 2026, Jonny founded Northside Ventures Group LLC, which is what exists today! NVG is built to be the parent company of all Jonny’s ventures he continues to build. Jonny has so many different areas of interest and expertise that general entrepreneurship is what he has decided to pursue full time. Northside Ventures Group LLC also is the sole member of the non-profit organization founded by Jonny in June of 2026, The Northside Foundation Inc. The Northside Foundation is the non-profit entity that fuels all of NVG’s social ventures and community involvement projects. Jonny figured out that being able to have the freedom of jumping from venture to venture while actively working in the ventures he is most passionate about is the best way for him to go. Northside Ventures Group is responsible for multiple different for profit ventures that are growing and will continue to grow as time goes on including Northside Intelligence (housing projects such as Match Fit, AXON, and the Smart Store) and Northside Creator Collective (housing the record label and producer collective of Northside Beats, the Artist Brand of NORTHSiDE, the UGC collective, and more creative ventures). The Northside Foundation is responsible for fueling the rebirth of Northside Swim Academy in The North-Stars Swim School and also will be funding many other social ventures within the community.",
    },
    {
      heading: "Conclusion",
      body: "Jonny’s purpose has always been to help others and to make the world a better place. Failure is not an option for Jonny and Jonny is determined to establish Northside Ventures Group LLC as the Booth Family legacy that will live on and thrive past his life time and to future generations.",
    },
  ],
  /**
   * Each co-founder is collapsible; clicking their name reveals their
   * contribution. Replace the placeholder contribution copy as it's
   * written.
   */
  cofounders: [
    {
      name: "Dr. Brenda E. Booth",
      contribution: "[Contribution details coming soon.]",
    },
    {
      name: "Jonathan M. Booth",
      contribution: "[Contribution details coming soon.]",
    },
    {
      name: "Dora L. Ellington",
      contribution: "[Contribution details coming soon.]",
    },
    {
      name: "Lisa Mona Kelly",
      contribution: "[Contribution details coming soon.]",
    },
    {
      name: "A.F. (requested to stay anonymous)",
      contribution: "[Contribution details coming soon.]",
    },
  ],
  cofoundersNote:
    "(More co-founders will be written here and contributions will be added over time.)",
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
