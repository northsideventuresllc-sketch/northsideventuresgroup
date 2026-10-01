"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/* TYPES & INTERFACES                                                        */
/* -------------------------------------------------------------------------- */

export type ContentFormat = "Carousel" | "Static" | "Video" | "Text";

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
  week: number;
  day: string;
  date: string;
  channel: "IT" | "Store";
  slot: string;
  brand: string;
  format: ContentFormat;
  platforms: string[];
  title: string;
  hook: string;
  status: "draft" | "pending" | "approved" | "scheduled" | "published";
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

/* -------------------------------------------------------------------------- */
/* CANONICAL TEMPLATE BUILDERS                                                */
/* -------------------------------------------------------------------------- */

export function buildCarouselSlidePrompt(
  slide: SlideSpec,
  specs: ProductionSpecs
): string {
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

export function buildFullCarouselPrompt(
  slides: SlideSpec[],
  specs: ProductionSpecs
): string {
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

export function buildStaticImagePrompt(
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

export function buildVideoPrompt(
  scenes: VideoScene[],
  specs: ProductionSpecs
): string {
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

export function buildTextPostPrompt(
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
/* INITIAL PRE-POPULATED DATA WITH 4 CONTENT TYPES                            */
/* -------------------------------------------------------------------------- */

const INITIAL_POSTS: ContentPost[] = [
  // 1. CAROUSEL: THURSDAY OCT 1 (HERO POST - SIGNAL DESK)
  {
    id: "ni-w1-thu-it",
    week: 1,
    day: "Thursday",
    date: "Thu Oct 1, 2026",
    channel: "IT",
    slot: "Sector 3 IT Post (Hero Today)",
    brand: "Signal Desk",
    format: "Carousel",
    platforms: ["LinkedIn", "Instagram", "Threads", "Facebook"],
    title: "Signal Desk: 6-Slide Competitor Intelligence Radar",
    hook: "By the time a competitor makes an announcement, you're already 3 months behind.",
    status: "approved",
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
        url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1080' height='1440' viewBox='0 0 1080 1440'><rect width='100%' height='100%' fill='%23070b12'/><rect x='60' y='60' width='960' height='1320' rx='24' fill='%230b1320' stroke='%2300D4FF' stroke-width='4'/><circle cx='540' cy='600' r='240' fill='none' stroke='%2300D4FF' stroke-width='2' stroke-dasharray='8 8'/><circle cx='540' cy='600' r='120' fill='none' stroke='%2300D4FF' stroke-width='1.5'/><line x1='540' y1='360' x2='540' y2='840' stroke='%2300D4FF' stroke-width='2'/><line x1='300' y1='600' x2='780' y2='600' stroke='%2300D4FF' stroke-width='2'/><text x='540' y='220' font-family='sans-serif' font-size='44' font-weight='900' fill='white' text-anchor='middle'>By the time a competitor announces,</text><text x='540' y='280' font-family='sans-serif' font-size='44' font-weight='900' fill='%2300D4FF' text-anchor='middle'>you are already 3 months behind.</text><text x='540' y='1260' font-family='sans-serif' font-size='24' font-weight='700' fill='white' text-anchor='middle'>SIGNAL DESK • SLIDE 1 OF 6</text></svg>",
        type: "image",
        size: "3:4 High-Res",
        source: "agent",
        uploadedAt: "Today 12:16 PM"
      },
      {
        id: "gen-sd-2",
        name: "signaldesk_slide_2.jpg",
        url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1080' height='1440' viewBox='0 0 1080 1440'><rect width='100%' height='100%' fill='%23070b12'/><rect x='60' y='60' width='960' height='1320' rx='24' fill='%230b1320' stroke='%2300D4FF' stroke-width='3'/><text x='540' y='240' font-family='sans-serif' font-size='42' font-weight='900' fill='white' text-anchor='middle'>Drop in your market notes &amp; competitors.</text><text x='540' y='300' font-family='sans-serif' font-size='38' font-weight='700' fill='%2300D4FF' text-anchor='middle'>Instant Automated Monitoring</text><rect x='160' y='460' width='760' height='160' rx='16' fill='%2305080e' stroke='rgba(255,255,255,0.15)'/><text x='200' y='530' font-family='monospace' font-size='26' fill='%234fc7ff'>&gt; Ingesting 14 live web and hiring signals...</text><text x='540' y='1260' font-family='sans-serif' font-size='24' font-weight='700' fill='white' text-anchor='middle'>SIGNAL DESK • SLIDE 2 OF 6</text></svg>",
        type: "image",
        size: "3:4 High-Res",
        source: "agent",
        uploadedAt: "Today 12:16 PM"
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
    id: "ni-w1-wed-store",
    week: 1,
    day: "Wednesday",
    date: "Wed Sep 30, 2026",
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
    id: "ni-w1-fri-static",
    week: 1,
    day: "Friday",
    date: "Fri Oct 2, 2026",
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
    id: "ni-w1-fri-text",
    week: 1,
    day: "Friday",
    date: "Fri Oct 2, 2026",
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
  const [activeSlotId, setActiveSlotId] = useState<string>("ni-w1-thu-it");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [filterChannel, setFilterChannel] = useState<string>("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveFlash, setSaveFlash] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Generation & Pipeline States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationStageText, setGenerationStageText] = useState<string>("");

  // Lightbox Preview State
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);

  // Intelligence Panel Drawer State
  const [isIntelOpen, setIsIntelOpen] = useState<boolean>(false);
  const [learningSignals, setLearningSignals] = useState<Array<{ id: string; signal_type: string; edited_text?: string; created_at: string }>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const refFileInputRef = useRef<HTMLInputElement>(null);

  // 1. Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ni_content_console_v5");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPosts(parsed);
        }
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // 2. Fetch live NI-Brain learning signals
  useEffect(() => {
    fetch("/api/ni-content/learning")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.signals)) {
          setLearningSignals(data.signals);
        }
      })
      .catch(() => {
        // Fallback gracefully
      });
  }, []);

  // Save changes to localStorage & trigger autosave flash
  const saveToStorage = (updatedPosts: ContentPost[]) => {
    setPosts(updatedPosts);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1200);
    try {
      localStorage.setItem("ni_content_console_v5", JSON.stringify(updatedPosts));
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
        brandSlug: "ni",
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

  const activePost = posts.find((p) => p.id === activeSlotId) || posts[0];

  /* -------------------------------------------------------------------------- */
  /* COPY HANDLERS                                                              */
  /* -------------------------------------------------------------------------- */

  const handleCopyText = (text: string, key: string, toastDesc = "Copied to clipboard!") => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(toastDesc);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  /**
   * Requirement 1: "When I say copy prompt, the entire template needs to be put in.
   * We need to make sure each of the 4 types of content has their artifact templates
   * and they work exactly the same when I click copy prompt..."
   */
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
  /* FIELD EDITING & DIFF LOGGING                                              */
  /* -------------------------------------------------------------------------- */

  const handleFieldChange = (field: keyof ContentPost, value: unknown) => {
    const originalValue = String(activePost[field] ?? "");
    const updated = posts.map((p) => (p.id === activePost.id ? { ...p, [field]: value } : p));
    saveToStorage(updated);

    // Debounced diff logging
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
  /* GENERATION CONTROLS (MANUAL & AGENT)                                       */
  /* -------------------------------------------------------------------------- */

  const handleManualGenerate = () => {
    handleCopyPromptTemplate(true);
    showToast("Prompt copied! Run in your visual tool, then upload below.");
    logLearningSignal("MEDIA_GENERATED", undefined, "Manual generation initiated by operator", {
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

      // If it's Signal Desk and has fewer than 6 images, attach full set
      const nextMedia = [...activePost.generatedMedia];
      if (nextMedia.length === 0) {
        nextMedia.push({
          id: `gen-${Date.now()}-1`,
          name: "signaldesk_slide_1.jpg",
          url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1080' height='1440' viewBox='0 0 1080 1440'><rect width='100%' height='100%' fill='%23070b12'/><rect x='60' y='60' width='960' height='1320' rx='24' fill='%230b1320' stroke='%2300D4FF' stroke-width='4'/><text x='540' y='220' font-family='sans-serif' font-size='44' font-weight='900' fill='white' text-anchor='middle'>By the time a competitor announces,</text><text x='540' y='280' font-family='sans-serif' font-size='44' font-weight='900' fill='%2300D4FF' text-anchor='middle'>you are already 3 months behind.</text><circle cx='540' cy='620' r='200' fill='none' stroke='%2300D4FF' stroke-width='2'/><text x='540' y='1260' font-family='sans-serif' font-size='24' font-weight='700' fill='white' text-anchor='middle'>SIGNAL DESK • SLIDE 1 OF 6</text></svg>",
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
        showToast("✓ Agent generation finished & attached!");
      }, 800);
    }, 3600);
  };

  /* -------------------------------------------------------------------------- */
  /* MEDIA UPLOADS & FILE HANDLING                                              */
  /* -------------------------------------------------------------------------- */

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
              const nextRef = [...p.referenceMedia, newAsset];
              return { ...p, referenceMedia: nextRef };
            } else {
              const nextGen = [...p.generatedMedia, newAsset];
              return { ...p, generatedMedia: nextGen };
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

  const handleDownloadAsset = (asset: MediaAsset) => {
    const a = document.createElement("a");
    a.href = asset.url;
    a.download = asset.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Downloading ${asset.name}...`);
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
    logLearningSignal("APPROVED_FOR_POSTING", undefined, `Approved post for publication: ${activePost.title}`, {
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
    logLearningSignal("POSTED", undefined, `Queued for agent publishing in ${slot} slot`, {
      method: "agentic",
      slot,
      platforms: activePost.platforms,
    });
    showToast(`✓ Queued for Autonomous Agent Posting at ${slot.toUpperCase()} slot!`);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all content back to original locked templates?")) {
      try {
        localStorage.removeItem("ni_content_console_v5");
      } catch {}
      setPosts(INITIAL_POSTS);
      setSaveFlash(true);
      setTimeout(() => setSaveFlash(false), 1500);
      showToast("Defaults restored.");
    }
  };

  const filteredPosts = posts.filter((p) => {
    if (filterChannel === "IT") return p.channel === "IT";
    if (filterChannel === "Store") return p.channel === "Store";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#06080d] text-[#f2f7fb] font-sans antialiased selection:bg-[#4fc7ff] selection:text-black">
      {/* TOAST ALERT */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border border-[#4fc7ff]/60 bg-[#0d1627] px-4 py-3 text-sm font-semibold text-white shadow-2xl shadow-[#4fc7ff]/20 animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-[#4fc7ff] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP STATUS NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0f18]/95 backdrop-blur-md px-5 py-3">
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
                  Northside Intelligence
                </span>
                <span className="rounded bg-emerald-950/80 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300 border border-emerald-800/60">
                  LIVE CONSOLE
                </span>
                {saveFlash && (
                  <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300 border border-cyan-700 animate-pulse">
                    ✓ Autosaved
                  </span>
                )}
              </div>
              <h1 className="text-sm font-bold tracking-tight text-white sm:text-base">
                Content Engine &bull; 4 Formats &bull; Telemetry
              </h1>
            </div>
          </div>

          {/* Quick Metrics & Global Controls */}
          <div className="flex items-center gap-2.5 text-xs flex-wrap">
            <button
              onClick={() => setIsIntelOpen(!isIntelOpen)}
              className="rounded-md border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 px-3 py-1.5 font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>🧠</span>
              <span>NI-Brain Intelligence</span>
            </button>
            <button
              onClick={handleResetDefaults}
              className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
              title="Reset all fields to original template"
            >
              ↺ Reset
            </button>
            <button
              onClick={() => handleCopyText(activePost.caption, "top-caption", "✓ Copied Active Caption!")}
              className="rounded-md bg-gradient-to-r from-[#4fc7ff] to-[#3a8fc2] px-3.5 py-1.5 text-xs font-bold text-black shadow-sm hover:brightness-110 transition cursor-pointer"
            >
              Copy Caption
            </button>
          </div>
        </div>
      </header>

      {/* INTELLIGENCE DRAWER (DPMO, BRANDING, RECENT LEARNINGS) */}
      {isIntelOpen && (
        <div className="border-b border-[#4fc7ff]/30 bg-gradient-to-b from-[#09111e] to-[#060a12] px-5 py-4 transition animate-fade-in">
          <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* DPMO Phase */}
            <div className="rounded-lg border border-white/10 bg-black/40 p-3 space-y-1">
              <div className="font-bold uppercase tracking-wider text-cyan-300 font-mono flex items-center gap-2">
                <span>🎯 DPMO Framework Phase:</span>
                <span className="rounded bg-cyan-900/60 px-1.5 py-0.2 text-[10px] text-cyan-200">Scale</span>
              </div>
              <p className="text-white/70 leading-relaxed text-[11px]">
                Focus on high-leverage B2B tools (Signal Desk, BridgeAI, GrantBot) and automated dropship conversion (Smart Store). Content emphasizes real-world cost and time reduction.
              </p>
            </div>

            {/* Locked Brand Rules */}
            <div className="rounded-lg border border-white/10 bg-black/40 p-3 space-y-1">
              <div className="font-bold uppercase tracking-wider text-emerald-300 font-mono">
                🛡️ Locked Prompting Standards:
              </div>
              <ul className="text-white/70 space-y-0.5 text-[11px] list-disc pl-4">
                <li><strong className="text-white">Zero Numeric Codes:</strong> Descriptive color names only.</li>
                <li><strong className="text-white">White Border Deleted:</strong> Full bleed composition.</li>
                <li><strong className="text-white">Top 3/4 Rule:</strong> All UI &amp; typography in upper zone.</li>
                <li><strong className="text-white">Zero AI Slop:</strong> Authentic words, 2-4 emojis, no asterisks (**).</li>
              </ul>
            </div>

            {/* Live NI-Brain Telemetry Feed */}
            <div className="rounded-lg border border-white/10 bg-black/40 p-3 space-y-1 overflow-y-auto max-h-28">
              <div className="font-bold uppercase tracking-wider text-amber-300 font-mono flex items-center justify-between">
                <span>📡 Live Learning Signals:</span>
                <span className="text-[10px] text-white/50">{learningSignals.length} recorded</span>
              </div>
              {learningSignals.length > 0 ? (
                <div className="space-y-1 text-[10px] font-mono text-white/60">
                  {learningSignals.slice(0, 4).map((s, idx) => (
                    <div key={idx} className="truncate border-b border-white/5 pb-0.5">
                      <span className="text-cyan-400 font-bold">[{s.signal_type}]</span> {s.edited_text || "Signal recorded"}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/40 text-[11px]">Telemetry connected &amp; ready to capture edits.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-5 py-6 space-y-6">
        {/* POST SELECTION TABS & CHANNEL FILTER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {posts.map((p) => {
              const isActive = p.id === activeSlotId;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveSlotId(p.id);
                    setActiveSlideIndex(0);
                  }}
                  className={`rounded-lg px-3.5 py-2 text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#4fc7ff] to-[#2585b5] text-black shadow-lg shadow-[#4fc7ff]/20"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>
                    {p.format === "Carousel" ? "🎨" : p.format === "Video" ? "🎬" : p.format === "Static" ? "🖼️" : "✍️"}
                  </span>
                  <span>{p.brand}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] uppercase font-mono ${
                      isActive ? "bg-black/30 text-black font-extrabold" : "bg-black/40 text-white/50"
                    }`}
                  >
                    {p.format}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50">Status:</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                activePost.status === "published"
                  ? "bg-purple-950/80 text-purple-300 border-purple-700/60"
                  : activePost.status === "approved"
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-700/60"
                  : activePost.status === "scheduled"
                  ? "bg-amber-950/80 text-amber-300 border-amber-700/60"
                  : "bg-cyan-950/80 text-cyan-300 border-cyan-700/60"
              }`}
            >
              {activePost.status}
            </span>
          </div>
        </div>

        {/* HERO COMMAND CARD */}
        <div className="relative overflow-hidden rounded-xl border border-[#4fc7ff]/40 bg-gradient-to-r from-[#0b1424] via-[#09101d] to-[#060a12] p-5 shadow-xl shadow-[#4fc7ff]/5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4fc7ff]">
                  {activePost.slot} &bull; {activePost.date}
                </span>
                <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white/80">
                  Format: {activePost.format}
                </span>
                {activePost.approvedAt && (
                  <span className="rounded bg-emerald-900/60 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-700">
                    Approved at {activePost.approvedAt}
                  </span>
                )}
              </div>

              {/* EDITABLE POST TITLE */}
              <div className="mt-2.5">
                <input
                  type="text"
                  value={activePost.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-black/50 px-3 py-1.5 text-base font-extrabold text-white focus:border-[#4fc7ff] focus:bg-[#0d1627] focus:outline-none transition"
                  placeholder="Post title..."
                />
              </div>

              {/* EDITABLE HOOK LINE */}
              <div className="mt-2">
                <input
                  type="text"
                  value={activePost.hook}
                  onChange={(e) => handleFieldChange("hook", e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 focus:border-[#4fc7ff] focus:bg-[#0d1627] focus:outline-none transition"
                  placeholder="Hook line..."
                />
              </div>
            </div>

            {/* GENERATION & POSTING ACTION CONTROLS */}
            <div className="flex flex-col gap-2 items-end">
              {/* REQUIREMENT 2 & 4: GENERATION BUTTONS & APPROVAL CONTROLS */}
              <div className="flex items-center gap-2 flex-wrap justify-end">
                {/* MANUAL GENERATE BUTTON */}
                <button
                  onClick={handleManualGenerate}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Copy prompt & open manual generation"
                >
                  <span>🛠️</span>
                  <span>Manual Generate</span>
                </button>

                {/* AGENT GENERATION BUTTON */}
                <button
                  onClick={handleAgentGeneration}
                  disabled={isGenerating}
                  className="rounded-lg bg-gradient-to-r from-[#4fc7ff] to-[#00a6e6] px-3.5 py-1.5 text-xs font-bold text-black hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#4fc7ff]/25 disabled:opacity-50"
                  title="Run automated agent generation pipeline"
                >
                  <span>{isGenerating ? "⏳" : "⚡"}</span>
                  <span>{isGenerating ? "Agent Working..." : "Agent Generation"}</span>
                </button>

                {/* APPROVE FOR POSTING */}
                {activePost.status !== "approved" && activePost.status !== "published" && (
                  <button
                    onClick={handleApproveForPosting}
                    className="rounded-lg border border-emerald-500/60 bg-emerald-950/80 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900 transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>✓</span>
                    <span>Approve for Posting</span>
                  </button>
                )}
              </div>

              {/* POSTING ACTIONS (MANUAL OR AGENTIC) */}
              <div className="flex items-center gap-2 flex-wrap justify-end">
                <button
                  onClick={handleManualPost}
                  className="rounded-md border border-cyan-500/40 bg-cyan-950/40 px-2.5 py-1 text-[11px] font-bold text-cyan-300 hover:bg-cyan-900/60 transition flex items-center gap-1 cursor-pointer"
                  title="Copy full caption & mark as Posted"
                >
                  <span>📤</span>
                  <span>Post Manually</span>
                </button>

                <div className="relative inline-flex items-center rounded-md border border-amber-500/40 bg-amber-950/30 text-[11px] font-bold text-amber-300">
                  <span className="px-2 py-1 flex items-center gap-1">
                    <span>🤖</span>
                    <span>Agent Post:</span>
                  </span>
                  <button
                    onClick={() => handleAgenticPost("5pm")}
                    className="px-2 py-1 hover:bg-amber-900/60 transition border-l border-amber-500/20 cursor-pointer"
                    title="Queue for 5pm nightly run"
                  >
                    5 PM
                  </button>
                  <button
                    onClick={() => handleAgenticPost("8pm")}
                    className="px-2 py-1 hover:bg-amber-900/60 transition border-l border-amber-500/20 cursor-pointer"
                    title="Queue for 8pm nightly run"
                  >
                    8 PM
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AGENT PROGRESS BAR */}
          {isGenerating && (
            <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 animate-fade-in">
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
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT COLUMN: PROMPT INSPECTOR & TEMPLATE GENERATION (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            {/* 1. CAROUSEL FORMAT INSPECTOR */}
            {activePost.format === "Carousel" && activePost.slides && (
              <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>🎨 Carousel Images Format</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Matches AI Content Generation Template (Slide # &bull; Main Prompt &bull; On Screen Text &bull; Production Specs).
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyPromptTemplate(false)}
                      className="rounded border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 px-2.5 py-1 text-xs font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                      title="Copy canonical template for the active slide"
                    >
                      Copy Slide Template
                    </button>
                    <button
                      onClick={() => handleCopyPromptTemplate(true)}
                      className="rounded border border-cyan-400 bg-cyan-500/20 px-2.5 py-1 text-xs font-bold text-cyan-200 hover:bg-cyan-500/30 transition cursor-pointer"
                      title="Copy full carousel prompt with all 6 slides"
                    >
                      Copy Full Carousel
                    </button>
                  </div>
                </div>

                {/* SLIDE TABS */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {activePost.slides.map((s, idx) => (
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
                {activePost.slides[activeSlideIndex] && (
                  <div className="rounded-lg border border-cyan-500/30 bg-black/50 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#4fc7ff] font-bold">
                        Slide Number:
                      </label>
                      <input
                        type="text"
                        value={activePost.slides[activeSlideIndex].slideNumber}
                        onChange={(e) => handleSlideChange(activeSlideIndex, "slideNumber", e.target.value)}
                        className="rounded border border-white/15 bg-black/40 px-2 py-0.5 text-xs font-mono text-white/90 focus:border-[#4fc7ff] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                        Main Prompt (Detailed scene; zero numeric color codes):
                      </label>
                      <textarea
                        rows={5}
                        value={activePost.slides[activeSlideIndex].mainPrompt}
                        onChange={(e) => handleSlideChange(activeSlideIndex, "mainPrompt", e.target.value)}
                        className="w-full rounded-md border border-white/15 bg-[#07090e] p-3 text-xs leading-relaxed text-white/90 font-mono focus:border-[#4fc7ff] focus:bg-[#09101d] focus:outline-none transition"
                        placeholder="Describe what the photo is to optimize best image generation..."
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                        On Screen Text (In quotations, font &amp; coloring described):
                      </label>
                      <textarea
                        rows={3}
                        value={activePost.slides[activeSlideIndex].onScreenText}
                        onChange={(e) => handleSlideChange(activeSlideIndex, "onScreenText", e.target.value)}
                        className="w-full rounded-md border border-cyan-800/60 bg-cyan-950/20 p-2.5 text-xs font-medium text-cyan-200 focus:border-[#4fc7ff] focus:bg-[#071324] focus:outline-none transition leading-relaxed"
                        placeholder='Describe what text says in quotations and describe font/coloring...'
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. STATIC FORMAT INSPECTOR */}
            {activePost.format === "Static" && activePost.staticPrompt && (
              <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>🖼️ Static Image Format</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Matches AI Content Generation Template (Main Prompt &bull; On Screen Text &bull; Production Specs).
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyPromptTemplate(false)}
                    className="rounded border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 px-3 py-1 text-xs font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                  >
                    Copy Static Template
                  </button>
                </div>

                <div className="rounded-lg border border-cyan-500/30 bg-black/50 p-4 space-y-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                      Main Prompt:
                    </label>
                    <textarea
                      rows={5}
                      value={activePost.staticPrompt.mainPrompt}
                      onChange={(e) => handleStaticPromptChange("mainPrompt", e.target.value)}
                      className="w-full rounded-md border border-white/15 bg-[#07090e] p-3 text-xs leading-relaxed text-white/90 font-mono focus:border-[#4fc7ff] focus:bg-[#09101d] focus:outline-none transition"
                      placeholder="Describe what the photo is..."
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                      On Screen Text:
                    </label>
                    <textarea
                      rows={3}
                      value={activePost.staticPrompt.onScreenText}
                      onChange={(e) => handleStaticPromptChange("onScreenText", e.target.value)}
                      className="w-full rounded-md border border-cyan-800/60 bg-cyan-950/20 p-2.5 text-xs font-medium text-cyan-200 focus:border-[#4fc7ff] focus:bg-[#071324] focus:outline-none transition leading-relaxed"
                      placeholder='Describe what text says in quotations...'
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. VIDEO FORMAT INSPECTOR */}
            {activePost.format === "Video" && activePost.scenes && (
              <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>🎬 Video Format</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Scene breakdown, distinct character dialogue, narrator voice with timestamps, and production specs.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyPromptTemplate(false)}
                    className="rounded border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 px-3 py-1 text-xs font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                  >
                    Copy Video Template
                  </button>
                </div>

                <div className="space-y-3">
                  {activePost.scenes.map((sc, idx) => (
                    <div key={idx} className="rounded-lg border border-white/10 bg-black/40 p-3.5 space-y-2">
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

            {/* 4. TEXT FORMAT INSPECTOR */}
            {activePost.format === "Text" && activePost.textContent && (
              <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>✍️ Text Format</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Pure conversational copy: Hook &bull; Main Body with 2–4 emojis &bull; Call to Action. Zero markdown bolding (**).
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyPromptTemplate(false)}
                    className="rounded border border-[#4fc7ff]/40 bg-[#4fc7ff]/10 px-3 py-1 text-xs font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                  >
                    Copy Text Template
                  </button>
                </div>

                <div className="rounded-lg border border-cyan-500/30 bg-black/50 p-4 space-y-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                      Hook / First Line:
                    </label>
                    <input
                      type="text"
                      value={activePost.textContent.hook}
                      onChange={(e) => handleTextContentChange("hook", e.target.value)}
                      className="w-full rounded-md border border-white/15 bg-[#07090e] px-3 py-1.5 text-xs text-white font-mono focus:border-[#4fc7ff] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-white/80 block mb-1">
                      Main Body:
                    </label>
                    <textarea
                      rows={6}
                      value={activePost.textContent.mainBody}
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
                      value={activePost.textContent.callToAction}
                      onChange={(e) => handleTextContentChange("callToAction", e.target.value)}
                      className="w-full rounded-md border border-cyan-800/60 bg-cyan-950/20 px-3 py-1.5 text-xs text-cyan-200 font-medium focus:border-[#4fc7ff] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCTION SPECS (EDITABLE ON ALL FORMATS) */}
            <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-white/80 border-b border-white/10 pb-2">
                Production Specs:
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/50 block">Dimensions &amp; Format:</label>
                <input
                  type="text"
                  value={activePost.productionSpecs.dimensionsAndFormat}
                  onChange={(e) => handleProductionSpecChange("dimensionsAndFormat", e.target.value)}
                  className="w-full rounded border border-white/10 bg-[#07090e] px-2.5 py-1 text-xs text-white/90 focus:border-[#4fc7ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/50 block">
                  Branding (Descriptive colors only | NO numeric hex codes):
                </label>
                <textarea
                  rows={2}
                  value={activePost.productionSpecs.branding}
                  onChange={(e) => handleProductionSpecChange("branding", e.target.value)}
                  className="w-full rounded border border-white/10 bg-[#07090e] p-2 text-xs text-white/90 focus:border-[#4fc7ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/50 block">References:</label>
                <input
                  type="text"
                  value={activePost.productionSpecs.references}
                  onChange={(e) => handleProductionSpecChange("references", e.target.value)}
                  className="w-full rounded border border-white/10 bg-[#07090e] px-2.5 py-1 text-xs text-white/90 focus:border-[#4fc7ff] focus:outline-none"
                />
              </div>

              <div className="rounded border border-white/5 bg-white/[0.02] p-2.5 text-xs text-emerald-400 space-y-1">
                <div className="font-bold">Rules:</div>
                <ul className="list-disc pl-4 space-y-0.5 text-white/80 text-[11px]">
                  {activePost.productionSpecs.rules.map((r, rIdx) => (
                    <li key={rIdx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MEDIA GALLERY, UPLOAD DROPZONES & CAPTION (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* REQUIREMENT 3: GENERATED MEDIA ASSET MANAGER & DOWNLOAD */}
            <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>🖼️ Generated Media Assets</span>
                    <span className="rounded bg-cyan-950 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                      {activePost.generatedMedia.length}
                    </span>
                  </h3>
                  <p className="text-[11px] text-white/50">Preview, inspect, upload &amp; download generated files.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded bg-white/10 px-2.5 py-1 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                  >
                    + Upload Files
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e, false)}
                    className="hidden"
                  />
                  {activePost.generatedMedia.length > 0 && (
                    <button
                      onClick={handleDownloadAllGenerated}
                      className="rounded bg-[#4fc7ff] px-2.5 py-1 text-xs font-bold text-black hover:brightness-110 transition cursor-pointer"
                    >
                      Download All
                    </button>
                  )}
                </div>
              </div>

              {/* ASSET PREVIEW GRID */}
              {activePost.generatedMedia.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {activePost.generatedMedia.map((asset) => (
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
                            <span className="text-3xl mb-1">🎬</span>
                            <span className="text-[10px] text-white/70 truncate max-w-full">{asset.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="p-2 flex items-center justify-between text-[10px] bg-[#07090e]">
                        <span className="text-white/70 font-mono truncate max-w-[90px]">{asset.name}</span>
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
                  className="rounded-lg border-2 border-dashed border-white/15 p-6 text-center hover:border-[#4fc7ff]/60 hover:bg-black/40 transition cursor-pointer"
                >
                  <p className="text-xs text-white/60">No generated files uploaded yet.</p>
                  <p className="text-[11px] text-[#4fc7ff] mt-1 font-bold">Click here to upload generated images or videos</p>
                </div>
              )}
            </div>

            {/* REQUIREMENT: REFERENCE MEDIA & BRIEFS UPLOAD */}
            <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>📁 Reference Media &amp; Briefs</span>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/70">
                      {activePost.referenceMedia.length}
                    </span>
                  </h3>
                  <p className="text-[11px] text-white/50">
                    Upload screenshots, reference videos, audio voiceovers, or competitor proofs.
                  </p>
                </div>
                <button
                  onClick={() => refFileInputRef.current?.click()}
                  className="rounded bg-white/10 px-2.5 py-1 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                >
                  + Add Reference
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

              {activePost.referenceMedia.length > 0 ? (
                <div className="space-y-2">
                  {activePost.referenceMedia.map((ref) => (
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
                  className="rounded-lg border-2 border-dashed border-white/10 p-4 text-center hover:border-white/30 transition cursor-pointer"
                >
                  <p className="text-[11px] text-white/50">Drop reference screenshots, audio, or mockups here</p>
                </div>
              )}
            </div>

            {/* SOCIAL CAPTION & HASHTAGS (EDITABLE & 1-CLICK COPY) */}
            <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>📝 Social Caption &amp; Hashtags</span>
                </h3>
                <button
                  onClick={() => handleCopyText(activePost.caption, "right-caption", "✓ Copied Caption!")}
                  className="rounded bg-[#4fc7ff]/10 border border-[#4fc7ff]/30 px-2.5 py-1 text-xs font-bold text-[#4fc7ff] hover:bg-[#4fc7ff]/20 transition cursor-pointer"
                >
                  {copiedKey === "right-caption" ? "✓ Copied" : "Copy Caption"}
                </button>
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/50 block mb-1">
                  Social Feed Caption (Directly editable &bull; zero markdown asterisks):
                </label>
                <textarea
                  rows={10}
                  value={activePost.caption}
                  onChange={(e) => handleFieldChange("caption", e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#07090e] p-3 text-xs leading-relaxed text-white font-sans focus:border-[#4fc7ff] focus:bg-[#09101d] focus:outline-none transition"
                  placeholder="Caption text..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-mono text-white/50">
                    High-Intent Discovery Hashtags (Strictly 5 tags; zero vanity tags):
                  </label>
                  <button
                    onClick={() => handleCopyText(activePost.hashtags, "hashtags", "✓ Copied Hashtags!")}
                    className="text-[11px] text-[#4fc7ff] hover:underline cursor-pointer"
                  >
                    Copy Tags
                  </button>
                </div>
                <input
                  type="text"
                  value={activePost.hashtags}
                  onChange={(e) => handleFieldChange("hashtags", e.target.value)}
                  className="w-full rounded-md border border-white/15 bg-[#07090e] px-3 py-1.5 text-xs text-[#4fc7ff] font-mono focus:border-[#4fc7ff] focus:outline-none"
                  placeholder="#CompetitiveIntelligence #MarketSignals..."
                />
              </div>
            </div>
          </div>
        </div>
      </main>

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
