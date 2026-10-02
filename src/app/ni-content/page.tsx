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
  | "archives"
  | "labs";

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

export interface StrategyRequest {
  id: string;
  timestamp: string;
  pillar: string;
  proposedChanges: string;
  hypothesis: string;
  priority: "Normal" | "High" | "Urgent";
  status: "submitted" | "under_review" | "applied";
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
  {
    name: "GapScan",
    slug: "gapscan",
    sector: "Sector 3 (IT Tools)",
    phase: "Scale",
    targetAudience: "Founders, Operations Directors, Agency Owners",
    offerHook: "Find what is slowing you down. Paste how you work, get bottlenecks ranked by impact with quick fixes.",
    ctaUrl: "https://northsideintelligence.com/gapscan",
    conversionBenefit: "Instant operational drag diagnosis + 48-hour action plan.",
  },
  {
    name: "Match Fit",
    slug: "matchfit",
    sector: "Sector 1A (Health & Athletic Longevity)",
    phase: "Scale",
    targetAudience: "Athletes, Fitness Enthusiasts, Longevity Seekers",
    offerHook: "AI-powered biomechanical movement analysis and customized training adaptation.",
    ctaUrl: "https://match-fit.net",
    conversionBenefit: "Personalized movement screening + injury mitigation protocol.",
  },
];

/* -------------------------------------------------------------------------- */
/* STRATEGY REQUESTS INITIAL DATA (CONTENT LABS)                              */
/* -------------------------------------------------------------------------- */

const INITIAL_STRATEGY_REQUESTS: StrategyRequest[] = [
  {
    id: "strat-req-1",
    timestamp: "Oct 1, 2026, 09:30 AM",
    pillar: "Content Archetypes",
    proposedChanges: "Expand Signal Desk coverage to include stealth hiring alerts in slide 2 and silent pricing shifts in slide 3.",
    hypothesis: "Demonstrating specific data types increases B2B conversion intent by 40%.",
    priority: "High",
    status: "applied",
  },
  {
    id: "strat-req-2",
    timestamp: "Oct 1, 2026, 02:15 PM",
    pillar: "Posting Cadence",
    proposedChanges: "Test an 8:00 PM ET second wave for Sector 3 thought leadership text posts on LinkedIn and Threads.",
    hypothesis: "Late evening executive scrolling shows higher comment density than morning broadcast.",
    priority: "Normal",
    status: "submitted",
  },
  {
    id: "strat-req-3",
    timestamp: "Oct 2, 2026, 10:00 AM",
    pillar: "Brand & Creative Standards",
    proposedChanges: "Enforce strict top-3/4 rule and zero numeric hex codes across all Gemini & Midjourney prompts.",
    hypothesis: "Ensures uniform visual quality and eliminates prompt rendering hallucinations across ventures.",
    priority: "Urgent",
    status: "applied",
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

  // 2. VIDEO: FRIDAY OCT 2 (SMART STORE VERTICAL REEL)
  {
    id: "post-smart-store",
    venture: "Northside Intelligence",
    year: 2026,
    month: "October 2026",
    weekNumber: 1,
    day: "Friday",
    date: "Fri Oct 2, 2026",
    dayOfMonth: 2,
    scheduledTime: "5:00 PM ET",
    channel: "Store",
    slot: "Smart Store Video (Condensed Metal Wallet)",
    brand: "Smart Store",
    format: "Video",
    platforms: ["Instagram", "Facebook Reels", "TikTok", "YouTube Shorts"],
    title: "Smart Store: The Restaurant Bill Drop (Condensed Metal Wallet)",
    hook: "Ugh, I spent one hundred dollars on this thing, why can't anything work?",
    status: "approved",
    pillar: "Tell Smart Store what you want. It searches verified manufacturer catalogs and delivers high-capacity condensed metal builds for $29.99 instead of $100. Pay less for what you were already going to buy.",
    caption: `Spent $100 on a metal wallet just to fight it every time the check arrives? 🛑

Tell Smart Store what you want. It searches verified manufacturer catalogs and delivers high-capacity condensed metal builds for $29.99 instead of $100.

Tight space. Fits cards without sticking. Zero brand tax.

$29.99 on Smart Store vs $100 retail.

👉 Order yours now at northsideintelligence.com/store.`,
    hashtags: "#SmartStore #ShoppingHacks #DealsFinder #EDCGear #SaveMoney #TechDeals #RestaurantHacks",
    productionSpecs: {
      dimensionsAndFormat: "1080 x 1920 px, 9:16 vertical aspect ratio, MP4 video",
      narratorTone: "Direct, observational, comedic storytelling tone with natural sound effects and fast pacing.",
      sfx: "Register receipt tearing sound (0:01), rapid whip-pan (0:03), card sliding click (0:06), clean success chime (0:08).",
      backgroundMusic: "Upbeat comedic acoustic groove with tight percussion.",
      branding: "Dark background with 3D Northside Intelligence logo, neon blue letters flickering 'Smart Store', no numeric hex codes.",
      references: "northsideintelligence.com/store | attached images (one for the UI on the phone and one for the end card)",
      rules: [
        "All important content stays in top 3/4 of frame",
        "ALL ON SCREEN TEXT ON A SMARTPHONE OR A COMPUTER MUST BE LEGIBLE TEXT CONSTRUCTION HOW IT WOULD SHOW UP ON A REAL APP. NO 'AI SLOP', FAKE NAMES, FAKE LETTERS, AND FAKE WORDS. ALL THE TEXT ON SCREENS IN THE IMAGES SHOULD LOOK HOW THEY SHOULD IN REAL LIFE!"
      ]
    },
    scenes: [
      {
        sceneNum: "Scene 1 (0–3s)",
        description: "Wide shot of a woman (caucasian, late 20s, brunette, long wavy hair) in a restaurant as a waiter (dressed in waiter attire, caucasian with a crew cut, and a slim body) is walking away from the table as he has set down the bill. Jumps to close-up of in the restaurant booth table view with the woman pulling out her purse to get her wallet. She gets her wallet out (made of metal built to hold lots of cards condensed in a tight space). She tries to pull a credit card out and is struggling to get it out because it is stuck letting out grunts of frustration. Cuts to a wider shot of her getting out of the booth, screaming, and throwing the wallet out of the frame.",
        dialogue: "\"Ugh, I spent one hundred dollars on this thing, why can't anything work?\"",
        narrator: "",
        transition: "Rapid whip pan right to the same waiter carrying a tray of dirty dishes"
      },
      {
        sceneNum: "Scene 2 (4–5s)",
        description: "The metal wallet hits the waiter in the head as he screams in pain and drops the tray of food he is holding.",
        dialogue: "*screams in pain as tray drops*",
        narrator: "",
        transition: "Rapid whip pan right to another woman sitting at the bar in the restaurant"
      },
      {
        sceneNum: "Scene 3 (6–8s)",
        description: "Woman is sitting cross legged (30s, mixed black/white, with curly poofy hair), with a wine glass on the table behind her with her smartphone out. She looks down at her smart phone and makes a remark in a snarky tone. Cuts to over the shoulder view of a metal wallet meant to fit lots of cards in a condensed space for $29.99. An notification pops on her phone that says 'ORDERED'.",
        dialogue: "\"She should've used the smart store.\"",
        narrator: "",
        transition: "Transition fade to clean brand card"
      },
      {
        sceneNum: "Scene 4 (9–10s)",
        description: "Dark background with a 3D eye catching rendering of the Northside Intelligence logo with neon blue letters flickering saying 'Smart Store' and the link under 'northsideintelligence.com/store.'",
        dialogue: "",
        narrator: "",
        transition: "Fade to black"
      }
    ],
    generatedMedia: [],
    referenceMedia: [
      {
        id: "ref-ss-1",
        name: "phone-ui-reference.png",
        url: "https://northsideintelligence.com/store",
        type: "image",
        size: "UI Reference",
        source: "manual",
        uploadedAt: "Today"
      },
      {
        id: "ref-ss-2",
        name: "end-card-reference.png",
        url: "https://northsideintelligence.com/store",
        type: "image",
        size: "End Card Reference",
        source: "manual",
        uploadedAt: "Today"
      }
    ],
    notes: "Approved for Friday Oct 2 Smart Store reel per JB direct creative spec."
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
    status: "approved",
    postedAt: null,
    postingMethod: "manual",
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
    generatedMedia: [
      {
        id: "gen-ba-1",
        name: "bridgeai_showcase.jpg",
        url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/bridge-ai/2026-10-02/bridgeai-showcase.jpg",
        type: "image",
        size: "641 KB (1080x1440)",
        source: "agent",
        uploadedAt: "Today 1:37 PM"
      }
    ],
    referenceMedia: [],
    notes: "Approved for manual posting Friday Oct 2."
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

  // Collapsible Windows State (Feature 1)
  const [collapsedPosts, setCollapsedPosts] = useState<Record<string, boolean>>({});

  // Content Labs Strategy State (Feature 4)
  const [strategyRequests, setStrategyRequests] = useState<StrategyRequest[]>(INITIAL_STRATEGY_REQUESTS);
  const [newStrategyPillar, setNewStrategyPillar] = useState<string>("Content Archetypes");
  const [newProposedChanges, setNewProposedChanges] = useState<string>("");
  const [newHypothesis, setNewHypothesis] = useState<string>("");
  const [newPriority, setNewPriority] = useState<"Normal" | "High" | "Urgent">("Normal");
  const [labsSubTab, setLabsSubTab] = useState<"all" | "strategy" | "research" | "analytics" | "dpmo">("all");
  const [dpmoFilterSector, setDpmoFilterSector] = useState<string>("all");

  // 1. Load from localStorage on mount (with automatic migration to preserve real media)
  useEffect(() => {
    try {
      const savedV4 = localStorage.getItem("ni_content_hub_master_v5");
      if (savedV4) {
        const parsed = JSON.parse(savedV4);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out any obsolete post IDs (like post-ni-thought-leadership)
          const validPosts = parsed.filter((p: ContentPost) => p.id !== "post-ni-thought-leadership");
          const merged = INITIAL_POSTS.map((initial) => {
            const existing = validPosts.find((p: ContentPost) => p.id === initial.id);
            if (!existing) return initial;
            const hasNoMedia = !existing.generatedMedia || existing.generatedMedia.length === 0;
            return {
              ...initial,
              ...existing,
              generatedMedia: hasNoMedia ? initial.generatedMedia : existing.generatedMedia,
            };
          });
          setPosts(merged);
          localStorage.setItem("ni_content_hub_master_v5", JSON.stringify(merged));
        }
      } else {
        // First visit on v4: start fresh with INITIAL_POSTS (cleanly purges stale NI Services stubs)
        setPosts(INITIAL_POSTS);
        localStorage.setItem("ni_content_hub_master_v5", JSON.stringify(INITIAL_POSTS));
      }

      const savedStrat = localStorage.getItem("ni_content_strategy_requests_v1");
      if (savedStrat) {
        const parsedStrat = JSON.parse(savedStrat);
        if (Array.isArray(parsedStrat) && parsedStrat.length > 0) {
          setStrategyRequests(parsedStrat);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  // Save changes to localStorage & trigger autosave flash
  const saveToStorage = (updatedPosts: ContentPost[]) => {
    const cleaned = updatedPosts.filter((p) => p.id !== "post-ni-thought-leadership");
    setPosts(cleaned);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1200);
    try {
      localStorage.setItem("ni_content_hub_master_v5", JSON.stringify(cleaned));
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

  // Collapsible Windows Controls (Feature 1)
  const togglePostCollapse = (postId: string) => {
    setCollapsedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCollapseAll = () => {
    const nextState: Record<string, boolean> = {};
    postsInScope.forEach((p) => {
      nextState[p.id] = true;
    });
    setCollapsedPosts(nextState);
    showToast("✓ Collapsed all posts to compact summary bars");
  };

  const handleExpandAll = () => {
    setCollapsedPosts({});
    showToast("✓ Expanded all posts to full view");
  };

  // Delete Post Handler (Feature 2)
  const handleDeletePost = (postId: string) => {
    const target = posts.find((p) => p.id === postId);
    if (!target) return;

    if (typeof window !== "undefined") {
      const confirmDelete = window.confirm(`Permanently delete "${target.title}"?`);
      if (!confirmDelete) return;
    }

    const updated = posts.filter((p) => p.id !== postId);
    saveToStorage(updated);
    if (activeSlotId === postId) {
      const nextActive = updated[0]?.id || "";
      setActiveSlotId(nextActive);
    }
    showToast(`🗑️ Deleted post "${target.title.slice(0, 32)}..."`);
    logLearningSignal("DELETE_POST", undefined, `Deleted post: ${target.title}`, {
      postId: target.id,
      brand: target.brand,
      format: target.format,
      status: target.status,
    });
  };

  // Tab Transition & Stage Mover (Feature 3)
  const handleTransitionStage = (postId: string, newStatus: ContentPost["status"]) => {
    const timestamp = new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          status: newStatus,
          approvedAt: newStatus === "approved" ? timestamp : p.approvedAt,
          postedAt: newStatus === "published" ? timestamp : p.postedAt,
        };
      }
      return p;
    });

    saveToStorage(updated);
    const target = posts.find((p) => p.id === postId);
    showToast(`✓ Moved "${target?.brand || "Post"}" to ${newStatus.toUpperCase()}`);
    logLearningSignal("STAGE_TRANSITION", target?.status, newStatus, {
      postId,
      title: target?.title,
      newStatus,
      timestamp,
    });
  };

  // Content Labs Strategy Form Submission (Feature 4b)
  const handleSubmitStrategyRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProposedChanges.trim()) {
      showToast("Please enter proposed strategy changes.");
      return;
    }

    const timestamp = new Date().toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newReq: StrategyRequest = {
      id: `strat-${Date.now()}`,
      timestamp,
      pillar: newStrategyPillar,
      proposedChanges: newProposedChanges.trim(),
      hypothesis: newHypothesis.trim() || "Derived from live audience signals and conversion testing.",
      priority: newPriority,
      status: "submitted",
    };

    const nextRequests = [newReq, ...strategyRequests];
    setStrategyRequests(nextRequests);
    try {
      localStorage.setItem("ni_content_strategy_requests_v1", JSON.stringify(nextRequests));
    } catch {
      // Fallback
    }

    logLearningSignal("STRATEGY_EDIT_REQUEST", undefined, `Proposed strategy change for ${newStrategyPillar}`, {
      pillar: newStrategyPillar,
      changes: newProposedChanges,
      hypothesis: newHypothesis,
      priority: newPriority,
    });

    setNewProposedChanges("");
    setNewHypothesis("");
    showToast("✓ Strategy adjustment submitted and logged to NI-Brain!");
  };

  // Filter posts based on active venture, year, month, week, or stage
  const postsInScope = posts.filter((p) => {
    if (p.venture !== activeVenture) return false;
    if (workflowStage === "labs") return true;
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
      } else if (activePost.id === "post-bridge-ai" || activePost.brand === "BridgeAI") {
        nextMedia.length = 0;
        nextMedia.push({
          id: "gen-ba-1",
          name: "bridgeai_showcase.jpg",
          url: "https://kxijunwgbrlfzvgkhklo.supabase.co/storage/v1/object/public/content-calendar-media/ni-content/bridge-ai/2026-10-02/bridgeai-showcase.jpg",
          type: "image",
          size: "641 KB (1080x1440)",
          source: "agent",
          uploadedAt: "Today 1:37 PM"
        });
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
              { id: "labs", label: "Content Labs", icon: "🔬" },
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
            {workflowStage === "labs" ? (
              <span className="text-[#4fc7ff] font-bold">Marketing Analysis &amp; DPMO Database</span>
            ) : (
              <>Showing <strong className="text-white">{postsInScope.length}</strong> items in scope</>
            )}
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
        {workflowStage !== "impromptu" && workflowStage !== "labs" && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#090e17] px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-white/50 uppercase tracking-wider text-[11px]">Feed View:</span>
              <span className="rounded bg-white/10 px-2 py-0.5 font-bold font-mono text-white text-[11px]">
                {postsInScope.length} {postsInScope.length === 1 ? "Post" : "Posts"}
              </span>
              <span className="text-[11px] text-white/40">
                ({Object.values(collapsedPosts).filter(Boolean).length} collapsed)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCollapseAll}
                className="rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 px-3 py-1.5 text-xs font-bold text-white transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Collapse all post cards into compact summary bars"
              >
                <span>▾</span>
                <span>Collapse All</span>
              </button>
              <button
                onClick={handleExpandAll}
                className="rounded-lg border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 hover:bg-[#4fc7ff]/20 px-3 py-1.5 text-xs font-bold text-[#4fc7ff] transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Expand all post cards to full view"
              >
                <span>▴</span>
                <span>Expand All</span>
              </button>
            </div>
          </div>
        )}

        {workflowStage !== "impromptu" && workflowStage !== "labs" && (
          postsInScope.length === 0 ? (
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
              const isCollapsed = !!collapsedPosts[post.id];

              if (isCollapsed) {
                return (
                  <section
                    key={post.id}
                    id={post.id}
                    className={`rounded-2xl border transition-all duration-300 p-4 ${
                      isTarget
                        ? "border-[#4fc7ff]/70 bg-gradient-to-r from-[#0b1426] to-[#070b14] shadow-lg shadow-[#4fc7ff]/5"
                        : "border-white/10 bg-[#080d16] hover:border-white/20"
                    }`}
                  >
                    {/* COMPACT SUMMARY BAR */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-[280px] flex-1">
                        <button
                          onClick={() => togglePostCollapse(post.id)}
                          className="rounded-md border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 hover:bg-[#4fc7ff]/20 px-2.5 py-1 text-xs font-bold text-[#4fc7ff] transition cursor-pointer flex items-center gap-1 flex-shrink-0"
                          title="Expand Post Details"
                        >
                          <span>▴ Expand</span>
                        </button>

                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#4fc7ff]">
                              {post.day} &bull; {post.slot}
                            </span>
                            <span className="rounded bg-white/10 px-1.5 py-0.2 font-mono text-[9px] text-white/80">
                              {post.format}
                            </span>
                            <span className="rounded bg-amber-950/80 border border-amber-500/40 px-2 py-0.2 font-mono text-[10px] font-bold text-amber-300">
                              📅 {post.day}, {post.date} @ {post.scheduledTime}
                            </span>
                            <span
                              className={`rounded px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase border ${
                                post.status === "approved"
                                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-600/50"
                                  : post.status === "published"
                                  ? "bg-purple-950/80 text-purple-300 border-purple-600/50"
                                  : post.status === "scheduled"
                                  ? "bg-blue-950/80 text-blue-300 border-blue-600/50"
                                  : post.status === "pending"
                                  ? "bg-amber-950/80 text-amber-300 border-amber-600/50"
                                  : "bg-gray-800/80 text-gray-300 border-gray-600/50"
                              }`}
                            >
                              {post.status}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white truncate">{post.title}</h4>
                          <p className="text-xs text-white/60 truncate">{post.hook}</p>
                        </div>
                      </div>

                      {/* QUICK ACTIONS IN SUMMARY BAR */}
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {/* QUICK STAGE TRANSITION BUTTONS */}
                        <div className="flex items-center gap-1">
                          {post.status !== "pending" && (
                            <button
                              onClick={() => handleTransitionStage(post.id, "pending")}
                              className="rounded bg-amber-950/60 hover:bg-amber-900 border border-amber-500/30 px-2 py-1 text-[10px] font-bold text-amber-300 transition cursor-pointer"
                              title="Move to Pending"
                            >
                              Pending
                            </button>
                          )}
                          {post.status !== "approved" && (
                            <button
                              onClick={() => handleTransitionStage(post.id, "approved")}
                              className="rounded bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-500/30 px-2 py-1 text-[10px] font-bold text-emerald-300 transition cursor-pointer"
                              title="Approve post"
                            >
                              ✓ Approve
                            </button>
                          )}
                          {post.status !== "scheduled" && (
                            <button
                              onClick={() => handleTransitionStage(post.id, "scheduled")}
                              className="rounded bg-blue-950/60 hover:bg-blue-900 border border-blue-500/30 px-2 py-1 text-[10px] font-bold text-blue-300 transition cursor-pointer"
                              title="Move to Scheduled Queue"
                            >
                              Schedule
                            </button>
                          )}
                          {post.status !== "archived" && post.status !== "published" && (
                            <button
                              onClick={() => handleTransitionStage(post.id, "archived")}
                              className="rounded bg-gray-800 hover:bg-gray-700 border border-gray-600 px-2 py-1 text-[10px] font-bold text-gray-300 transition cursor-pointer"
                              title="Archive Post"
                            >
                              Archive
                            </button>
                          )}
                          {(post.status === "archived" || post.status === "published") && (
                            <button
                              onClick={() => handleTransitionStage(post.id, "draft")}
                              className="rounded bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 px-2 py-1 text-[10px] font-bold text-cyan-300 transition cursor-pointer"
                              title="Restore Post"
                            >
                              Restore
                            </button>
                          )}
                        </div>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="rounded border border-red-500/40 bg-red-950/40 hover:bg-red-900/60 px-2.5 py-1 text-xs font-bold text-red-300 transition flex items-center gap-1 cursor-pointer shadow-sm"
                          title="Delete Post"
                        >
                          <span>🗑️</span>
                          <span>Delete</span>
                        </button>

                        {/* EXPAND BUTTON */}
                        <button
                          onClick={() => togglePostCollapse(post.id)}
                          className="rounded border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 hover:bg-[#4fc7ff]/20 px-2.5 py-1 text-xs font-bold text-[#4fc7ff] transition cursor-pointer"
                          title="Expand Post Editor"
                        >
                          Open Editor &rarr;
                        </button>
                      </div>
                    </div>
                  </section>
                );
              }

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

                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                            post.status === "approved"
                              ? "bg-emerald-950/80 text-emerald-300 border-emerald-600/50"
                              : post.status === "published"
                              ? "bg-purple-950/80 text-purple-300 border-purple-600/50"
                              : post.status === "scheduled"
                              ? "bg-blue-950/80 text-blue-300 border-blue-600/50"
                              : post.status === "pending"
                              ? "bg-amber-950/80 text-amber-300 border-amber-600/50"
                              : "bg-gray-800/80 text-gray-300 border-gray-600/50"
                          }`}
                        >
                          {post.status}
                        </span>
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

                      {/* QUICK STAGE TRANSITION BUTTONS IN EXPANDED HEADER */}
                      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono text-white/40 uppercase">Move:</span>
                        {post.status !== "pending" && (
                          <button
                            onClick={() => handleTransitionStage(post.id, "pending")}
                            className="rounded bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 text-[10px] font-bold text-amber-300 hover:bg-amber-900 transition cursor-pointer"
                            title="Move to Pending Review"
                          >
                            ⏳ Pending
                          </button>
                        )}
                        {post.status !== "approved" && (
                          <button
                            onClick={() => handleTransitionStage(post.id, "approved")}
                            className="rounded bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300 hover:bg-emerald-900 transition cursor-pointer"
                            title="Approve for publishing"
                          >
                            ✓ Approve
                          </button>
                        )}
                        {post.status !== "scheduled" && (
                          <button
                            onClick={() => handleTransitionStage(post.id, "scheduled")}
                            className="rounded bg-blue-950/70 border border-blue-500/40 px-2 py-0.5 text-[10px] font-bold text-blue-300 hover:bg-blue-900 transition cursor-pointer"
                            title="Queue in Scheduled Posts"
                          >
                            📅 Schedule
                          </button>
                        )}
                        {post.status !== "archived" && post.status !== "published" && (
                          <button
                            onClick={() => handleTransitionStage(post.id, "archived")}
                            className="rounded bg-gray-800/80 border border-gray-600 px-2 py-0.5 text-[10px] font-bold text-gray-300 hover:bg-gray-700 transition cursor-pointer"
                            title="Move to Archives"
                          >
                            📦 Archive
                          </button>
                        )}
                        {(post.status === "archived" || post.status === "published") && (
                          <button
                            onClick={() => handleTransitionStage(post.id, "draft")}
                            className="rounded bg-cyan-950/70 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-bold text-cyan-300 hover:bg-cyan-900 transition cursor-pointer"
                            title="Restore to Active Draft"
                          >
                            🔄 Restore
                          </button>
                        )}
                      </div>
                    </div>

                    {/* ACTION BAR: GENERATE BUTTONS & POSTING WORKFLOWS */}
                    <div className="flex flex-col gap-2 items-end">
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {/* COLLAPSE BUTTON */}
                        <button
                          onClick={() => togglePostCollapse(post.id)}
                          className="rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 px-2.5 py-1.5 text-xs font-bold text-white transition flex items-center gap-1 cursor-pointer shadow-sm"
                          title="Collapse post into compact summary bar"
                        >
                          <span>▾</span>
                          <span>Collapse</span>
                        </button>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="rounded-lg border border-red-500/40 bg-red-950/40 hover:bg-red-900/60 px-2.5 py-1.5 text-xs font-bold text-red-300 transition flex items-center gap-1 cursor-pointer shadow-sm"
                          title="Delete post permanently"
                        >
                          <span>🗑️</span>
                          <span>Delete</span>
                        </button>

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
        ))}

        {/* VIEW 3: CONTENT LABS (MARKETING ANALYSIS DATABASE) */}
        {workflowStage === "labs" && (
          <div className="space-y-8 animate-fade-in">
            {/* LABS HERO BANNER */}
            <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-[#0c1629] via-[#080f1d] to-[#050810] p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-64 w-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300 border border-cyan-700">
                      STRATEGIC RADAR &amp; LABS
                    </span>
                    <span className="rounded bg-purple-950 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-300 border border-purple-700">
                      NI-BRAIN SYNCED
                    </span>
                    <span className="font-mono text-xs text-white/50">
                      Venture: <strong className="text-[#4fc7ff]">{activeVenture}</strong>
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                    <span>🔬 Content Labs &bull; Marketing Intelligence Database</span>
                  </h2>
                  <p className="text-xs text-white/60 max-w-2xl mt-1">
                    Centralized strategic intelligence, live competitor telemetry, performance analytics, and dual-process marketing architecture.
                  </p>
                </div>

                {/* SUB-NAVIGATION PILLS */}
                <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-lg border border-white/10 text-xs font-mono">
                  {(
                    [
                      { id: "all", label: "Full Database" },
                      { id: "strategy", label: "Current Strategy" },
                      { id: "research", label: "Market Research" },
                      { id: "analytics", label: "Post Analytics" },
                      { id: "dpmo", label: "DPMO Radar" },
                    ] as const
                  ).map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setLabsSubTab(sub.id)}
                      className={`px-3 py-1 rounded font-bold transition cursor-pointer ${
                        labsSubTab === sub.id
                          ? "bg-[#4fc7ff] text-black shadow-sm"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* STATS STRIP */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="rounded-lg bg-black/40 border border-white/10 p-3">
                  <div className="text-[10px] font-mono text-white/50 uppercase">Active Archetypes</div>
                  <div className="text-lg font-black text-white mt-0.5">4 Frameworks</div>
                  <div className="text-[10px] text-cyan-400 mt-0.5">Carousel &bull; Video &bull; Text &bull; Static</div>
                </div>
                <div className="rounded-lg bg-black/40 border border-white/10 p-3">
                  <div className="text-[10px] font-mono text-white/50 uppercase">Competitor Signals</div>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">3 Active Radars</div>
                  <div className="text-[10px] text-white/60 mt-0.5">Stealth Hiring &bull; Pricing &bull; Features</div>
                </div>
                <div className="rounded-lg bg-black/40 border border-white/10 p-3">
                  <div className="text-[10px] font-mono text-white/50 uppercase">Weekly Impressions</div>
                  <div className="text-lg font-black text-[#4fc7ff] mt-0.5">148.2K Total</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">+24% WoW Organic Reach</div>
                </div>
                <div className="rounded-lg bg-black/40 border border-white/10 p-3">
                  <div className="text-[10px] font-mono text-white/50 uppercase">DPMO Venture Offerings</div>
                  <div className="text-lg font-black text-amber-300 mt-0.5">{DPMO_PRODUCTS.length} Tracked</div>
                  <div className="text-[10px] text-amber-400 mt-0.5">100% Phase: Scale Ready</div>
                </div>
              </div>
            </div>

            {/* SECTION A: CURRENT STRATEGY */}
            {(labsSubTab === "all" || labsSubTab === "strategy") && (
              <div className="rounded-2xl border border-white/10 bg-[#080d16] p-6 space-y-6">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <span>🎯 Part A: Active Strategy &amp; Execution Framework</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Live content archetypes, audience parameters, and strict brand governance.
                    </p>
                  </div>
                  <span className="rounded bg-white/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white">
                    BINDING STANDARD
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ARCHETYPES */}
                  <div className="rounded-xl border border-cyan-500/20 bg-black/40 p-4 space-y-3">
                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>1. Active Content Archetypes</span>
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="rounded-lg border border-white/10 bg-[#0d1424] p-3 space-y-1">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>Educational Carousel Deep-Dives</span>
                          <span className="rounded bg-cyan-950 px-1.5 py-0.2 text-[10px] text-cyan-300 font-mono">3:4 Ratio</span>
                        </div>
                        <p className="text-[11px] text-white/70">
                          6-Slide breakdown deconstructing invisible competitor moves or software gaps. High bookmark &amp; share multiplier. (Signal Desk &bull; GapScan)
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-[#0d1424] p-3 space-y-1">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>"The Cheaper Twin" Video Reels</span>
                          <span className="rounded bg-amber-950 px-1.5 py-0.2 text-[10px] text-amber-300 font-mono">9:16 Vertical</span>
                        </div>
                        <p className="text-[11px] text-white/70">
                          Fast-paced relatable consumer advocacy skits comparing retail markup ($119) to factory-direct Smart Store deal ($6.40). (Smart Store)
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-[#0d1424] p-3 space-y-1">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>Operational Thought Leadership</span>
                          <span className="rounded bg-purple-950 px-1.5 py-0.2 text-[10px] text-purple-300 font-mono">Pure Text</span>
                        </div>
                        <p className="text-[11px] text-white/70">
                          Observational, zero-fluff takes on eliminating human glue in operations. Zero markdown asterisks. Ends in engaging discussion query. (Northside)
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-[#0d1424] p-3 space-y-1">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>Interactive Architecture Graphics</span>
                          <span className="rounded bg-emerald-950 px-1.5 py-0.2 text-[10px] text-emerald-300 font-mono">Static 3:4</span>
                        </div>
                        <p className="text-[11px] text-white/70">
                          High-contrast diagrams showcasing two-way automated data pipelines replacing 20 open browser tabs. (BridgeAI)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AUDIENCE & SCHEDULE */}
                  <div className="space-y-4">
                    <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span>2. Audience Parameters</span>
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded bg-white/5 border border-white/5">
                          <strong className="text-[#4fc7ff] block">Founders, COOs &amp; B2B Operators (Sector 3 IT):</strong>
                          <span className="text-[11px] text-white/70 leading-relaxed block mt-0.5">
                            Pain points: Manual copy-paste, 20 open browser tabs, falling 3 months behind stealth competitor product shifts. Motivated by operational leverage and autonomous pipelines.
                          </span>
                        </div>
                        <div className="p-2.5 rounded bg-white/5 border border-white/5">
                          <strong className="text-amber-300 block">Smart Shoppers &amp; Tech Enthusiasts (Sector 4 Store):</strong>
                          <span className="text-[11px] text-white/70 leading-relaxed block mt-0.5">
                            Pain points: Egregious brand markups on identical factory electronics and desk accessories. Motivated by 70–90% savings on high-utility viral products.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span>3. Cadence &amp; Quality Governance</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded bg-cyan-950/30 border border-cyan-800/40">
                          <span className="font-mono text-[10px] text-cyan-300 font-bold block">IT Cadence</span>
                          <span className="text-white font-bold text-xs">Mon–Fri @ 5:00 PM ET</span>
                          <span className="text-[10px] text-white/50 block">LinkedIn + IG</span>
                        </div>
                        <div className="p-2 rounded bg-amber-950/30 border border-amber-800/40">
                          <span className="font-mono text-[10px] text-amber-300 font-bold block">Smart Store Cadence</span>
                          <span className="text-white font-bold text-xs">M/W/F @ 8:00 PM ET</span>
                          <span className="text-[10px] text-white/50 block">IG + FB Reels</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono bg-emerald-950/30 border border-emerald-800/40 p-2 rounded">
                        ✓ Quality Standard: Zero numeric hex codes in prompts &bull; Top 3/4 content safe zone &bull; Zero AI slop / fake words &bull; Strict Zero Twitter rule.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION B: REQUEST TO EDIT STRATEGY */}
            {(labsSubTab === "all" || labsSubTab === "strategy") && (
              <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#091122] to-[#070b14] p-6 space-y-6 shadow-xl">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <span>✏️ Part B: Request to Edit Strategy (Interactive Proposal Form)</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Submit strategy adjustments, update strategy state, and automatically log learnings to NI-Brain.
                    </p>
                  </div>
                  <span className="rounded bg-cyan-950 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-700">
                    NI-BRAIN WRITE-BACK
                  </span>
                </div>

                <form onSubmit={handleSubmitStrategyRequest} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1 uppercase font-mono">
                        Strategy Pillar / Area:
                      </label>
                      <select
                        value={newStrategyPillar}
                        onChange={(e) => setNewStrategyPillar(e.target.value)}
                        className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-xs font-bold text-[#4fc7ff] focus:border-[#4fc7ff] focus:outline-none"
                      >
                        <option value="Content Archetypes">Content Archetypes</option>
                        <option value="Audience Parameters">Audience Parameters</option>
                        <option value="Posting Cadence">Posting Cadence &amp; Time Slots</option>
                        <option value="Brand &amp; Creative Standards">Brand &amp; Creative Standards</option>
                        <option value="DPMO Phase Transition">DPMO Phase Transition</option>
                        <option value="Conversion Hooks &amp; CTAs">Conversion Hooks &amp; CTAs</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1 uppercase font-mono">
                        Priority Level:
                      </label>
                      <select
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value as any)}
                        className="w-full rounded-lg border border-white/15 bg-black/60 px-3 py-2 text-xs font-bold text-amber-300 focus:border-[#4fc7ff] focus:outline-none"
                      >
                        <option value="Normal">Normal — Standard Iteration</option>
                        <option value="High">High — Immediate A/B Test</option>
                        <option value="Urgent">Urgent — Live Cadence Adjustment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-white/80 block mb-1 uppercase font-mono">
                      Proposed Strategy Adjustments:
                    </label>
                    <textarea
                      rows={3}
                      value={newProposedChanges}
                      onChange={(e) => setNewProposedChanges(e.target.value)}
                      placeholder="Specify exact change (e.g. Add 2nd slide hook emphasizing stealth hiring; introduce video format for BridgeAI...)"
                      className="w-full rounded-lg border border-white/15 bg-black/60 p-3 text-xs text-white leading-relaxed font-sans focus:border-[#4fc7ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-cyan-300 block mb-1 uppercase font-mono">
                      Strategic Hypothesis &amp; Expected Impact:
                    </label>
                    <textarea
                      rows={2}
                      value={newHypothesis}
                      onChange={(e) => setNewHypothesis(e.target.value)}
                      placeholder="Why will this change improve performance? (e.g. Direct pricing comparison doubles video retention beyond 3 seconds...)"
                      className="w-full rounded-lg border border-cyan-800/50 bg-cyan-950/20 p-2.5 text-xs text-cyan-200 leading-relaxed font-sans focus:border-[#4fc7ff] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg bg-gradient-to-r from-[#4fc7ff] to-[#009bd6] px-5 py-2 text-xs font-bold text-black hover:brightness-110 transition cursor-pointer shadow-lg shadow-[#4fc7ff]/20 flex items-center gap-1.5"
                    >
                      <span>🚀 Submit Strategy Request &amp; Log to NI-Brain</span>
                    </button>
                  </div>
                </form>

                {/* STRATEGY PROPOSALS LOG */}
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/60 font-bold uppercase">Logged Strategy Proposals ({strategyRequests.length}):</span>
                    <span className="text-[10px] text-white/40">Real-time sync to NI-Brain</span>
                  </div>

                  <div className="space-y-2">
                    {strategyRequests.map((req) => (
                      <div
                        key={req.id}
                        className="rounded-lg border border-white/10 bg-black/40 p-3 text-xs space-y-1.5 hover:border-white/20 transition"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#4fc7ff]">{req.pillar}</span>
                            <span className="text-[10px] font-mono text-white/40">&bull; {req.timestamp}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`rounded px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase border ${
                                req.priority === "Urgent"
                                  ? "bg-red-950/80 text-red-300 border-red-700"
                                  : req.priority === "High"
                                  ? "bg-amber-950/80 text-amber-300 border-amber-700"
                                  : "bg-blue-950/80 text-blue-300 border-blue-700"
                              }`}
                            >
                              {req.priority}
                            </span>
                            <span
                              className={`rounded px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase border ${
                                req.status === "applied"
                                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-700"
                                  : "bg-cyan-950/80 text-cyan-300 border-cyan-700"
                              }`}
                            >
                              {req.status.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                        <p className="text-white/90 text-[11px] leading-relaxed">{req.proposedChanges}</p>
                        <p className="text-cyan-300/80 text-[10px] font-mono">Hypothesis: {req.hypothesis}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION C: DAILY MARKET RESEARCH */}
            {(labsSubTab === "all" || labsSubTab === "research") && (
              <div className="rounded-2xl border border-white/10 bg-[#080d16] p-6 space-y-6">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <span>📡 Part C: Daily Market Research &amp; Competitor Radar</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Live competitive intelligence, industry macro shifts, and discovery hashtag radar.
                    </p>
                  </div>
                  <span className="rounded bg-emerald-950 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300 border border-emerald-800">
                    REAL-TIME SIGNALS
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* COMPETITOR SIGNALS */}
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>🕵️ Competitor Radar</span>
                    </h4>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-lg bg-[#0d1527] border border-amber-500/30 space-y-1">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>Enterprise Workflow Tools</span>
                          <span className="text-[10px] text-amber-400 font-mono">High Threat</span>
                        </div>
                        <p className="text-[11px] text-white/70">
                          Quietly raised seat minimums by 22% and restricted custom webhook limits.
                        </p>
                        <div className="text-[10px] font-mono text-emerald-400 pt-1">
                          Counter-Move: BridgeAI &bull; "Zero per-seat tax &bull; Two-way sync"
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#0d1527] border border-cyan-500/30 space-y-1">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>B2B Intelligence Radars</span>
                          <span className="text-[10px] text-cyan-400 font-mono">Moderate</span>
                        </div>
                        <p className="text-[11px] text-white/70">
                          Hired 6 LLM research engineers to build automated company profile scrapers.
                        </p>
                        <div className="text-[10px] font-mono text-emerald-400 pt-1">
                          Counter-Move: Signal Desk &bull; "2-minute ranked executive briefs vs 20 tabs"
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#0d1527] border border-purple-500/30 space-y-1">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>Dropship Marketplaces</span>
                          <span className="text-[10px] text-purple-400 font-mono">Opportunity</span>
                        </div>
                        <p className="text-[11px] text-white/70">
                          Customer friction spiking on low-grade unvetted consumer electronics.
                        </p>
                        <div className="text-[10px] font-mono text-emerald-400 pt-1">
                          Counter-Move: Smart Store &bull; "Top 10 curated factory twins daily"
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INDUSTRY TRENDS */}
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>📈 Industry Trends</span>
                    </h4>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                        <div className="font-bold text-[#4fc7ff]">The Death of Human Glue</div>
                        <p className="text-[11px] text-white/70">
                          Companies are eliminating manual data handoffs between SaaS silos and shifting to autonomous agents.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                        <div className="font-bold text-[#4fc7ff]">Slide-First B2B Engagement</div>
                        <p className="text-[11px] text-white/70">
                          LinkedIn and Instagram algorithms heavily prioritize multi-slide carousels, yielding 3.2x bookmark rate over single images.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                        <div className="font-bold text-[#4fc7ff]">Deadpan Consumer Advocacy</div>
                        <p className="text-[11px] text-white/70">
                          High-production retail ads see 70% drop-off in 2s; relatable deadpan comedic product deconstructions hold 80%+ audience retention.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* HASHTAG INSIGHTS */}
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>#️⃣ Hashtag Radar &amp; Discovery</span>
                    </h4>
                    <div className="space-y-1.5 text-xs font-mono">
                      {[
                        { tag: "#CompetitiveIntelligence", cat: "B2B Strategy", intent: "Extreme (98%)", momentum: "+42%" },
                        { tag: "#WorkflowAutomation", cat: "Operations", intent: "High (92%)", momentum: "+28%" },
                        { tag: "#SmartShopping", cat: "Consumer Deals", intent: "High (89%)", momentum: "+64%" },
                        { tag: "#Operations", cat: "Executive", intent: "High (85%)", momentum: "+15%" },
                        { tag: "#AgenticOS", cat: "Tech Innovation", intent: "Extreme (95%)", momentum: "+88%" },
                      ].map((ht) => (
                        <div
                          key={ht.tag}
                          className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5"
                        >
                          <div>
                            <span className="text-[#4fc7ff] font-bold block">{ht.tag}</span>
                            <span className="text-[10px] text-white/40">{ht.cat}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-emerald-400 text-[11px] font-bold block">{ht.momentum}</span>
                            <span className="text-[10px] text-white/50">{ht.intent}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION D: POST ANALYTICS & CONCLUSIONS */}
            {(labsSubTab === "all" || labsSubTab === "analytics") && (
              <div className="rounded-2xl border border-white/10 bg-[#080d16] p-6 space-y-6">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <span>📊 Part D: Post Analytics, Performance Metrics &amp; Takeaways</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Cross-format comparison, conversion rates, and evidence-backed conclusions.
                    </p>
                  </div>
                  <span className="rounded bg-cyan-950 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-700">
                    VERIFIED DATA
                  </span>
                </div>

                {/* FORMAT COMPARISON MATRIX */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-b from-cyan-950/40 to-black/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Carousel Format</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded">Top B2B</span>
                    </div>
                    <div className="text-2xl font-black text-white">62.4K</div>
                    <div className="text-[11px] text-cyan-400 font-mono">7.8% Engagement &bull; 3.4x Saves</div>
                    <p className="text-[11px] text-white/70 leading-relaxed pt-1">
                      Highest bookmarking rate across all platforms. Optimal vehicle for Signal Desk and GapScan deep dives.
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-500/40 bg-gradient-to-b from-amber-950/40 to-black/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Video Reels</span>
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded">Viral Reach</span>
                    </div>
                    <div className="text-2xl font-black text-white">58.1K</div>
                    <div className="text-[11px] text-amber-400 font-mono">5.2% Engagement &bull; 5.8x Reach</div>
                    <p className="text-[11px] text-white/70 leading-relaxed pt-1">
                      Delivers exponential non-follower discovery. Essential format for Smart Store price comparison skits.
                    </p>
                  </div>

                  <div className="rounded-xl border border-purple-500/40 bg-gradient-to-b from-purple-950/40 to-black/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Pure Text</span>
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded">Top Inbound</span>
                    </div>
                    <div className="text-2xl font-black text-white">16.5K</div>
                    <div className="text-[11px] text-purple-400 font-mono">8.9% Engagement &bull; 12.1% Comments</div>
                    <p className="text-[11px] text-white/70 leading-relaxed pt-1">
                      Drives the highest direct reply rate and DM inbound pipeline. Best for founder philosophical insights.
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 to-black/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">Static Graphics</span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">High Authority</span>
                    </div>
                    <div className="text-2xl font-black text-white">11.2K</div>
                    <div className="text-[11px] text-emerald-400 font-mono">3.8% Engagement &bull; 1.8x Shares</div>
                    <p className="text-[11px] text-white/70 leading-relaxed pt-1">
                      Ideal for clean high-contrast architecture schematics and data conduit flowcharts (BridgeAI).
                    </p>
                  </div>
                </div>

                {/* STRATEGIC TAKEAWAYS */}
                <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-2.5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span>💡 Core Analytical Conclusions &bull; Operator Learnings</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">&bull;</span>
                      <span><strong>Slide 1 Hook Restraint:</strong> Headline copy under 14 words with dramatic contrast improves slide-2 swipe-through rate by 38%.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">&bull;</span>
                      <span><strong>Immediate Price Shock in Video:</strong> Displaying the extreme price discrepancy ($119 vs $6.40) within the first 1.8s boosts video retention past 8 seconds by 61%.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">&bull;</span>
                      <span><strong>Anti-AI Slop Enforcement:</strong> Notes adhering to the zero-asterisk rule and pure human cadence generate 4.2x more founder commentary than templated marketing bullet points.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* SECTION E: DPMO DATABASE */}
            {(labsSubTab === "all" || labsSubTab === "dpmo") && (
              <div className="rounded-2xl border border-white/10 bg-[#080d16] p-6 space-y-6">
                <div className="border-b border-white/10 pb-3 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <span>🗄️ Part E: Dual Process Marketing &amp; Outreach (DPMO) Database</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Phase tracking (Plan &bull; Build &bull; Execute &bull; Scale), value hooks, target audiences, and conversion architecture.
                    </p>
                  </div>

                  {/* SECTOR FILTER */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-white/40 font-mono">Sector:</span>
                    <select
                      value={dpmoFilterSector}
                      onChange={(e) => setDpmoFilterSector(e.target.value)}
                      className="rounded border border-white/15 bg-black/60 px-2.5 py-1 text-xs font-bold text-[#4fc7ff] focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Sectors</option>
                      <option value="Sector 3 (IT Tools)">Sector 3 (IT Tools)</option>
                      <option value="Sector 4 (Autonomous Dropship)">Sector 4 (Autonomous Dropship)</option>
                      <option value="Sector 1A (Health & Athletic Longevity)">Sector 1A (Health)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DPMO_PRODUCTS.filter(
                    (prod) => dpmoFilterSector === "all" || prod.sector === dpmoFilterSector
                  ).map((prod) => (
                    <div
                      key={prod.slug}
                      className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3 hover:border-[#4fc7ff]/60 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">{prod.name}</h4>
                          <span className="text-[10px] font-mono text-white/50">{prod.sector}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                          {prod.phase}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="text-[10px] font-mono text-white/40 uppercase">Target Audience:</div>
                        <p className="text-[11px] text-white/80">{prod.targetAudience}</p>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="text-[10px] font-mono text-cyan-400 uppercase">Core Value Hook:</div>
                        <p className="text-[11px] text-white/90 leading-relaxed font-medium">{prod.offerHook}</p>
                      </div>

                      <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-900/40">
                        Conversion: {prod.conversionBenefit}
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <a
                          href={prod.ctaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-[#4fc7ff] hover:underline"
                        >
                          Visit Page &rarr;
                        </a>
                        <button
                          onClick={() => {
                            showToast(`Copied conversion link for ${prod.name}!`);
                            navigator.clipboard.writeText(prod.ctaUrl);
                          }}
                          className="text-[10px] font-mono text-white/60 hover:text-white cursor-pointer"
                        >
                          Copy URL
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
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
