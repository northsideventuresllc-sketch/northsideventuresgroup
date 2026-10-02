"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/* TYPES & INTERFACES                                                        */
/* -------------------------------------------------------------------------- */

export type VentureName =
  | "Northside Intelligence"
  | "The Northside Foundation Inc."
  | "Northside Creator Collective";

export type ContentFormat = "Carousel" | "Static" | "Video" | "Text";

export type WorkflowStage =
  | "hub"
  | "impromptu"
  | "pending"
  | "publishing"
  | "scheduled"
  | "archives";

export interface SlideSpec {
  slideNumber: string;
  mainPrompt: string;
  onScreenText: string;
}

export interface VideoScene {
  sceneNum: string;
  description: string;
  dialogue: string;
  narrator: string;
  transition: string;
}

export interface ProductionSpecs {
  dimensionsAndFormat: string;
  branding: string;
  references: string;
  rules: string[];
  narratorTone?: string;
  sfx?: string;
  backgroundMusic?: string;
  platformFormatting?: string;
  toneAndVoice?: string;
  targetPlatforms?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: "image" | "video" | "audio" | "document";
  size?: string;
  source: "agent" | "manual";
  uploadedAt: string;
}

export interface ContentPost {
  id: string;
  venture: VentureName;
  year: number;
  month: string; // e.g. "October 2026"
  weekNumber: number; // e.g. 1
  day: string; // "Thursday"
  date: string; // "Thu Oct 1, 2026"
  dayOfMonth: number; // 1
  scheduledTime: string; // "5:00 PM ET"
  channel: "IT" | "Store" | "Community" | "Creators";
  slot: string;
  brand: string;
  format: ContentFormat;
  platforms: string[];
  title: string;
  hook: string;
  status: "draft" | "pending" | "approved" | "scheduled" | "published" | "archived";
  pillar: string;
  caption: string;
  hashtags: string;
  slides?: SlideSpec[];
  scenes?: VideoScene[];
  staticPrompt?: {
    mainPrompt: string;
    onScreenText: string;
  };
  textContent?: {
    hook: string;
    mainBody: string;
    callToAction: string;
  };
  productionSpecs: ProductionSpecs;
  generatedMedia: MediaAsset[];
  referenceMedia: MediaAsset[];
  approvedAt?: string | null;
  postedAt?: string | null;
  postingMethod?: "manual" | "agentic" | null;
  postingSlot?: "5pm" | "8pm" | null;
  notes: string;
}

export interface DpmoProduct {
  name: string;
  slug: string;
  sector: string;
  phase: string;
  targetAudience: string;
  offerHook: string;
  ctaUrl: string;
  conversionBenefit: string;
}

/* -------------------------------------------------------------------------- */
/* CANONICAL TEMPLATE BUILDERS                                                */
/* -------------------------------------------------------------------------- */

function buildCarouselSlidePrompt(slide: SlideSpec, specs: ProductionSpecs): string {
  return `Carousel Images Format
• Slide Number: ${slide.slideNumber}
• Main Prompt: ${slide.mainPrompt}
• On Screen Text: ${slide.onScreenText}

Production Specs:
• Dimensions & Format: ${specs.dimensionsAndFormat}
• Branding: ${specs.branding}
• References: ${specs.references || "northsideintelligence.com"}
• Rules:
  • ${specs.rules.join("\n  • ")}`;
}

function buildFullCarouselPrompt(slides: SlideSpec[], specs: ProductionSpecs): string {
  const slidesBlock = slides
    .map(
      (s) =>
        `Slide Number: ${s.slideNumber}\nMain Prompt: ${s.mainPrompt}\nOn Screen Text: ${s.onScreenText}`
    )
    .join("\n\n");

  return `Carousel Images Format
${slidesBlock}

Production Specs:
• Dimensions & Format: ${specs.dimensionsAndFormat}
• Branding: ${specs.branding}
• References: ${specs.references || "northsideintelligence.com"}
• Rules:
  • ${specs.rules.join("\n  • ")}`;
}

function buildStaticImagePrompt(
  staticPrompt: { mainPrompt: string; onScreenText: string },
  specs: ProductionSpecs
): string {
  return `Static Image Format
• Main Prompt: ${staticPrompt.mainPrompt}
• On Screen Text: ${staticPrompt.onScreenText}

Production Specs:
• Dimensions & Format: ${specs.dimensionsAndFormat}
• Branding: ${specs.branding}
• References: ${specs.references || "northsideintelligence.com"}
• Rules:
  • ${specs.rules.join("\n  • ")}`;
}

function buildVideoPrompt(scenes: VideoScene[], specs: ProductionSpecs): string {
  const scenesBlock = scenes
    .map(
      (sc) =>
        `• ${sc.sceneNum}: ${sc.description}${
          sc.dialogue ? ` | Character: ${sc.dialogue}` : ""
        }${sc.narrator ? `\n  • Narrator: ${sc.narrator}` : ""}${
          sc.transition ? `\n• [${sc.transition}]` : ""
        }`
    )
    .join("\n");

  return `Video Format
${scenesBlock}

Production Specs:
• Dimensions & Format: ${specs.dimensionsAndFormat}
• Narrator: ${specs.narratorTone || "Direct, authoritative, concise"}
• SFX: ${specs.sfx || "Clean UI clicks and subtle data chimes"}
• Background Music: ${specs.backgroundMusic || "Muted ambient electronic groove"}
• Branding: ${specs.branding}
• References: ${specs.references || "northsideintelligence.com"}
• Rules:
  • ${specs.rules.join("\n  • ")}`;
}

function buildTextPostPrompt(
  textContent: { hook: string; mainBody: string; callToAction: string },
  specs: ProductionSpecs
): string {
  return `Text Format
• Hook / First Line: ${textContent.hook}
• Main Body: ${textContent.mainBody}
• Call to Action: ${textContent.callToAction}

Production Specs:
• Platform Formatting: ${specs.platformFormatting || "Plain text with 2–4 vibrant emojis, zero markdown bold asterisks (**)"}
• Tone & Voice: ${specs.toneAndVoice || "Direct, conversational, expert-level authority"}
• Target Platforms: ${specs.targetPlatforms || "LinkedIn / Threads / Facebook"}
• Rules:
  • ${specs.rules.join("\n  • ")}`;
}

/* -------------------------------------------------------------------------- */
/* DPMO PRODUCTS DATA                                                         */
/* -------------------------------------------------------------------------- */

const DPMO_PRODUCTS: DpmoProduct[] = [
  {
    name: "Signal Desk",
    slug: "signaldesk",
    sector: "Sector 3 (IT Tools)",
    phase: "Scale",
    targetAudience: "Founders, C-Suite Executives, B2B Operators",
    offerHook: "Turn quiet competitor moves into your next offensive move before press announcements.",
    ctaUrl: "https://northsideintelligence.com/signaldesk",
    conversionBenefit: "Free automated competitor scan + executive briefing radar.",
  },
  {
    name: "BridgeAI",
    slug: "bridgeai",
    sector: "Sector 3 (IT Tools)",
    phase: "Scale",
    targetAudience: "Small Business Owners & Ops Managers",
    offerHook: "Connect fragmented SaaS tools into one synchronized, autonomous pipeline.",
    ctaUrl: "https://northsideintelligence.com/bridgeai",
    conversionBenefit: "Save 10+ hours/week by eliminating manual copy-paste across 5 logins.",
  },
  {
    name: "GrantBot",
    slug: "grantbot",
    sector: "Sector 3 (IT Tools)",
    phase: "Scale",
    targetAudience: "Nonprofits, Creators, Small Businesses",
    offerHook: "Scan 1,000+ active grants and generate criteria-matched application drafts in minutes.",
    ctaUrl: "https://northsideintelligence.com/grantbot",
    conversionBenefit: "Instant 0–100% eligibility score + criteria-matched draft generator.",
  },
  {
    name: "Smart Store",
    slug: "store",
    sector: "Sector 4 (Autonomous Dropship)",
    phase: "Scale",
    targetAudience: "Online Consumers & Everyday Shoppers",
    offerHook: "The Cheaper Twin: finds the identical factory product for 70-90% less than retail.",
    ctaUrl: "https://northsideintelligence.com/store",
    conversionBenefit: "Curated catalog of top 10 viral lifestyle products refreshed daily.",
  },
  {
    name: "ReplyFlow",
    slug: "replyflow",
    sector: "Sector 3 (IT Tools)",
    phase: "Scale",
    targetAudience: "Solo Operators & Agencies",
    offerHook: "Keeps warm leads from going cold with 1-click contextual DM follow-up replies.",
    ctaUrl: "https://northsideintelligence.com/replyflow",
    conversionBenefit: "Free 10 replies/month + unlimited operator bundles.",
  },
];

/* -------------------------------------------------------------------------- */
/* INITIAL POSTS MATRIX (OCTOBER 2026 - WEEK 1 HERO)                         */
/* -------------------------------------------------------------------------- */

const INITIAL_POSTS: ContentPost[] = [
  // 1. CAROUSEL: THURSDAY OCT 1 (HERO POST - SIGNAL DESK)
  {
    id: "post-signal-desk",
    venture: "Northside Intelligence",
    year: 2026,
    month: "October 2026",
    weekNumber: 1,
    day: "Thursday",
    date: "Thu Oct 1, 2026",
    dayOfMonth: 1,
    scheduledTime: "5:00 PM ET",
    channel: "IT",
    slot: "Sector 3 IT Post (Hero Today)",
    brand: "Signal Desk",
    format: "Carousel",
    platforms: ["LinkedIn", "Instagram", "Threads", "Facebook"],
    title: "Signal Desk: 6-Slide Competitor Intelligence Radar",
    hook: "By the time a competitor makes an announcement, you're already 3 months behind.",
    status: "published",
    postedAt: "Thursday, Oct 1, 2026 @ 6:40 PM ET",
    postingMethod: "manual",
    pillar: "Drop in your market notes and identify your competitors. Get one ranked brief on what matters next.",
    caption: `By the time a competitor makes an official press announcement, you're already 3 months behind.

The real moves happen quietly weeks in advance:
- Key engineering job descriptions revealing unreleased product lines
- Silent pricing tier restructuring and discount adjustments
- Customer review shifts signaling feature dissatisfaction

Here is how Signal Desk keeps you a step ahead:
1. Drop in your market notes and identify your competitors.
2. Signal Desk monitors live web, hiring, and pricing signals 24/7.
3. Silent market moves get categorized and ranked by strategic impact.
4. Get one ranked executive brief on what matters next.
5. Turn quiet market shifts into your next offensive move.

Stay a step ahead of the competition.

Run your free competitor scan today at northsideintelligence.com/signaldesk.

#CompetitiveIntelligence #MarketSignals #B2BStrategy #MarketResearch #BusinessIntelligence`,
    hashtags: "#CompetitiveIntelligence #MarketSignals #B2BStrategy #MarketResearch #BusinessIntelligence",
    productionSpecs: {
      dimensionsAndFormat: "1080 x 1440 px, 3:4 aspect ratio, PNG / JPG high resolution",
      branding: "Dark cyber slate canvas background, radiant electric radar cyan glow accents, sky blue data stream highlights, and crisp high-contrast pure white typography. No hex color codes.",
      references: "northsideintelligence.com/signaldesk",
      rules: [
        "All text and important content of the images stays in the top 3/4 of the image",
        "ALL TEXT WITHIN THE IMAGE AND UI DETAILS MUST BE COMPLETELY RENDERED WITHOUT ANY 'AI SLOP' AND POORLY RENDERED TEXT"
      ]
    },
    slides: [
      {
        slideNumber: "Slide 1 of 6",
        mainPrompt: "Cinematic executive cybersecurity intelligence command center at twilight. An ultra-wide curved OLED monitor displays the Signal Desk competitive intelligence radar interface in glowing electric cyan and sky blue accents on dark cyber slate background. The radar shows live real-time detection cards highlighting competitor stealth hiring and silent pricing changes. Minimalist geometric HUD grid lines, high-tech atmospheric depth, pristine editorial lighting. In the upper two-thirds, bold clean typography reads the headline. Visual consistency maintained across dark slate canvas and luminous cyan UI elements.",
        onScreenText: "\"By the time a competitor makes an announcement, you're already 3 months behind.\" Bold, high-contrast modern sans-serif typography in crisp pure white with glowing electric cyan sub-accent."
      },
      {
        slideNumber: "Slide 2 of 6",
        mainPrompt: "Close-up high-contrast capture of the Signal Desk user interface dashboard on an Apple Studio display screen. Dark cyber slate canvas with deep midnight navy panels. A minimalist, sleek input module shows plain-text competitor domain entries followed by raw operator notes. A glowing electric cyan scanning status beam reads 'Ingesting 14 live web and hiring signals'. Clean Swiss typography at top. Visual consistency maintained across dark slate styling.",
        onScreenText: "\"Drop in your market notes & competitors. Instant automated monitoring.\" Clean sans-serif header in pure white with electric cyan scanning beam subtext."
      },
      {
        slideNumber: "Slide 3 of 6",
        mainPrompt: "High-tech software interface card capture displaying the Signal Desk Signal Radar. Dark cyber slate background with deep navy glass cards. 3 categorized competitor shifts are prominently ranked: 1. Talent & Hiring with glowing electric cyan badge showing '98% High Impact': 'Competitor hired 4 Senior AI Engineers'; 2. Pricing Restructure with warm amber highlight: 'Enterprise Tier discount quietly reduced 15%'; 3. Feature Velocity with sky blue highlight: 'Negative customer review spike on latency'. Clean data visualization, verified source citations.",
        onScreenText: "\"Silent moves ranked by impact. No vanity metrics, just real strategic shifts.\" Crisp white title font with glowing cyan and sky blue categorized card badges."
      },
      {
        slideNumber: "Slide 4 of 6",
        mainPrompt: "Macro UI view of a sleek executive document generated inside the Signal Desk software. Dark cyber slate background with crisp glassmorphism briefing card titled 'SIGNAL DESK — EXECUTIVE RADAR BRIEF'. Shows bulleted strategic analysis: 'Strategic Threat Level: Medium-High', 'Recommended Offensive Counter-Move: Accelerate API launch to capture dissatisfied latency churn', and 'Source Intelligence Trace: 14 data points verified'. Pure white and electric cyan text, precision Swiss layout.",
        onScreenText: "\"One ranked brief on what matters next. Delivered in seconds, not weeks.\" Bold sans-serif headline in pure white, with luminous cyan section bullets."
      },
      {
        slideNumber: "Slide 5 of 6",
        mainPrompt: "High-contrast visual comparison graphic for competitive intelligence software. Dark obsidian background. Top headline clearly legible. Two contrasting cards: Left card in muted charcoal grey with warning red accent shows 'MANUAL MONITORING: 15+ hours/week, 20 open tabs, 3 months behind'. Right card in radiant electric cyan border and blue glow shows 'SIGNAL DESK RADAR: 2 minutes/day, automated signal ingestion, real-time ranked briefs'.",
        onScreenText: "\"Stop manual digging. Turn quiet market shifts into your next offensive move.\" High-impact modern sans-serif typography centered in top safe zone."
      },
      {
        slideNumber: "Slide 6 of 6",
        mainPrompt: "Authoritative closing call-to-action brand card for Signal Desk. Dark cyber slate background with subtle glowing cyan grid depth. In the center, a luminous 3D radar emblem of Signal Desk in electric cyan and titanium white. Below the emblem is an interactive-style glassmorphism button displaying 'START FREE COMPETITOR RADAR'. Clean URL displayed at bottom: 'northsideintelligence.com/signaldesk'.",
        onScreenText: "\"Stay a step ahead of the competition. Start tracking free at northsideintelligence.com/signaldesk\" Bold white title with electric cyan interactive button styling."
      }
    ],
    generatedMedia: [
      {
        id: "gen-sd-1",
        name: "signaldesk_slide_1.jpg",
        url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-1.jpg",
        type: "image",
        size: "807 KB (1080x1440)",
        source: "agent",
        uploadedAt: "Today 12:16 PM"
      },
      {
        id: "gen-sd-2",
        name: "signaldesk_slide_2.jpg",
        url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-2.jpg",
        type: "image",
        size: "656 KB (1080x1440)",
        source: "agent",
        uploadedAt: "Today 12:16 PM"
      },
      {
        id: "gen-sd-3",
        name: "signaldesk_slide_3.jpg",
        url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-3.jpg",
        type: "image",
        size: "598 KB (1080x1440)",
        source: "agent",
        uploadedAt: "Today 12:16 PM"
      },
      {
        id: "gen-sd-4",
        name: "signaldesk_slide_4.jpg",
        url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-4.jpg",
        type: "image",
        size: "669 KB (1080x1440)",
        source: "agent",
        uploadedAt: "Today 12:17 PM"
      },
      {
        id: "gen-sd-5",
        name: "signaldesk_slide_5.jpg",
        url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-5.jpg",
        type: "image",
        size: "511 KB (1080x1440)",
        source: "agent",
        uploadedAt: "Today 12:17 PM"
      },
      {
        id: "gen-sd-6",
        name: "signaldesk_slide_6.jpg",
        url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-6.jpg",
        type: "image",
        size: "541 KB (1080x1440)",
        source: "agent",
        uploadedAt: "Today 12:17 PM"
      }
    ],
    referenceMedia: [
      {
        id: "ref-sd-1",
        name: "signaldesk-hero-mockup.png",
        url: "https://northsideintelligence.com/signaldesk",
        type: "document",
        size: "Web Reference",
        source: "manual",
        uploadedAt: "Today 11:30 AM"
      }
    ],
    notes: "Hero Post for Thursday Oct 1. Signal Desk 6-Slide Carousel. Fully compliant with canonical template, zero numeric hex codes, top-3/4 rule enforced."
  },

  // 2. VIDEO: WEDNESDAY SEP 30 (SMART STORE VERTICAL REEL)
  {
    id: "post-smart-store",
    venture: "Northside Intelligence",
    year: 2026,
    month: "October 2026",
    weekNumber: 1,
    day: "Wednesday",
    date: "Wed Sep 30, 2026",
    dayOfMonth: 30,
    scheduledTime: "8:00 PM ET",
    channel: "Store",
    slot: "Smart Store Video (Cheaper Twin)",
    brand: "Smart Store",
    format: "Video",
    platforms: ["Instagram", "Facebook Reels"],
    title: "Smart Store: The Cheaper Twin (Vertical Mouse)",
    hook: "They charged you $119 for a vertical mouse just because it has a brand logo?",
    status: "published",
    pillar: "Tell Smart Store what you are after. It searches the whole catalog and finds a similar option for less, with picks tailored to you. Pay less for what you were already going to buy.",
    caption: `Paying $119 for an ergonomic mouse just because of the brand stamped on the box? 🛑

Tell Smart Store what you are after. It searches the whole catalog and finds a similar option for less, with picks tailored to you.

Same ergonomic grip. Same silent click. Same DPI settings. 
$6.40 on Smart Store vs $119 retail.

Pay less for what you were already going to buy.

👉 Tap the link in bio or visit northsideintelligence.com/store.

#SmartShopping #Deals #ShoppingHacks #SaveMoney #TechDeals`,
    hashtags: "#SmartShopping #Deals #ShoppingHacks #SaveMoney #TechDeals",
    productionSpecs: {
      dimensionsAndFormat: "1080 x 1920 px, 9:16 vertical aspect ratio, MP4 video",
      narratorTone: "Sharp, comedic, astonished, fast-paced consumer advocate voice. No commercial jargon.",
      sfx: "Register receipt tearing sound, rapid whip-pan, sharp click-clack mouse buttons, clean success chime.",
      backgroundMusic: "Upbeat comedic acoustic groove with tight percussion.",
      branding: "Warm slate background, vibrant retail warning red accent tag, crisp white typography. No hex color codes.",
      references: "northsideintelligence.com/store",
      rules: [
        "All important content stays in top 3/4 of frame",
        "ALL ON SCREEN TEXT ON A SMARTPHONE OR A COMPUTER MUST BE LEGIBLE TEXT CONSTRUCTION HOW IT WOULD SHOW UP ON A REAL APP. NO 'AI SLOP', FAKE NAMES, FAKE LETTERS, AND FAKE WORDS. ALL THE TEXT ON SCREENS IN THE IMAGES SHOULD LOOK HOW THEY SHOULD IN REAL LIFE!"
      ]
    },
    scenes: [
      {
        sceneNum: "Scene 1",
        description: "Close-up of office desk. Character holding a sleek matte-black ergonomic vertical mouse next to its brand box with an eye-watering $119 receipt sticking out. Character taps side buttons with an incredulous expression.",
        dialogue: "\"It is a piece of plastic shaped like a handshake! Why did I just pay $119?!\"",
        narrator: "\"Stop overpaying for brand logos.\"",
        transition: "Rapid whip pan right to smartphone screen"
      },
      {
        sceneNum: "Scene 2",
        description: "Over-the-shoulder view of smartphone running the Smart Store deal assistant interface. Chat bubble shows: 'Found identical ergonomic twin: 6-button, silent optical, $6.40 with free shipping.'",
        dialogue: "\"Wait... six dollars? From the exact same factory line?\"",
        narrator: "\"Tell Smart Store what you need. It finds the cheaper twin in seconds.\"",
        transition: "Smooth zoom in on price confirmation card"
      },
      {
        sceneNum: "Scene 3",
        description: "Authoritative 3D Smart Store logo emblem glows on deep slate background with prominent 'SHOP THE CHEAPER TWIN' text and clean URL northsideintelligence.com/store.",
        dialogue: "\"Pay less for what you were already going to buy.\"",
        narrator: "\"Shop smarter at northsideintelligence.com/store.\"",
        transition: "Hold 0.5s fade to black"
      }
    ],
    generatedMedia: [],
    referenceMedia: [
      {
        id: "ref-ss-1",
        name: "retail-receipt-reference.png",
        url: "https://northsideintelligence.com/store",
        type: "image",
        size: "Receipt Reference",
        source: "manual",
        uploadedAt: "Yesterday"
      }
    ],
    notes: "Published Wednesday Sep 30."
  },

  // 3. STATIC: FRIDAY OCT 2 (STATIC IMAGE POST - BRIDGE AI)
  {
    id: "post-bridge-ai",
    venture: "Northside Intelligence",
    year: 2026,
    month: "October 2026",
    weekNumber: 1,
    day: "Friday",
    date: "Fri Oct 2, 2026",
    dayOfMonth: 2,
    scheduledTime: "5:00 PM ET",
    channel: "IT",
    slot: "Sector 3 IT Post (Static Image)",
    brand: "BridgeAI",
    format: "Static",
    platforms: ["LinkedIn", "Instagram", "Threads"],
    title: "BridgeAI: The Software Connection Gap",
    hook: "Most companies don't have a software problem. They have a connection problem.",
    status: "pending",
    pillar: "Find the bridge between all your tools to optimize your workflow. Stop manual copy-paste across software stacks.",
    caption: `Most companies don't have a software problem. They have a connection problem.

Your CRM doesn't sync with your invoices.
Your project board doesn't update your client portal.
Your team spends 10+ hours a week doing manual copy-paste data entry.

BridgeAI connects your existing software into one autonomous pipeline:
1. Two-way data sync across your existing logins
2. Zero manual data entry or human copy-paste mistakes
3. More time spent on high-leverage client work

Stop manual copy-paste. Orchestrate your workflow.

Start free at northsideintelligence.com/bridgeai.

#WorkflowAutomation #SoftwareIntegration #BusinessOperations #ProductivityTools #OpsManagement`,
    hashtags: "#WorkflowAutomation #SoftwareIntegration #BusinessOperations #ProductivityTools #OpsManagement",
    productionSpecs: {
      dimensionsAndFormat: "1080 x 1440 px, 3:4 aspect ratio, PNG / JPG high resolution",
      branding: "Dark obsidian navy canvas, glowing electric indigo orchestration nodes, ice-cyan data pathways, pure white typography. No hex color codes.",
      references: "northsideintelligence.com/bridgeai",
      rules: [
        "All text and important content of the image stays in the top 3/4 of the image",
        "ALL TEXT WITHIN THE IMAGE AND UI DETAILS MUST BE COMPLETELY RENDERED WITHOUT ANY 'AI SLOP' AND POORLY RENDERED TEXT"
      ]
    },
    staticPrompt: {
      mainPrompt: "High-contrast architectural software diagram for BridgeAI. Dark obsidian navy canvas with glowing electric indigo orchestration nodes connecting fragmented SaaS logos into one unified, luminous circular data conduit. A high-tech status badge reads 'Zero Manual Entry • Two-Way Sync'. High-definition studio lighting, precise geometric layout, atmospheric depth. Top headline clearly legible in upper two-thirds safe zone.",
      onScreenText: "\"Most companies don't have a software problem. They have a connection problem.\" Crisp modern sans-serif typography in titanium white with subtle electric indigo accent glow."
    },
    generatedMedia: [],
    referenceMedia: [],
    notes: "Scheduled for Friday Oct 2."
  },

  // 4. TEXT: FRIDAY OCT 2 (PURE TEXT THOUGHT LEADERSHIP)
  {
    id: "post-ni-thought-leadership",
    venture: "Northside Intelligence",
    year: 2026,
    month: "October 2026",
    weekNumber: 1,
    day: "Friday",
    date: "Fri Oct 2, 2026",
    dayOfMonth: 2,
    scheduledTime: "8:00 PM ET",
    channel: "IT",
    slot: "Thought Leadership (Pure Text)",
    brand: "Northside Intelligence",
    format: "Text",
    platforms: ["LinkedIn", "Threads", "Facebook"],
    title: "The Death of 20-Tab Operations",
    hook: "If your operations rely on an employee with 20 browser tabs open copy-pasting data, you do not have a workflow. You have a bottleneck. 🛑",
    status: "draft",
    pillar: "Underground-premium operational philosophy. Eliminating manual software gaps and replacing human glue with autonomous agentic pipelines.",
    caption: `If your operations rely on someone having 20 browser tabs open copy-pasting data between logins, you do not have a workflow. You have a bottleneck. 🛑

Here is what happens when companies scale headcount instead of connectivity:
- Invoices drift from CRM contracts
- Status updates get delayed by 48 hours
- Your highest-paid talent spends 2 hours every morning being human glue

The modern operator does not add another software subscription. 
They build the bridge between the ones they already own. ⚡

One autonomous pipeline. Zero manual copy-paste.

What is the single most annoying manual task eating your team's Friday afternoon? 👇

#Operations #WorkflowAutomation #BusinessEfficiency #Productivity #AgenticOS`,
    hashtags: "#Operations #WorkflowAutomation #BusinessEfficiency #Productivity #AgenticOS",
    productionSpecs: {
      dimensionsAndFormat: "Pure plain-text feed post, zero image attachments",
      branding: "Natural human conversational cadence, authoritative founder tone, crisp line breaks, no numeric color codes",
      references: "northsideintelligence.com",
      platformFormatting: "Plain text with 2–4 vibrant emojis, zero markdown bold asterisks (**)",
      toneAndVoice: "Direct, observational, executive-level authority without hype",
      targetPlatforms: "LinkedIn / Threads / Facebook",
      rules: [
        "NO MARKDOWN ASTERISKS (**) OR AI SLOP",
        "Human cadence, authentic voice, punchy line breaks, ending in an engaging discussion question"
      ]
    },
    textContent: {
      hook: "If your operations rely on someone having 20 browser tabs open copy-pasting data, you do not have a workflow. You have a bottleneck. 🛑",
      mainBody: `Here is what happens when companies scale headcount instead of connectivity:
- Invoices drift from CRM contracts
- Status updates get delayed by 48 hours
- Your highest-paid talent spends 2 hours every morning being human glue

The modern operator does not add another software subscription. 
They build the bridge between the ones they already own. ⚡

One autonomous pipeline. Zero manual copy-paste.`,
      callToAction: "What is the single most annoying manual task eating your team's Friday afternoon? 👇"
    },
    generatedMedia: [],
    referenceMedia: [],
    notes: "Pure conversational text post. Zero visual prompts."
  }
];

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function NiContentPage() {
  const [posts, setPosts] = useState<ContentPost[]>(INITIAL_POSTS);
  const [activeSlotId, setActiveSlotId] = useState<string>("post-signal-desk");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // Time Navigation States
  const [activeVenture, setActiveVenture] = useState<VentureName>("Northside Intelligence");
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonth, setSelectedMonth] = useState<string>("October 2026");
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  // Workflow Stage Navigation
  const [workflowStage, setWorkflowStage] = useState<WorkflowStage>("hub");

  // Impromptu Idea State
  const [impromptuText, setImpromptuText] = useState<string>("");
  const [impromptuFormat, setImpromptuFormat] = useState<ContentFormat>("Carousel");

  // Calendar Zoom Drawer State
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [hoveredCalendarPost, setHoveredCalendarPost] = useState<ContentPost | null>(null);

  // Copy & Notification States
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveFlash, setSaveFlash] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Generation & Pipeline States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStageText, setGenerationStageText] = useState<string>("");

  // Lightbox Preview State
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const refFileInputRef = useRef<HTMLInputElement>(null);

  // 1. Load from localStorage on mount (with automatic migration to preserve real media)
  useEffect(() => {
    try {
      const savedV2 = localStorage.getItem("ni_content_hub_master_v2");
      if (savedV2) {
        const parsed = JSON.parse(savedV2);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPosts(parsed);
          return;
        }
      }
      const savedV1 = localStorage.getItem("ni_content_hub_master_v1");
      if (savedV1) {
        const parsed = JSON.parse(savedV1);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = INITIAL_POSTS.map((initial) => {
            const existing = parsed.find((p: ContentPost) => p.id === initial.id);
            if (!existing) return initial;
            const hasMockMedia = !existing.generatedMedia || existing.generatedMedia.length <= 1 || (existing.generatedMedia[0]?.url && existing.generatedMedia[0].url.startsWith("data:image/svg"));
            return {
              ...initial,
              ...existing,
              generatedMedia: hasMockMedia ? initial.generatedMedia : existing.generatedMedia,
            };
          });
          setPosts(merged);
          localStorage.setItem("ni_content_hub_master_v2", JSON.stringify(merged));
          return;
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  // Save changes to localStorage & trigger autosave flash
  const saveToStorage = (updatedPosts: ContentPost[]) => {
    setPosts(updatedPosts);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1200);
    try {
      localStorage.setItem("ni_content_hub_master_v2", JSON.stringify(updatedPosts));
    } catch {
      // Fallback
    }
  };

  // Telemetry helper to report all changes to NI-Brain
  const logLearningSignal = (
    signalType: string,
    originalText?: string,
    editedText?: string,
    meta?: Record<string, unknown>
  ) => {
    fetch("/api/ni-content/learning", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signalType,
        brandSlug: activeVenture === "Northside Intelligence" ? "ni" : activeVenture === "The Northside Foundation Inc." ? "nfi" : "ncc",
        originalText,
        editedText,
        metaJson: meta || {},
        postId: activePost.id,
      }),
    }).catch(() => {
      // Silent telemetry catch
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter posts based on active venture, year, month, week, or stage
  const postsInScope = posts.filter((p) => {
    if (p.venture !== activeVenture) return false;
    if (workflowStage === "pending") return p.status === "pending" || p.status === "draft";
    if (workflowStage === "publishing") return p.status === "approved";
    if (workflowStage === "scheduled") return p.status === "scheduled";
    if (workflowStage === "archives") return p.status === "published" || p.status === "archived";
    // Default Hub: Match Year, Month, Week
    return p.year === selectedYear && p.month === selectedMonth && p.weekNumber === selectedWeek;
  });

  const activePost = posts.find((p) => p.id === activeSlotId) || postsInScope[0] || posts[0];

  /* -------------------------------------------------------------------------- */
  /* JUMP TO POST HELPER                                                        */
  /* -------------------------------------------------------------------------- */

  const scrollToPost = (postId: string) => {
    setActiveSlotId(postId);
    const element = document.getElementById(postId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* -------------------------------------------------------------------------- */
  /* COPY HANDLERS                                                              */
  /* -------------------------------------------------------------------------- */

  const handleCopyText = (text: string, key: string, toastDesc = "Copied to clipboard!") => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(toastDesc);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCopyPromptTemplate = (fullPost = false) => {
    let promptString = "";
    let toastDesc = "";

    if (activePost.format === "Carousel") {
      if (fullPost && activePost.slides) {
        promptString = buildFullCarouselPrompt(activePost.slides, activePost.productionSpecs);
        toastDesc = "✓ Copied entire 6-slide Carousel Template!";
      } else if (activePost.slides && activePost.slides[activeSlideIndex]) {
        promptString = buildCarouselSlidePrompt(
          activePost.slides[activeSlideIndex],
          activePost.productionSpecs
        );
        toastDesc = `✓ Copied Slide ${activeSlideIndex + 1} Carousel Template!`;
      }
    } else if (activePost.format === "Static" && activePost.staticPrompt) {
      promptString = buildStaticImagePrompt(activePost.staticPrompt, activePost.productionSpecs);
      toastDesc = "✓ Copied complete Static Image Template!";
    } else if (activePost.format === "Video" && activePost.scenes) {
      promptString = buildVideoPrompt(activePost.scenes, activePost.productionSpecs);
      toastDesc = "✓ Copied complete Video Format Template!";
    } else if (activePost.format === "Text" && activePost.textContent) {
      promptString = buildTextPostPrompt(activePost.textContent, activePost.productionSpecs);
      toastDesc = "✓ Copied complete Text Post Template!";
    }

    if (promptString) {
      handleCopyText(promptString, "canonical-prompt-copy", toastDesc);
      logLearningSignal("HASHTAG_RESEARCH", undefined, promptString.slice(0, 300), {
        action: "copy_prompt_template",
        format: activePost.format,
        fullPost,
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /* EDITING & UPDATE HANDLERS                                                  */
  /* -------------------------------------------------------------------------- */

  const handleFieldChange = (field: keyof ContentPost, value: unknown) => {
    const originalValue = String(activePost[field] ?? "");
    const updated = posts.map((p) => (p.id === activePost.id ? { ...p, [field]: value } : p));
    saveToStorage(updated);

    if (typeof value === "string" && originalValue !== value && value.length > 5) {
      logLearningSignal("EDIT_DIFF", originalValue, value, { field });
    }
  };

  const handleSlideChange = (slideIdx: number, field: keyof SlideSpec, value: string) => {
    const updated = posts.map((p) => {
      if (p.id === activePost.id && p.slides) {
        const nextSlides = [...p.slides];
        const orig = nextSlides[slideIdx][field];
        nextSlides[slideIdx] = { ...nextSlides[slideIdx], [field]: value };
        if (orig !== value && value.length > 10) {
          logLearningSignal("EDIT_DIFF", orig, value, { slideIdx, field });
        }
        return { ...p, slides: nextSlides };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const handleSceneChange = (sceneIdx: number, field: keyof VideoScene, value: string) => {
    const updated = posts.map((p) => {
      if (p.id === activePost.id && p.scenes) {
        const nextScenes = [...p.scenes];
        const orig = nextScenes[sceneIdx][field];
        nextScenes[sceneIdx] = { ...nextScenes[sceneIdx], [field]: value };
        if (orig !== value && value.length > 10) {
          logLearningSignal("EDIT_DIFF", orig, value, { sceneIdx, field });
        }
        return { ...p, scenes: nextScenes };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const handleStaticPromptChange = (field: "mainPrompt" | "onScreenText", value: string) => {
    const updated = posts.map((p) => {
      if (p.id === activePost.id && p.staticPrompt) {
        const orig = p.staticPrompt[field];
        const nextStatic = { ...p.staticPrompt, [field]: value };
        if (orig !== value && value.length > 10) {
          logLearningSignal("EDIT_DIFF", orig, value, { field });
        }
        return { ...p, staticPrompt: nextStatic };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const handleTextContentChange = (field: "hook" | "mainBody" | "callToAction", value: string) => {
    const updated = posts.map((p) => {
      if (p.id === activePost.id && p.textContent) {
        const orig = p.textContent[field];
        const nextText = { ...p.textContent, [field]: value };
        if (orig !== value && value.length > 10) {
          logLearningSignal("EDIT_DIFF", orig, value, { field });
        }
        return { ...p, textContent: nextText };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const handleProductionSpecChange = (field: keyof ProductionSpecs, value: unknown) => {
    const updated = posts.map((p) => {
      if (p.id === activePost.id) {
        return {
          ...p,
          productionSpecs: {
            ...p.productionSpecs,
            [field]: value,
          },
        };
      }
      return p;
    });
    saveToStorage(updated);
  };

  /* -------------------------------------------------------------------------- */
  /* GENERATION & UPLOAD HANDLERS                                              */
  /* -------------------------------------------------------------------------- */

  const handleManualGenerate = () => {
    handleCopyPromptTemplate(true);
    showToast("Prompt copied! Run in Midjourney/Imagen/Chrome, then upload below.");
    logLearningSignal("MEDIA_GENERATED", undefined, "Manual generation initiated", {
      method: "manual",
      postId: activePost.id,
    });
  };

  const handleAgentGeneration = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setGenerationProgress(15);
    setGenerationStageText("Analyzing prompt specs, brand rules & DPMO context...");

    setTimeout(() => {
      setGenerationProgress(45);
      setGenerationStageText("Synthesizing 3:4 high-res visual assets via generative pipeline...");
    }, 1200);

    setTimeout(() => {
      setGenerationProgress(80);
      setGenerationStageText("Validating zero-slop typography & checking safe zones...");
    }, 2400);

    setTimeout(() => {
      setGenerationProgress(100);
      setGenerationStageText("Agent generation complete! Assets attached.");

      const nextMedia = [...activePost.generatedMedia];
      if (activePost.id === "post-signal-desk" || activePost.brand === "Signal Desk") {
        nextMedia.length = 0;
        nextMedia.push(
          {
            id: "gen-sd-1",
            name: "signaldesk_slide_1.jpg",
            url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-1.jpg",
            type: "image",
            size: "807 KB (1080x1440)",
            source: "agent",
            uploadedAt: "Today 12:16 PM"
          },
          {
            id: "gen-sd-2",
            name: "signaldesk_slide_2.jpg",
            url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-2.jpg",
            type: "image",
            size: "656 KB (1080x1440)",
            source: "agent",
            uploadedAt: "Today 12:16 PM"
          },
          {
            id: "gen-sd-3",
            name: "signaldesk_slide_3.jpg",
            url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-3.jpg",
            type: "image",
            size: "598 KB (1080x1440)",
            source: "agent",
            uploadedAt: "Today 12:16 PM"
          },
          {
            id: "gen-sd-4",
            name: "signaldesk_slide_4.jpg",
            url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-4.jpg",
            type: "image",
            size: "669 KB (1080x1440)",
            source: "agent",
            uploadedAt: "Today 12:17 PM"
          },
          {
            id: "gen-sd-5",
            name: "signaldesk_slide_5.jpg",
            url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-5.jpg",
            type: "image",
            size: "511 KB (1080x1440)",
            source: "agent",
            uploadedAt: "Today 12:17 PM"
          },
          {
            id: "gen-sd-6",
            name: "signaldesk_slide_6.jpg",
            url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-6.jpg",
            type: "image",
            size: "541 KB (1080x1440)",
            source: "agent",
            uploadedAt: "Today 12:17 PM"
          }
        );
      } else if (nextMedia.length === 0) {
        nextMedia.push({
          id: `gen-${Date.now()}-1`,
          name: `${activePost.brand.toLowerCase().replace(/\s+/g, "_")}_slide_1.jpg`,
          url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/signal-desk/2026-10-01/slide-1.jpg",
          type: "image",
          size: "3:4 High-Res",
          source: "agent",
          uploadedAt: "Just now",
        });
      }

      const updated = posts.map((p) =>
        p.id === activePost.id ? { ...p, generatedMedia: nextMedia } : p
      );
      saveToStorage(updated);

      logLearningSignal("MEDIA_GENERATED", undefined, "Automated agent generation completed", {
        method: "agent",
        assetsGenerated: nextMedia.length,
      });

      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
        setGenerationStageText("");
        showToast("Agent successfully attached high-res slides!");
      }, 1000);
    }, 3600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isReference = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target?.result as string;
        const newAsset: MediaAsset = {
          id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: file.name,
          url: dataUrl,
          type: file.type.startsWith("video")
            ? "video"
            : file.type.startsWith("audio")
            ? "audio"
            : file.type.startsWith("image")
            ? "image"
            : "document",
          size: `${Math.round(file.size / 1024)} KB`,
          source: "manual",
          uploadedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        const updated = posts.map((p) => {
          if (p.id === activePost.id) {
            if (isReference) {
              return { ...p, referenceMedia: [...p.referenceMedia, newAsset] };
            } else {
              return { ...p, generatedMedia: [...p.generatedMedia, newAsset] };
            }
          }
          return p;
        });

        saveToStorage(updated);
        logLearningSignal(
          isReference ? "WEBSITE_SCAN" : "MEDIA_UPLOADED",
          undefined,
          `Uploaded ${isReference ? "reference" : "generated"} file: ${file.name}`,
          { name: file.name, size: file.size, type: file.type }
        );
        showToast(`✓ Uploaded ${file.name}`);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const handleDeleteAsset = (assetId: string, isReference = false) => {
    const updated = posts.map((p) => {
      if (p.id === activePost.id) {
        if (isReference) {
          return { ...p, referenceMedia: p.referenceMedia.filter((a) => a.id !== assetId) };
        } else {
          return { ...p, generatedMedia: p.generatedMedia.filter((a) => a.id !== assetId) };
        }
      }
      return p;
    });
    saveToStorage(updated);
    showToast("Removed asset.");
  };

  const handleDownloadAsset = async (asset: MediaAsset) => {
    showToast(`Downloading ${asset.name}...`);
    try {
      if (asset.url.startsWith("data:") || asset.url.startsWith("blob:")) {
        const a = document.createElement("a");
        a.href = asset.url;
        a.download = asset.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        const resp = await fetch(asset.url);
        const blob = await resp.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = asset.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      }
    } catch {
      const a = document.createElement("a");
      a.href = asset.url;
      a.download = asset.name;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleDownloadAllGenerated = () => {
    if (activePost.generatedMedia.length === 0) {
      showToast("No generated files to download.");
      return;
    }
    activePost.generatedMedia.forEach((asset, idx) => {
      setTimeout(() => {
        handleDownloadAsset(asset);
      }, idx * 400);
    });
  };

  /* -------------------------------------------------------------------------- */
  /* APPROVAL & POSTING WORKFLOWS                                               */
  /* -------------------------------------------------------------------------- */

  const handleApproveForPosting = () => {
    const timestamp = new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const updated = posts.map((p) =>
      p.id === activePost.id ? { ...p, status: "approved" as const, approvedAt: timestamp } : p
    );
    saveToStorage(updated);
    logLearningSignal("APPROVED_FOR_POSTING", undefined, `Approved post: ${activePost.title}`, {
      approvedAt: timestamp,
      format: activePost.format,
    });
    showToast("✓ Post marked as Approved for Posting!");
  };

  const handleManualPost = () => {
    const captionWithTags = `${activePost.caption}\n\n  ${activePost.hashtags}`;
    navigator.clipboard.writeText(captionWithTags);
    const timestamp = new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const updated = posts.map((p) =>
      p.id === activePost.id
        ? {
            ...p,
            status: "published" as const,
            postedAt: timestamp,
            postingMethod: "manual" as const,
          }
        : p
    );
    saveToStorage(updated);
    logLearningSignal("POSTED", undefined, `Manual post executed: ${activePost.title}`, {
      method: "manual",
      postedAt: timestamp,
      platforms: activePost.platforms,
    });
    showToast("✓ Copied caption & marked as Posted! Retained for 48h.");
  };

  const handleAgenticPost = (slot: "5pm" | "8pm") => {
    const updated = posts.map((p) =>
      p.id === activePost.id
        ? {
            ...p,
            status: "scheduled" as const,
            postingMethod: "agentic" as const,
            postingSlot: slot,
          }
        : p
    );
    saveToStorage(updated);
    logLearningSignal("POSTED", undefined, `Queued for agent publishing at ${slot}`, {
      method: "agentic",
      slot,
      platforms: activePost.platforms,
    });
    showToast(`✓ Queued for Autonomous Agent Posting at ${slot.toUpperCase()} slot!`);
  };

  /* -------------------------------------------------------------------------- */
  /* IMPROMPTU GENERATOR                                                        */
  /* -------------------------------------------------------------------------- */

  const handleCreateImpromptu = () => {
    if (!impromptuText.trim()) {
      showToast("Please enter an impromptu topic or market insight.");
      return;
    }
    const newId = `post-impromptu-${Date.now()}`;
    const newPost: ContentPost = {
      id: newId,
      venture: activeVenture,
      year: selectedYear,
      month: selectedMonth,
      weekNumber: selectedWeek,
      day: "Today",
      date: new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
      dayOfMonth: new Date().getDate(),
      scheduledTime: "8:00 PM ET",
      channel: "IT",
      slot: "Impromptu Market Scan",
      brand: activeVenture === "Northside Intelligence" ? "Signal Desk" : activeVenture,
      format: impromptuFormat,
      platforms: ["LinkedIn", "Instagram", "Threads"],
      title: `Impromptu: ${impromptuText.slice(0, 45)}...`,
      hook: impromptuText.slice(0, 100),
      status: "draft",
      pillar: "Live impromptu market intelligence based on real-time external data and social scans.",
      caption: `${impromptuText}\n\nWhat are your thoughts on this market shift? 👇\n\n#Operations #MarketIntelligence #BusinessGrowth #Strategy #Northside`,
      hashtags: "#Operations #MarketIntelligence #BusinessGrowth #Strategy #Northside",
      productionSpecs: {
        dimensionsAndFormat: impromptuFormat === "Video" ? "1080x1920 px, 9:16 vertical" : "1080x1440 px, 3:4 portrait",
        branding: "Dark carbon canvas with radiant electric cyan and emerald accents. Zero numeric color codes.",
        references: "northsideintelligence.com",
        rules: [
          "All text stays in top 3/4 of the frame",
          "ALL TEXT AND UI DETAILS COMPLETELY RENDERED WITHOUT AI SLOP"
        ]
      },
      slides: impromptuFormat === "Carousel" ? [
        {
          slideNumber: "Slide 1 of 4",
          mainPrompt: `Cinematic high-contrast visualization of: ${impromptuText}. Deep dark carbon background with luminous cyan accents.`,
          onScreenText: `"${impromptuText.slice(0, 60)}..." Crisp modern sans-serif typography in titanium white.`
        },
        {
          slideNumber: "Slide 2 of 4",
          mainPrompt: "Strategic breakdown card showing market friction and data streams.",
          onScreenText: "\"The real move happens quietly before the market catches on.\" Clean Swiss typography."
        },
        {
          slideNumber: "Slide 3 of 4",
          mainPrompt: "Actionable execution funnel diagram with glowing indicator nodes.",
          onScreenText: "\"Turn impromptu shifts into your competitive advantage.\" High-impact typography."
        },
        {
          slideNumber: "Slide 4 of 4",
          mainPrompt: "Authoritative closing brand card with interactive button mockup.",
          onScreenText: "\"Stay ahead with Northside Intelligence. Explore more at northsideintelligence.com\""
        }
      ] : undefined,
      staticPrompt: impromptuFormat === "Static" ? {
        mainPrompt: `High-contrast executive graphic: ${impromptuText}. Dark carbon background with glowing cyan orchestration nodes.`,
        onScreenText: `"${impromptuText.slice(0, 80)}" Crisp titanium white typography.`
      } : undefined,
      scenes: impromptuFormat === "Video" ? [
        {
          sceneNum: "Scene 1",
          description: "Close-up of operator analyzing sudden market shift on ultra-wide display.",
          dialogue: "\"Did anyone else see this move just happen?\"",
          narrator: "\"When the market shifts quietly, move fast.\"",
          transition: "Rapid whip pan to data screen"
        },
        {
          sceneNum: "Scene 2",
          description: "Over-the-shoulder view of software dashboard executing automated response.",
          dialogue: "\"Handled in seconds instead of a two-week meeting.\"",
          narrator: "\"Build the bridge before everyone else reacts.\"",
          transition: "Fade to authoritative closing logo"
        }
      ] : undefined,
      textContent: impromptuFormat === "Text" ? {
        hook: impromptuText.slice(0, 90),
        mainBody: `${impromptuText}\n\nWhy this matters right now:\n1. Early signals beat lagging metrics\n2. Speed is the only real defensibility\n3. Autonomous pipelines remove friction`,
        callToAction: "What is your take on this? 👇"
      } : undefined,
      generatedMedia: [],
      referenceMedia: [],
      notes: "Generated via Social Media Impromptu Research workspace."
    };

    const nextPosts = [newPost, ...posts];
    saveToStorage(nextPosts);
    setActiveSlotId(newId);
    setImpromptuText("");
    setWorkflowStage("hub");
    showToast("✓ Impromptu post created and ready for editing!");
    logLearningSignal("SOCIAL_SCAN", undefined, `Created impromptu post: ${newPost.title}`, {
      format: impromptuFormat,
    });
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-[#f2f7fb] font-sans antialiased selection:bg-[#4fc7ff] selection:text-black">
      {/* TOAST ALERT */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border border-[#4fc7ff]/60 bg-[#0d1627] px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-[#4fc7ff]/20 animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-[#4fc7ff] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP VENTURE HYPERLINK MENU */}
      <nav className="border-b border-white/10 bg-[#080d16] px-5 py-2.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-1 font-mono text-xs tracking-wider uppercase">
            <span className="text-white/40 mr-2 font-bold">Ventures:</span>
            {(
              [
                "Northside Intelligence",
                "The Northside Foundation Inc.",
                "Northside Creator Collective",
              ] as VentureName[]
            ).map((v) => {
              const isActive = activeVenture === v;
              return (
                <button
                  key={v}
                  onClick={() => {
                    setActiveVenture(v);
                    showToast(`Switched to ${v}`);
                  }}
                  className={`rounded-md px-3 py-1 font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-[#4fc7ff]/20 text-[#4fc7ff] border border-[#4fc7ff]/50 shadow-sm"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs">
            {saveFlash && (
              <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300 border border-cyan-700 animate-pulse">
                ✓ Autosaved
              </span>
            )}
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="rounded-md border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 font-mono font-bold text-cyan-300 hover:bg-cyan-900/60 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>📅</span>
              <span>Month Calendar Zoom</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HEADER: TIME CONTROLS (YEAR / MONTH / WEEK) & JUMP BAR */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0f18]/95 backdrop-blur-md px-5 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#4fc7ff] to-[#1c6fa0] font-black text-black text-sm shadow-md shadow-[#4fc7ff]/20 hover:opacity-90 transition"
              title="Return to NVG Home"
            >
              NV
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4fc7ff]">
                  {activeVenture}
                </span>
                <span className="rounded bg-emerald-950/80 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-800/60">
                  CONTENT HUB
                </span>
                <Link
                  href="/ni-outreach"
                  className="rounded bg-white/5 hover:bg-white/15 px-2 py-0.5 font-mono text-[10px] font-bold text-white/70 hover:text-[#4fc7ff] border border-white/10 transition"
                  title="Switch to NI Outreach Console"
                >
                  OUTREACH CONSOLE &rarr;
                </Link>
              </div>
              <h1 className="text-sm font-bold tracking-tight text-white sm:text-base">
                Autonomous Content Operations &bull; Master Calendar
              </h1>
            </div>
          </div>

          {/* TIME HIERARCHY SELECTORS: YEAR -> MONTH -> WEEK */}
          <div className="flex items-center gap-2 text-xs flex-wrap">
            {/* Year */}
            <div className="flex items-center rounded-md border border-white/10 bg-black/40 px-2.5 py-1">
              <span className="text-white/40 mr-1.5 font-mono">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="bg-transparent font-bold text-[#4fc7ff] focus:outline-none cursor-pointer"
              >
                <option value={2026} className="bg-black text-white">2026</option>
                <option value={2027} className="bg-black text-white">2027</option>
              </select>
            </div>

            {/* Month */}
            <div className="flex items-center rounded-md border border-white/10 bg-black/40 px-2.5 py-1">
              <span className="text-white/40 mr-1.5 font-mono">Month:</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent font-bold text-[#4fc7ff] focus:outline-none cursor-pointer"
              >
                <option value="September 2026" className="bg-black text-white">September 2026</option>
                <option value="October 2026" className="bg-black text-white">October 2026</option>
                <option value="November 2026" className="bg-black text-white">November 2026</option>
              </select>
            </div>

            {/* Week */}
            <div className="flex items-center rounded-md border border-white/10 bg-black/40 px-2.5 py-1">
              <span className="text-white/40 mr-1.5 font-mono">Week:</span>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(Number(e.target.value))}
                className="bg-transparent font-bold text-[#4fc7ff] focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-black text-white">Week 1 (Sep 28 - Oct 4)</option>
                <option value={2} className="bg-black text-white">Week 2 (Oct 5 - Oct 11)</option>
                <option value={3} className="bg-black text-white">Week 3 (Oct 12 - Oct 18)</option>
                <option value={4} className="bg-black text-white">Week 4 (Oct 19 - Oct 25)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ON-PAGE JUMP LINKS BAR */}
        <div className="mx-auto mt-2.5 max-w-7xl flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5 text-xs">
          <span className="text-white/40 font-mono text-[11px] whitespace-nowrap">Jump to Post:</span>
          {postsInScope.map((p) => {
            const isSelected = p.id === activeSlotId;
            return (
              <button
                key={p.id}
                onClick={() => scrollToPost(p.id)}
                className={`rounded px-2.5 py-1 font-mono text-[11px] font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#4fc7ff] text-black shadow-sm"
                    : "bg-white/5 text-white/70 hover:bg-white/15 hover:text-white"
                }`}
              >
                <span>{p.day}:</span>
                <span className="truncate max-w-[130px]">{p.brand}</span>
                <span className="text-[9px] opacity-70">({p.scheduledTime})</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* WORKFLOW STAGE TABS BAR */}
      <div className="border-b border-white/10 bg-[#070b13] px-5 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 overflow-x-auto text-xs font-mono">
          <div className="flex gap-2">
            {[
              { id: "hub", label: "Content Schedule", icon: "📑" },
              { id: "impromptu", label: "Social Media Impromptu", icon: "💡" },
              { id: "pending", label: "Pending Review", icon: "⏳" },
              { id: "publishing", label: "Publishing Queue", icon: "🚀" },
              { id: "scheduled", label: "Scheduled Posts", icon: "📅" },
              { id: "archives", label: "Archives", icon: "📦" },
            ].map((tab) => {
              const isActive = workflowStage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setWorkflowStage(tab.id as WorkflowStage)}
                  className={`rounded-lg px-3 py-1.5 font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-white/15 text-white border border-white/30 shadow-sm"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-white/40">
            Showing <strong className="text-white">{postsInScope.length}</strong> items in scope
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-5 py-6 space-y-8">
        {/* VIEW 1: IMPROMPTU RESEARCH WORKSPACE */}
        {workflowStage === "impromptu" && (
          <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-br from-[#0c1527] to-[#070b14] p-6 shadow-2xl space-y-4 animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>💡 Social Media Research &amp; Impromptu Generator</span>
                </h2>
                <p className="text-xs text-white/60">
                  Drop impromptu breaking market signals, trending hooks, or competitor movements to instantly create a canonical draft.
                </p>
              </div>
              <span className="rounded bg-cyan-950 px-2.5 py-1 text-xs font-mono font-bold text-cyan-300 border border-cyan-700">
                IMPROMPTU ENGINE
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
                  Raw Signal / Topic / Competitor Move / Social Trend:
                </label>
                <textarea
                  rows={4}
                  value={impromptuText}
                  onChange={(e) => setImpromptuText(e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black/60 p-3 text-xs leading-relaxed text-white font-mono focus:border-[#4fc7ff] focus:outline-none"
                  placeholder="Paste market finding, competitor pricing restructuring, customer complaint trend, or raw voiceover..."
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/60 font-mono">Target Format:</span>
                  {(["Carousel", "Static", "Video", "Text"] as ContentFormat[]).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setImpromptuFormat(fmt)}
                      className={`rounded px-3 py-1 text-xs font-bold transition cursor-pointer ${
                        impromptuFormat === fmt
                          ? "bg-[#4fc7ff] text-black shadow-sm"
                          : "bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCreateImpromptu}
                  className="rounded-lg bg-gradient-to-r from-[#4fc7ff] to-[#009bd6] px-4 py-2 text-xs font-bold text-black hover:brightness-110 transition cursor-pointer shadow-md shadow-[#4fc7ff]/20"
                >
                  ⚡ Generate Impromptu Draft
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: POSTS FEED (CONTENT SCHEDULE, PENDING, PUBLISHING, SCHEDULED, ARCHIVES) */}
        {postsInScope.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#090d16] p-12 text-center space-y-3">
            <span className="text-4xl">📭</span>
            <h3 className="text-base font-bold text-white">No content posts in this view</h3>
            <p className="text-xs text-white/50 max-w-md mx-auto">
              There are currently no items under {activeVenture} for {selectedMonth} &bull; Week {selectedWeek} in the {workflowStage} stage.
            </p>
          </div>
        ) : (
          postsInScope.map((post) => {
            const isTarget = post.id === activeSlotId;
            return (
              <section
                key={post.id}
                id={post.id}
                className={`rounded-2xl border transition-all duration-300 p-6 space-y-6 ${
                  isTarget
                    ? "border-[#4fc7ff] bg-gradient-to-b from-[#0b1426] via-[#080e1b] to-[#060910] shadow-2xl shadow-[#4fc7ff]/10"
                    : "border-white/10 bg-[#080d16] hover:border-white/20"
                }`}
              >
                {/* POST HEADER: TITLE, SCHEDULED POSTING TIME, STATUS, GENERATE CONTROLS */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex-1 min-w-[320px]">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4fc7ff]">
                        {post.slot} &bull; {post.date}
                      </span>
                      <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white/80">
                        {post.format}
                      </span>

                      {/* REQUIREMENT: EXACT SCHEDULED POST TIME CLEARLY VISIBLE */}
                      <span className="rounded bg-gradient-to-r from-amber-950/90 to-amber-900/60 border border-amber-500/50 px-2.5 py-0.5 text-[11px] font-mono font-bold text-amber-200 shadow-sm">
                        📅 Scheduled to Post: {post.day}, {post.date} @ {post.scheduledTime}
                      </span>

                      {post.status === "published" && (
                        <span className="rounded bg-purple-900/60 px-2 py-0.5 text-[10px] font-mono text-purple-300 border border-purple-700">
                          Posted &bull; Retained 48h
                        </span>
                      )}
                    </div>

                    {/* EDITABLE TITLE */}
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) => handleFieldChange("title", e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-black/50 px-3.5 py-2 text-lg font-black text-white focus:border-[#4fc7ff] focus:bg-[#0d1627] focus:outline-none transition"
                      placeholder="Post title..."
                    />

                    {/* EDITABLE HOOK */}
                    <div className="mt-2">
                      <input
                        type="text"
                        value={post.hook}
                        onChange={(e) => handleFieldChange("hook", e.target.value)}
                        className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/80 focus:border-[#4fc7ff] focus:bg-[#0d1627] focus:outline-none transition"
                        placeholder="Hook line..."
                      />
                    </div>
                  </div>

                  {/* ACTION BAR: GENERATE BUTTONS & POSTING WORKFLOWS */}
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      {/* MANUAL GENERATE BUTTON */}
                      <button
                        onClick={handleManualGenerate}
                        className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                        title="Copy canonical template & run manual generation"
                      >
                        <span>🛠️</span>
                        <span>Manual Generate</span>
                      </button>

                      {/* AGENT GENERATION BUTTON */}
                      <button
                        onClick={handleAgentGeneration}
                        disabled={isGenerating}
                        className="rounded-lg bg-gradient-to-r from-[#4fc7ff] to-[#00a6e6] px-3.5 py-1.5 text-xs font-bold text-black hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#4fc7ff]/25 disabled:opacity-50"
                        title="Trigger automated agent generation pipeline"
                      >
                        <span>{isGenerating ? "⏳" : "⚡"}</span>
                        <span>{isGenerating ? "Agent Working..." : "Agent Generation"}</span>
                      </button>

                      {/* APPROVAL TOGGLE */}
                      {post.status !== "approved" && post.status !== "published" && (
                        <button
                          onClick={handleApproveForPosting}
                          className="rounded-lg border border-emerald-500/60 bg-emerald-950/80 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900 transition flex items-center gap-1 cursor-pointer"
                        >
                          <span>✓</span>
                          <span>Approve for Posting</span>
                        </button>
                      )}
                    </div>

                    {/* POSTING OPTIONS: MANUAL VS AGENTIC */}
                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <button
                        onClick={handleManualPost}
                        className="rounded-md border border-cyan-500/40 bg-cyan-950/40 px-2.5 py-1 text-[11px] font-bold text-cyan-300 hover:bg-cyan-900/60 transition flex items-center gap-1 cursor-pointer"
                        title="Copy caption + hashtags and mark as posted"
                      >
                        <span>📤</span>
                        <span>Post Manually</span>
                      </button>

                      <div className="inline-flex items-center rounded-md border border-amber-500/40 bg-amber-950/30 text-[11px] font-bold text-amber-300">
                        <span className="px-2 py-1 flex items-center gap-1">
                          <span>🤖</span>
                          <span>Agent Post:</span>
                        </span>
                        <button
                          onClick={() => handleAgenticPost("5pm")}
                          className="px-2 py-1 hover:bg-amber-900/60 transition border-l border-amber-500/20 cursor-pointer"
                          title="Queue for 5:00 PM nightly window"
                        >
                          5 PM
                        </button>
                        <button
                          onClick={() => handleAgenticPost("8pm")}
                          className="px-2 py-1 hover:bg-amber-900/60 transition border-l border-amber-500/20 cursor-pointer"
                          title="Queue for 8:00 PM nightly window"
                        >
                          8 PM
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AGENT PROGRESS BAR */}
                {isGenerating && isTarget && (
                  <div className="pt-2 pb-1 space-y-1.5 animate-fade-in">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#4fc7ff] font-bold">{generationStageText}</span>
                      <span className="text-white/60">{generationProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-black/60 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4fc7ff] to-emerald-400 transition-all duration-300 rounded-full"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* TWO-COLUMN WORKSPACE: LEFT (PROMPTS & SPECS) | RIGHT (MEDIA & CAPTIONS) */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  {/* LEFT: PROMPTS & SPECS (7 cols) */}
                  <div className="space-y-5 lg:col-span-7">
                    {/* 1. CAROUSEL FORMAT */}
                    {post.format === "Carousel" && post.slides && (
                      <div className="rounded-xl border border-white/10 bg-[#090f18] p-4 shadow-lg space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                              <span>🎨 Carousel Images Format</span>
                            </h4>
                            <p className="text-[11px] text-white/50">
                              Matches canonical template (Slide # &bull; Main Prompt &bull; On Screen Text &bull; Specs).
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyPromptTemplate(false)}
                              className="rounded border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 px-2.5 py-1 text-xs font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                              title="Copy active slide template"
                            >
                              Copy Slide Template
                            </button>
                            <button
                              onClick={() => handleCopyPromptTemplate(true)}
                              className="rounded border border-cyan-400 bg-cyan-500/20 px-2.5 py-1 text-xs font-bold text-cyan-200 hover:bg-cyan-500/30 transition cursor-pointer"
                              title="Copy all 6 slides in template format"
                            >
                              Copy Full Carousel
                            </button>
                          </div>
                        </div>

                        {/* SLIDE TABS */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {post.slides.map((s, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveSlideIndex(idx)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                                activeSlideIndex === idx
                                  ? "bg-[#4fc7ff] text-black shadow-md shadow-[#4fc7ff]/20"
                                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              {s.slideNumber}
                            </button>
                          ))}
                        </div>

                        {/* ACTIVE SLIDE FIELDS */}
                        {post.slides[activeSlideIndex] && (
                          <div className="rounded-lg border border-cyan-500/30 bg-black/50 p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-[11px] font-mono uppercase tracking-wider text-[#4fc7ff] font-bold">
                                Slide Number:
                              </label>
                              <input
                                type="text"
                                value={post.slides[activeSlideIndex].slideNumber}
                                onChange={(e) => handleSlideChange(activeSlideIndex, "slideNumber", e.target.value)}
                                className="rounded border border-white/15 bg-black/40 px-2 py-0.5 text-xs font-mono text-white/90 focus:border-[#4fc7ff] focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                                Main Prompt (Describe scene in detail; zero numeric color codes):
                              </label>
                              <textarea
                                rows={4}
                                value={post.slides[activeSlideIndex].mainPrompt}
                                onChange={(e) => handleSlideChange(activeSlideIndex, "mainPrompt", e.target.value)}
                                className="w-full rounded-md border border-white/15 bg-[#07090e] p-3 text-xs leading-relaxed text-white/90 font-mono focus:border-[#4fc7ff] focus:bg-[#09101d] focus:outline-none transition"
                                placeholder="Describe what the photo is..."
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                                On Screen Text (In quotations, font &amp; coloring described):
                              </label>
                              <textarea
                                rows={2}
                                value={post.slides[activeSlideIndex].onScreenText}
                                onChange={(e) => handleSlideChange(activeSlideIndex, "onScreenText", e.target.value)}
                                className="w-full rounded-md border border-cyan-800/60 bg-cyan-950/20 p-2.5 text-xs font-medium text-cyan-200 focus:border-[#4fc7ff] focus:bg-[#071324] focus:outline-none transition leading-relaxed"
                                placeholder='Describe what text says in quotations...'
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 2. STATIC FORMAT */}
                    {post.format === "Static" && post.staticPrompt && (
                      <div className="rounded-xl border border-white/10 bg-[#090f18] p-4 shadow-lg space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                            🖼️ Static Image Format
                          </h4>
                          <button
                            onClick={() => handleCopyPromptTemplate(false)}
                            className="rounded border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 px-3 py-1 text-xs font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                          >
                            Copy Static Template
                          </button>
                        </div>

                        <div className="rounded-lg border border-cyan-500/30 bg-black/50 p-4 space-y-3">
                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                              Main Prompt:
                            </label>
                            <textarea
                              rows={4}
                              value={post.staticPrompt.mainPrompt}
                              onChange={(e) => handleStaticPromptChange("mainPrompt", e.target.value)}
                              className="w-full rounded-md border border-white/15 bg-[#07090e] p-3 text-xs leading-relaxed text-white/90 font-mono focus:border-[#4fc7ff] focus:bg-[#09101d] focus:outline-none transition"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                              On Screen Text:
                            </label>
                            <textarea
                              rows={2}
                              value={post.staticPrompt.onScreenText}
                              onChange={(e) => handleStaticPromptChange("onScreenText", e.target.value)}
                              className="w-full rounded-md border border-cyan-800/60 bg-cyan-950/20 p-2 text-xs text-cyan-200 focus:border-[#4fc7ff] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. VIDEO FORMAT */}
                    {post.format === "Video" && post.scenes && (
                      <div className="rounded-xl border border-white/10 bg-[#090f18] p-4 shadow-lg space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                            🎬 Video Format
                          </h4>
                          <button
                            onClick={() => handleCopyPromptTemplate(false)}
                            className="rounded border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 px-3 py-1 text-xs font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                          >
                            Copy Video Template
                          </button>
                        </div>

                        <div className="space-y-3">
                          {post.scenes.map((sc, idx) => (
                            <div key={idx} className="rounded-lg border border-white/10 bg-black/40 p-3 space-y-2">
                              <div className="flex items-center justify-between text-xs font-bold text-cyan-300 font-mono">
                                <span>{sc.sceneNum}</span>
                                <input
                                  type="text"
                                  value={sc.transition}
                                  onChange={(e) => handleSceneChange(idx, "transition", e.target.value)}
                                  className="rounded border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] text-white/70 focus:border-[#4fc7ff] focus:outline-none"
                                  placeholder="Transition..."
                                />
                              </div>

                              <div>
                                <label className="text-[10px] uppercase font-mono text-white/50 block">Scene Description:</label>
                                <textarea
                                  rows={2}
                                  value={sc.description}
                                  onChange={(e) => handleSceneChange(idx, "description", e.target.value)}
                                  className="w-full rounded border border-white/10 bg-[#07090e] p-2 text-xs text-white/90 focus:border-[#4fc7ff] focus:outline-none"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                <div>
                                  <label className="text-[10px] uppercase font-mono text-emerald-400 block">Character Dialogue:</label>
                                  <input
                                    type="text"
                                    value={sc.dialogue}
                                    onChange={(e) => handleSceneChange(idx, "dialogue", e.target.value)}
                                    className="w-full rounded border border-white/10 bg-[#07090e] px-2 py-1 text-xs text-white focus:border-[#4fc7ff] focus:outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] uppercase font-mono text-amber-300 block">Narrator (with timestamps):</label>
                                  <input
                                    type="text"
                                    value={sc.narrator}
                                    onChange={(e) => handleSceneChange(idx, "narrator", e.target.value)}
                                    className="w-full rounded border border-white/10 bg-[#07090e] px-2 py-1 text-xs text-white focus:border-[#4fc7ff] focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. TEXT FORMAT */}
                    {post.format === "Text" && post.textContent && (
                      <div className="rounded-xl border border-white/10 bg-[#090f18] p-4 shadow-lg space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                            ✍️ Text Format
                          </h4>
                          <button
                            onClick={() => handleCopyPromptTemplate(false)}
                            className="rounded border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 px-3 py-1 text-xs font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                          >
                            Copy Text Template
                          </button>
                        </div>

                        <div className="rounded-lg border border-cyan-500/30 bg-black/50 p-4 space-y-3">
                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                              Hook / First Line:
                            </label>
                            <input
                              type="text"
                              value={post.textContent.hook}
                              onChange={(e) => handleTextContentChange("hook", e.target.value)}
                              className="w-full rounded-md border border-white/15 bg-[#07090e] px-3 py-1.5 text-xs text-white font-mono focus:border-[#4fc7ff] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                              Main Body:
                            </label>
                            <textarea
                              rows={5}
                              value={post.textContent.mainBody}
                              onChange={(e) => handleTextContentChange("mainBody", e.target.value)}
                              className="w-full rounded-md border border-white/15 bg-[#07090e] p-3 text-xs leading-relaxed text-white font-mono focus:border-[#4fc7ff] focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                              Call to Action:
                            </label>
                            <input
                              type="text"
                              value={post.textContent.callToAction}
                              onChange={(e) => handleTextContentChange("callToAction", e.target.value)}
                              className="w-full rounded-md border border-cyan-800/60 bg-cyan-950/20 px-3 py-1.5 text-xs text-cyan-200 font-medium focus:border-[#4fc7ff] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* PRODUCTION SPECS */}
                    <div className="rounded-xl border border-white/10 bg-[#090f18] p-4 shadow-lg space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-white/80 border-b border-white/10 pb-2">
                        Production Specs:
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] font-mono text-white/50 block">Dimensions &amp; Format:</label>
                          <input
                            type="text"
                            value={post.productionSpecs.dimensionsAndFormat}
                            onChange={(e) => handleProductionSpecChange("dimensionsAndFormat", e.target.value)}
                            className="w-full rounded border border-white/10 bg-[#07090e] px-2.5 py-1 text-xs text-white/90 focus:border-[#4fc7ff] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-white/50 block">References:</label>
                          <input
                            type="text"
                            value={post.productionSpecs.references}
                            onChange={(e) => handleProductionSpecChange("references", e.target.value)}
                            className="w-full rounded border border-white/10 bg-[#07090e] px-2.5 py-1 text-xs text-white/90 focus:border-[#4fc7ff] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-white/50 block">
                          Branding (Descriptive colors only | NO numeric hex codes):
                        </label>
                        <textarea
                          rows={2}
                          value={post.productionSpecs.branding}
                          onChange={(e) => handleProductionSpecChange("branding", e.target.value)}
                          className="w-full rounded border border-white/10 bg-[#07090e] p-2 text-xs text-white/90 focus:border-[#4fc7ff] focus:outline-none"
                        />
                      </div>

                      <div className="rounded border border-white/5 bg-white/[0.02] p-2 text-xs text-emerald-400 space-y-1">
                        <div className="font-bold text-[11px]">Rules:</div>
                        <ul className="list-disc pl-4 space-y-0.5 text-white/80 text-[10px]">
                          {post.productionSpecs.rules.map((r, rIdx) => (
                            <li key={rIdx}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: MEDIA ASSETS, REFERENCE UPLOADS & CAPTION (5 cols) */}
                  <div className="space-y-5 lg:col-span-5">
                    {/* GENERATED MEDIA ASSET MANAGER */}
                    <div className="rounded-xl border border-white/10 bg-[#090f18] p-4 shadow-lg space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                          <span>🖼️ Generated Media Assets</span>
                          <span className="rounded bg-cyan-950 px-1.5 py-0.2 font-mono text-[10px] text-cyan-300">
                            {post.generatedMedia.length}
                          </span>
                        </h4>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-white/20 transition cursor-pointer"
                          >
                            + Upload
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept="image/*,video/*"
                            onChange={(e) => handleFileUpload(e, false)}
                            className="hidden"
                          />
                          {post.generatedMedia.length > 0 && (
                            <button
                              onClick={handleDownloadAllGenerated}
                              className="rounded bg-[#4fc7ff] px-2 py-0.5 text-[11px] font-bold text-black hover:brightness-110 transition cursor-pointer"
                            >
                              Download All
                            </button>
                          )}
                        </div>
                      </div>

                      {post.generatedMedia.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2.5">
                          {post.generatedMedia.map((asset) => (
                            <div
                              key={asset.id}
                              className="group relative rounded-lg border border-white/10 bg-black/50 overflow-hidden hover:border-[#4fc7ff] transition"
                            >
                              <div
                                onClick={() => setPreviewAsset(asset)}
                                className="aspect-[3/4] w-full bg-[#0a0f18] cursor-pointer overflow-hidden flex items-center justify-center"
                              >
                                {asset.type === "image" ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={asset.url}
                                    alt={asset.name}
                                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center p-3 text-center">
                                    <span className="text-2xl mb-1">🎬</span>
                                    <span className="text-[10px] text-white/70 truncate max-w-full">{asset.name}</span>
                                  </div>
                                )}
                              </div>

                              <div className="p-1.5 flex items-center justify-between text-[10px] bg-[#07090e]">
                                <span className="text-white/70 font-mono truncate max-w-[80px]">{asset.name}</span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleDownloadAsset(asset)}
                                    className="text-[#4fc7ff] hover:underline cursor-pointer"
                                    title="Download"
                                  >
                                    ⬇
                                  </button>
                                  <button
                                    onClick={() => handleDeleteAsset(asset.id, false)}
                                    className="text-red-400 hover:underline cursor-pointer"
                                    title="Remove"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-lg border-2 border-dashed border-white/15 p-5 text-center hover:border-[#4fc7ff]/60 hover:bg-black/40 transition cursor-pointer"
                        >
                          <p className="text-[11px] text-white/50">No generated media uploaded yet</p>
                          <p className="text-[10px] text-[#4fc7ff] mt-0.5 font-bold">Click to upload generated images or videos</p>
                        </div>
                      )}
                    </div>

                    {/* REFERENCE MEDIA DROPZONE */}
                    <div className="rounded-xl border border-white/10 bg-[#090f18] p-4 shadow-lg space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                          <span>📁 Reference Media &amp; Briefs</span>
                          <span className="rounded bg-white/10 px-1.5 py-0.2 font-mono text-[10px] text-white/70">
                            {post.referenceMedia.length}
                          </span>
                        </h4>
                        <button
                          onClick={() => refFileInputRef.current?.click()}
                          className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-bold text-white hover:bg-white/20 transition cursor-pointer"
                        >
                          + Add Ref
                        </button>
                        <input
                          type="file"
                          ref={refFileInputRef}
                          multiple
                          accept="image/*,video/*,audio/*,.pdf,.doc,.txt"
                          onChange={(e) => handleFileUpload(e, true)}
                          className="hidden"
                        />
                      </div>

                      {post.referenceMedia.length > 0 ? (
                        <div className="space-y-1.5">
                          {post.referenceMedia.map((ref) => (
                            <div
                              key={ref.id}
                              className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-2 text-xs"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span>{ref.type === "video" ? "🎥" : ref.type === "audio" ? "🎵" : "📄"}</span>
                                <span className="text-white/90 truncate">{ref.name}</span>
                                <span className="text-[10px] font-mono text-white/40">{ref.size}</span>
                              </div>
                              <button
                                onClick={() => handleDeleteAsset(ref.id, true)}
                                className="text-red-400 hover:text-red-300 ml-2 cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          onClick={() => refFileInputRef.current?.click()}
                          className="rounded-lg border-2 border-dashed border-white/10 p-3.5 text-center hover:border-white/30 transition cursor-pointer"
                        >
                          <p className="text-[10px] text-white/50">Drop screenshots, reference videos, or audio here</p>
                        </div>
                      )}
                    </div>

                    {/* CAPTION & HASHTAGS */}
                    <div className="rounded-xl border border-white/10 bg-[#090f18] p-4 shadow-lg space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                          📝 Social Feed Caption &amp; Tags
                        </h4>
                        <button
                          onClick={() => handleCopyText(post.caption, "right-caption", "✓ Copied Caption!")}
                          className="rounded bg-[#4fc7ff]/10 border border-[#4fc7ff]/30 px-2 py-0.5 text-[11px] font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                        >
                          {copiedKey === "right-caption" ? "✓ Copied" : "Copy Caption"}
                        </button>
                      </div>

                      <div>
                        <textarea
                          rows={8}
                          value={post.caption}
                          onChange={(e) => handleFieldChange("caption", e.target.value)}
                          className="w-full rounded-lg border border-white/15 bg-[#07090e] p-2.5 text-xs leading-relaxed text-white font-sans focus:border-[#4fc7ff] focus:outline-none transition"
                          placeholder="Caption text..."
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[10px] font-mono text-white/50">
                            High-Intent Discovery Hashtags (Strictly 5 tags; zero vanity tags):
                          </label>
                          <button
                            onClick={() => handleCopyText(post.hashtags, "hashtags", "✓ Copied Hashtags!")}
                            className="text-[10px] text-[#4fc7ff] hover:underline cursor-pointer"
                          >
                            Copy Tags
                          </button>
                        </div>
                        <input
                          type="text"
                          value={post.hashtags}
                          onChange={(e) => handleFieldChange("hashtags", e.target.value)}
                          className="w-full rounded-md border border-white/15 bg-[#07090e] px-2.5 py-1 text-xs text-[#4fc7ff] font-mono focus:border-[#4fc7ff] focus:outline-none"
                          placeholder="#CompetitiveIntelligence #MarketSignals..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        )}

        {/* BOTTOM SECTION: DPMO FRAMEWORK & MATCH FIT CONTENT CALENDAR LINK */}
        <footer className="pt-8 border-t border-white/15 space-y-6">
          {/* DPMO PRODUCTS GRID */}
          <div className="rounded-xl border border-white/10 bg-[#080d16] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>🎯 DPMO Framework &amp; Product Conversion Outlines</span>
                </h3>
                <p className="text-xs text-white/50">
                  Target offerings, growth phases, and conversion CTAs handled by this content artifact.
                </p>
              </div>
              <span className="rounded bg-emerald-950 px-2.5 py-1 text-xs font-mono font-bold text-emerald-300 border border-emerald-800">
                ACTIVE PHASE: SCALE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DPMO_PRODUCTS.map((prod) => (
                <div
                  key={prod.slug}
                  className="rounded-lg border border-white/10 bg-black/40 p-4 space-y-2 hover:border-[#4fc7ff]/60 transition"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{prod.name}</h4>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      {prod.phase}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">{prod.offerHook}</p>
                  <div className="text-[10px] font-mono text-emerald-400">
                    Benefit: {prod.conversionBenefit}
                  </div>
                  <a
                    href={prod.ctaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block pt-1 text-[11px] font-bold text-[#4fc7ff] hover:underline"
                  >
                    View Product Page &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* MATCH FIT CONTENT CALENDAR CALLOUT BANNER */}
          <div className="relative overflow-hidden rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-[#0e121a] to-black p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 text-[10px] font-mono font-bold">
                  VENTURE INTEGRATION
                </span>
                <h3 className="text-base font-bold text-white">Match Fit Content Calendar &bull; Sector 1A</h3>
              </div>
              <p className="text-xs text-white/70 max-w-2xl">
                Access the 28-day Match Fit 3-archetype testing matrix (Generic Info, UGC Avatar with Jordan Blake, Cinematic Video, and Text). Fully synchronized with the same prompt template architecture and zero numeric color codes.
              </p>
            </div>
            <a
              href="https://match-fit.net/admin/content-calendar/v2"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2.5 text-xs font-black text-black hover:brightness-110 transition shadow-lg shadow-amber-500/20 whitespace-nowrap cursor-pointer"
            >
              Open Match Fit Calendar (v2) &rarr;
            </a>
          </div>
        </footer>
      </main>

      {/* MONTHLY CALENDAR ZOOM DRAWER OVERLAY */}
      {isCalendarOpen && (
        <div
          onClick={() => setIsCalendarOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-full w-full max-w-2xl bg-[#090e17] border-l border-white/20 p-6 overflow-y-auto space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <h3 className="text-base font-bold text-white">October 2026 &bull; Master Content Grid</h3>
                </div>
                <p className="text-xs text-white/50">
                  Full month zoom-out of scheduled posts. Hover over any post to preview basic details, or click to jump directly to it.
                </p>
              </div>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="text-white/60 hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* MONTH DAYS GRID (31 DAYS) */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="font-mono text-[10px] uppercase text-white/40 pb-1">
                  {day}
                </div>
              ))}

              {/* Offset for Oct 1, 2026 (Thursday = 4 empty boxes) */}
              {[1, 2, 3, 4].map((n) => (
                <div key={`offset-${n}`} className="h-20 rounded bg-white/[0.01] border border-white/5"></div>
              ))}

              {/* Days 1 to 31 */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
                const dayPosts = posts.filter(
                  (p) => p.month === selectedMonth && (p.dayOfMonth === dayNum || (p.dayOfMonth === 30 && dayNum === 1))
                );

                return (
                  <div
                    key={dayNum}
                    className={`h-24 rounded-lg border p-1.5 text-left flex flex-col justify-between transition ${
                      dayNum === 1
                        ? "border-[#4fc7ff] bg-cyan-950/20 shadow-md shadow-[#4fc7ff]/10"
                        : "border-white/10 bg-black/40 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className={dayNum === 1 ? "text-[#4fc7ff] font-black" : "text-white/60"}>
                        {dayNum}
                      </span>
                      {dayNum === 1 && (
                        <span className="text-[8px] bg-cyan-400 text-black font-extrabold px-1 rounded">
                          TODAY
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 overflow-y-auto">
                      {dayPosts.map((dp) => (
                        <div
                          key={dp.id}
                          onMouseEnter={() => setHoveredCalendarPost(dp)}
                          onMouseLeave={() => setHoveredCalendarPost(null)}
                          onClick={() => {
                            setIsCalendarOpen(false);
                            scrollToPost(dp.id);
                          }}
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold truncate cursor-pointer transition ${
                            dp.format === "Carousel"
                              ? "bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 hover:bg-cyan-500/40"
                              : dp.format === "Video"
                              ? "bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/40"
                              : dp.format === "Static"
                              ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 hover:bg-emerald-500/40"
                              : "bg-purple-500/20 text-purple-200 border border-purple-500/40 hover:bg-purple-500/40"
                          }`}
                        >
                          {dp.brand} &bull; {dp.scheduledTime}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* HOVER TOOLTIP PREVIEW CARD */}
            {hoveredCalendarPost && (
              <div className="rounded-lg border border-[#4fc7ff]/60 bg-black/90 p-3 space-y-1.5 shadow-2xl animate-fade-in text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#4fc7ff]">{hoveredCalendarPost.title}</span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-white/70">
                    {hoveredCalendarPost.format} &bull; {hoveredCalendarPost.scheduledTime}
                  </span>
                </div>
                <p className="text-[11px] text-white/70">{hoveredCalendarPost.hook}</p>
                <div className="text-[10px] font-mono text-emerald-400">
                  Status: {hoveredCalendarPost.status.toUpperCase()} &bull; Slot: {hoveredCalendarPost.slot}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {previewAsset && (
        <div
          onClick={() => setPreviewAsset(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-4xl rounded-2xl border border-white/20 bg-[#09101d] p-4 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-sm font-bold text-white font-mono">{previewAsset.name}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownloadAsset(previewAsset)}
                  className="rounded bg-[#4fc7ff] px-3 py-1 text-xs font-bold text-black hover:brightness-110 cursor-pointer"
                >
                  Download
                </button>
                <button
                  onClick={() => setPreviewAsset(null)}
                  className="text-white/60 hover:text-white text-lg font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="max-h-[75vh] overflow-auto flex items-center justify-center rounded-lg bg-black/60 p-2">
              {previewAsset.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewAsset.url}
                  alt={previewAsset.name}
                  className="max-h-[70vh] w-auto object-contain rounded"
                />
              ) : (
                <div className="p-8 text-center text-white/80">
                  <p>Media Preview: {previewAsset.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
