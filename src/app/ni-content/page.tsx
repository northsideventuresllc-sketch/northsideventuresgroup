"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SlideSpec {
  slideNumber: string;
  mainPrompt: string;
  onScreenText: string;
}

interface ProductionSpecs {
  dimensionsAndFormat: string;
  branding: string;
  references: string;
  rules: string[];
  narratorTone?: string;
  sfx?: string;
  backgroundMusic?: string;
}

interface VideoScene {
  sceneNum: string;
  description: string;
  dialogue: string;
  narrator: string;
  transition: string;
}

interface ContentPost {
  id: string;
  week: number;
  day: string;
  date: string;
  channel: "IT" | "Store";
  slot: string;
  brand: string;
  format: "Carousel" | "Video";
  platforms: string[];
  title: string;
  hook: string;
  status: "draft" | "pending" | "approved" | "scheduled" | "published";
  pillar: string;
  caption: string;
  hashtags: string;
  slides?: SlideSpec[];
  scenes?: VideoScene[];
  productionSpecs: ProductionSpecs;
  notes: string;
}

const INITIAL_POSTS: ContentPost[] = [
  // THURSDAY OCT 1 (TODAY'S HERO POST)
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
    notes: "Today's Hero Post! Signal Desk 6-Slide Carousel. 100% compliant with new prompt template, zero hex codes, no white border mentions, top-3/4 rule enforced."
  },

  // WEDNESDAY SEP 30
  {
    id: "ni-w1-wed-it",
    week: 1,
    day: "Wednesday",
    date: "Wed Sep 30, 2026",
    channel: "IT",
    slot: "Sector 3 IT Post",
    brand: "GrantBot",
    format: "Carousel",
    platforms: ["LinkedIn", "Instagram"],
    title: "GrantBot: 5-Slide Grant Discovery Masterclass",
    hook: "Save hours of grant writing and submission. Match criteria in 60 seconds.",
    status: "published",
    pillar: "Save hours of grant application writing and submission. Enter cause and org info, choose grants to apply for, generate application materials for each, enter and submit each.",
    caption: `Over $12 billion in grant funding goes unawarded every year because organizations don't have the time to research, verify eligibility, and draft custom proposals.

Here is how GrantBot automates the entire grant pipeline:
1. Enter your cause and organization info in plain language.
2. GrantBot scans active federal, state, and foundation grant databases.
3. Choose the grants that fit your goals with verified 0–100% eligibility scores.
4. Generate criteria-matched application materials for each in minutes.
5. Review, enter, and submit with total confidence.

Save hours on research and submission.

Run your free grant pipeline scan today at northsideintelligence.com/grantbot.

#NonprofitLeadership #GrantFunding #GrantWriting #SmallBusinessGrants #GrantOpportunity`,
    hashtags: "#NonprofitLeadership #GrantFunding #GrantWriting #SmallBusinessGrants #GrantOpportunity",
    productionSpecs: {
      dimensionsAndFormat: "1080 x 1440 px, 3:4 aspect ratio, PNG / JPG high resolution",
      branding: "Dark obsidian emerald background, radiant emerald green accent badges, deep slate card containers, crisp pure white typography. No hex color codes.",
      references: "northsideintelligence.com/grantbot",
      rules: [
        "All text and important content of the images stays in the top 3/4 of the image",
        "ALL TEXT WITHIN THE IMAGE AND UI DETAILS MUST BE COMPLETELY RENDERED WITHOUT ANY 'AI SLOP' AND POORLY RENDERED TEXT"
      ]
    },
    slides: [
      {
        slideNumber: "Slide 1 of 5",
        mainPrompt: "Cinematic overhead view of an executive office desk in evening light. A stack of complex 40-page grant compliance guidelines has a glowing emerald holographic scan beam passing over it, condensing the clutter into a clean tablet displaying '3 Perfect Grant Matches Found ($125,000 Total)'. Deep obsidian emerald tone.",
        onScreenText: "\"Save hours of grant research and submission. Match funding in 60 seconds.\" High-contrast white typography with glowing emerald badge accent."
      },
      {
        slideNumber: "Slide 2 of 5",
        mainPrompt: "High-contrast software breakdown diagram showing the GrantBot 3-step automated funnel: 1. Input Cause & Org Info -> 2. Match Algorithm (0-100% Score) -> 3. Auto-Drafted Narrative. Dark emerald gradient background with glowing connector nodes.",
        onScreenText: "\"From organization mission to matched grant in 60 seconds.\" Bold sans-serif text in white with emerald step markers."
      },
      {
        slideNumber: "Slide 3 of 5",
        mainPrompt: "Hyper-realistic direct capture of the GrantBot Funder Dashboard on an Apple Studio Display. Displays live columns: Funder Name, Award Amount ($75,000), Due Date, and a prominent green '94% Eligibility Match' badge with key criteria checklist checked.",
        onScreenText: "\"Instant 0–100% Eligibility Match. Never waste time on grants you can't win.\" Clean white header text with luminous green badge styling."
      },
      {
        slideNumber: "Slide 4 of 5",
        mainPrompt: "Detailed split-screen view of GrantBot AI proposal drafting engine. On left, specific funder guidelines; on right, perfectly formatted narrative answering required questions with compelling mission data.",
        onScreenText: "\"Criteria-matched proposal materials generated in minutes, not weeks.\" Crisp white typography in top safe zone."
      },
      {
        slideNumber: "Slide 5 of 5",
        mainPrompt: "Clean, authoritative closing card featuring the GrantBot monogram in glowing emerald, with an interactive mockup button labeled 'Run Your Free Grant Scan'. Sleek dark glass aesthetic.",
        onScreenText: "\"Stop letting grant money sit on the table. Scan active grants free at northsideintelligence.com/grantbot\" White headline with glowing green button."
      }
    ],
    notes: "Published Wednesday Sep 30."
  },
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
    notes: "Published Wednesday Sep 30."
  },

  // FRIDAY OCT 2
  {
    id: "ni-w1-fri-it",
    week: 1,
    day: "Friday",
    date: "Fri Oct 2, 2026",
    channel: "IT",
    slot: "Sector 3 IT Post",
    brand: "BridgeAI",
    format: "Carousel",
    platforms: ["LinkedIn", "Instagram"],
    title: "BridgeAI: Workflow Orchestration Blueprint",
    hook: "Find the bridge between all your tools to optimize your workflow.",
    status: "pending",
    pillar: "Find the bridge between all your tools to optimize your workflow. Stop manual copy-paste across software stacks.",
    caption: `Most companies don't have a software problem—they have a connection problem.

Your CRM doesn't sync with your invoice platform.
Your project board doesn't update your client portal.
Your team spends 10+ hours a week doing manual copy-paste data entry between 5 different logins.

BridgeAI finds the bridge between all your tools to optimize your workflow:
1. Connect existing software into an autonomous, synchronized pipeline.
2. Eliminate manual data entry and human copy-paste errors.
3. Free your team to focus on high-leverage client delivery.

Stop manual copy-paste. Orchestrate your workflow.

Get started at northsideintelligence.com/bridgeai.

#WorkflowAutomation #SoftwareIntegration #BusinessOperations #ProductivityTools #OpsManagement`,
    hashtags: "#WorkflowAutomation #SoftwareIntegration #BusinessOperations #ProductivityTools #OpsManagement",
    productionSpecs: {
      dimensionsAndFormat: "1080 x 1440 px, 3:4 aspect ratio, PNG / JPG high resolution",
      branding: "Dark obsidian navy canvas, glowing electric indigo orchestration nodes, ice-cyan data pathways, pure white typography. No hex color codes.",
      references: "northsideintelligence.com/bridgeai",
      rules: [
        "All text and important content of the images stays in the top 3/4 of the image",
        "ALL TEXT WITHIN THE IMAGE AND UI DETAILS MUST BE COMPLETELY RENDERED WITHOUT ANY 'AI SLOP' AND POORLY RENDERED TEXT"
      ]
    },
    slides: [
      {
        slideNumber: "Slide 1 of 4",
        mainPrompt: "Cinematic isometric 3D render of an enterprise technology ecosystem. In center sits glowing BridgeAI core engine radiating turquoise and indigo pulse lines orchestrating fragmented software icons. Top headline legible in upper safe zone.",
        onScreenText: "\"Find the bridge between all your tools to optimize your workflow.\" Bold white sans-serif text with glowing indigo node highlights."
      },
      {
        slideNumber: "Slide 2 of 4",
        mainPrompt: "Split diagram: Left shows chaotic manual copy-paste between 5 browser tabs; Right shows BridgeAI's unified automated pipeline with real-time sync pulses.",
        onScreenText: "\"Stop wasting 10 hours a week on manual copy-paste data entry.\" High-contrast white lettering with soft warning red indicator on left."
      },
      {
        slideNumber: "Slide 3 of 4",
        mainPrompt: "Direct screen capture of BridgeAI orchestration canvas showing two-way data sync between CRM, invoicing, and task management. Crisp UI cards.",
        onScreenText: "\"Synchronized software. Zero custom API development required.\" Pure white typography with cyan connection pathways."
      },
      {
        slideNumber: "Slide 4 of 4",
        mainPrompt: "High-impact closing slide featuring BridgeAI monogram in glowing indigo and direct sign-up call to action button with clean URL northsideintelligence.com/bridgeai.",
        onScreenText: "\"Optimize your software stack today: northsideintelligence.com/bridgeai\" White title font with glowing indigo interactive button."
      }
    ],
    notes: "Scheduled for Friday Oct 2."
  }
];

export default function NiContentPage() {
  const [posts, setPosts] = useState<ContentPost[]>(INITIAL_POSTS);
  const [activeSlotId, setActiveSlotId] = useState<string>("ni-w1-thu-it");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [filterChannel, setFilterChannel] = useState<string>("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveFlash, setSaveFlash] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ni_content_console_v4");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPosts((prev) =>
            prev.map((p) => {
              const matched = parsed.find((item: ContentPost) => item.id === p.id);
              return matched ? { ...p, ...matched } : p;
            })
          );
        }
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const saveToStorage = (updatedPosts: ContentPost[]) => {
    setPosts(updatedPosts);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1500);
    try {
      localStorage.setItem("ni_content_console_v4", JSON.stringify(updatedPosts));
    } catch {
      // Fallback
    }
  };

  const activePost = posts.find((p) => p.id === activeSlotId) || posts[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleStatusChange = (newStatus: ContentPost["status"]) => {
    const updated = posts.map((p) => (p.id === activePost.id ? { ...p, status: newStatus } : p));
    saveToStorage(updated);
  };

  const handleFieldChange = (field: keyof ContentPost, value: string) => {
    const updated = posts.map((p) => (p.id === activePost.id ? { ...p, [field]: value } : p));
    saveToStorage(updated);
  };

  const handleSlideChange = (slideIdx: number, field: keyof SlideSpec, value: string) => {
    const updated = posts.map((p) => {
      if (p.id === activePost.id && p.slides) {
        const nextSlides = [...p.slides];
        nextSlides[slideIdx] = { ...nextSlides[slideIdx], [field]: value };
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
        nextScenes[sceneIdx] = { ...nextScenes[sceneIdx], [field]: value };
        return { ...p, scenes: nextScenes };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const handleProductionSpecChange = (field: keyof ProductionSpecs, value: string) => {
    const updated = posts.map((p) => {
      if (p.id === activePost.id) {
        return {
          ...p,
          productionSpecs: {
            ...p.productionSpecs,
            [field]: value
          }
        };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all content back to original locked templates?")) {
      try {
        localStorage.removeItem("ni_content_console_v4");
        localStorage.removeItem("ni_calendar_full_user_edits_v3");
      } catch {}
      setPosts(INITIAL_POSTS);
      setSaveFlash(true);
      setTimeout(() => setSaveFlash(false), 1500);
    }
  };

  const filteredPosts = posts.filter((p) => {
    if (filterChannel === "IT") return p.channel === "IT";
    if (filterChannel === "Store") return p.channel === "Store";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f2f7fb] font-sans antialiased selection:bg-[#4fc7ff] selection:text-black">
      {/* TOP STATUS NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f18]/95 backdrop-blur-md px-5 py-3.5">
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
                Content Command &amp; Live Review Console
              </h1>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <button
              onClick={handleResetDefaults}
              className="rounded-md border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
              title="Reset all fields to original template"
            >
              ↺ Reset Defaults
            </button>
            <div className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5">
              <span className="text-white/50">Today: </span>
              <span className="font-bold text-[#4fc7ff]">{activePost.date}</span>
            </div>
            <button
              onClick={() => handleCopy(activePost.caption, "top-caption")}
              className="rounded-md bg-gradient-to-r from-[#4fc7ff] to-[#3a8fc2] px-3.5 py-1.5 text-xs font-bold text-black shadow-sm hover:brightness-110 transition cursor-pointer"
            >
              {copiedKey === "top-caption" ? "✓ Copied Caption!" : "Copy Active Caption"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-5 py-6 space-y-6">
        {/* HERO BANNER FOR ACTIVE SLOT */}
        <div className="relative overflow-hidden rounded-xl border border-[#4fc7ff]/40 bg-gradient-to-r from-[#0b1424] via-[#09101d] to-[#060a12] p-5 shadow-xl shadow-[#4fc7ff]/5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-[280px]">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4fc7ff]">
                  Active Publishing Target — {activePost.date}
                </span>
                <span className="text-xs text-emerald-400 font-mono">✏️ All fields are directly editable</span>
              </div>

              {/* EDITABLE POST TITLE */}
              <div className="mt-2">
                <label className="text-[10px] font-mono uppercase text-white/50 block">Post Title (Click to edit):</label>
                <input
                  type="text"
                  value={activePost.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  className="mt-0.5 w-full rounded-lg border border-white/15 bg-black/50 px-3 py-1.5 text-base font-extrabold text-white focus:border-[#4fc7ff] focus:bg-[#0d1627] focus:outline-none"
                  placeholder="Post title..."
                />
              </div>

              {/* EDITABLE HOOK LINE */}
              <div className="mt-2">
                <label className="text-[10px] font-mono uppercase text-white/50 block">Hook Line (Click to edit):</label>
                <input
                  type="text"
                  value={activePost.hook}
                  onChange={(e) => handleFieldChange("hook", e.target.value)}
                  className="mt-0.5 w-full rounded-md border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 focus:border-[#4fc7ff] focus:bg-[#0d1627] focus:outline-none"
                  placeholder="Hook line..."
                />
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white/60">Status:</span>
                <select
                  value={activePost.status}
                  onChange={(e) => handleStatusChange(e.target.value as ContentPost["status"])}
                  className="rounded-lg border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-bold text-[#4fc7ff] focus:border-[#4fc7ff] focus:outline-none cursor-pointer"
                >
                  <option value="draft">Draft</option>
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <span className="text-[10px] font-mono text-white/40">Changes auto-save instantly</span>
            </div>
          </div>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT COLUMN: PROMPT SPEC INSPECTOR (CAROUSEL / VIDEO) (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            {/* CAROUSEL FORMAT INSPECTOR */}
            {activePost.slides && (
              <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <span>🎨 Carousel Images Format (Template Compliant)</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Matches canonical AI Content Generation Template (Slide # &bull; Main Prompt &bull; On Screen Text &bull; Production Specs).
                    </p>
                  </div>
                  <span className="rounded bg-[#4fc7ff]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#4fc7ff] border border-[#4fc7ff]/30">
                    {activePost.slides[activeSlideIndex]?.slideNumber || `Slide ${activeSlideIndex + 1}`}
                  </span>
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

                {/* ACTIVE SLIDE TEMPLATE FIELDS */}
                {activePost.slides[activeSlideIndex] && (
                  <div className="rounded-lg border border-cyan-500/30 bg-black/50 p-4 space-y-4">
                    {/* SLIDE NUMBER */}
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

                    {/* MAIN PROMPT */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                          Main Prompt (Describe in heavy detail to optimize best generation; no color codes):
                        </label>
                        <button
                          onClick={() =>
                            handleCopy(activePost.slides![activeSlideIndex].mainPrompt, `prompt-${activeSlideIndex}`)
                          }
                          className="text-[11px] text-[#4fc7ff] hover:underline cursor-pointer"
                        >
                          {copiedKey === `prompt-${activeSlideIndex}` ? "✓ Copied" : "Copy Prompt"}
                        </button>
                      </div>
                      <textarea
                        rows={5}
                        value={activePost.slides[activeSlideIndex].mainPrompt}
                        onChange={(e) => handleSlideChange(activeSlideIndex, "mainPrompt", e.target.value)}
                        className="w-full rounded-md border border-white/15 bg-[#07090e] p-3 text-xs leading-relaxed text-white/90 font-mono focus:border-[#4fc7ff] focus:bg-[#09101d] focus:outline-none transition"
                        placeholder="Describe what the photo is to optimize best image generation..."
                      />
                    </div>

                    {/* ON SCREEN TEXT */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                        On Screen Text (In quotations, describe font, features, and coloring without codes):
                      </label>
                      <textarea
                        rows={3}
                        value={activePost.slides[activeSlideIndex].onScreenText}
                        onChange={(e) => handleSlideChange(activeSlideIndex, "onScreenText", e.target.value)}
                        className="w-full rounded-md border border-cyan-800/60 bg-cyan-950/20 p-2.5 text-xs font-medium text-cyan-200 focus:border-[#4fc7ff] focus:bg-[#071324] focus:outline-none transition leading-relaxed"
                        placeholder='Describe what text says in quotations and describe font/coloring...'
                      />
                    </div>

                    {/* PRODUCTION SPECS (CAROUSEL) */}
                    <div className="border-t border-white/10 pt-3 space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-white/80">
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
                          Branding (Colors described without numbers | no color codes):
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
                          <li>All text and important content of the images stays in the top 3/4 of the image</li>
                          <li>ALL TEXT WITHIN THE IMAGE AND UI DETAILS MUST BE COMPLETELY RENDERED WITHOUT ANY "AI SLOP" AND POORLY RENDERED TEXT</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIDEO FORMAT INSPECTOR (FOR SMART STORE OR REELS) */}
            {activePost.scenes && (
              <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    🎬 Video Format (Template Compliant)
                  </h3>
                  <p className="text-xs text-white/50">
                    Scene breakdown, distinct character dialogue, narrator voice with timestamps, and production specs.
                  </p>
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

                {/* VIDEO PRODUCTION SPECS */}
                <div className="border-t border-white/10 pt-3 space-y-2 text-xs">
                  <div className="font-bold uppercase text-white/80">Video Production Specs:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-white/50 block">Narrator Tone:</span>
                      <input
                        type="text"
                        value={activePost.productionSpecs.narratorTone || ""}
                        onChange={(e) => handleProductionSpecChange("narratorTone", e.target.value)}
                        className="w-full rounded border border-white/10 bg-[#07090e] px-2 py-1 text-xs text-white focus:border-[#4fc7ff] focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/50 block">SFX:</span>
                      <input
                        type="text"
                        value={activePost.productionSpecs.sfx || ""}
                        onChange={(e) => handleProductionSpecChange("sfx", e.target.value)}
                        className="w-full rounded border border-white/10 bg-[#07090e] px-2 py-1 text-xs text-white focus:border-[#4fc7ff] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: UNIFIED COPY-PASTE CAPTION & HASHTAGS (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>📝 Unified Cross-Platform Caption</span>
                    <span className="text-[10px] font-mono text-cyan-400 font-normal">(Editable)</span>
                  </h3>
                  <p className="text-xs text-white/50">
                    Works across LinkedIn, Instagram, Threads, and Facebook.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(activePost.caption, "right-caption")}
                  className="rounded bg-gradient-to-r from-[#4fc7ff] to-[#3a8fc2] px-3 py-1.5 text-xs font-bold text-black shadow hover:brightness-110 transition cursor-pointer"
                >
                  {copiedKey === "right-caption" ? "✓ Copied!" : "Copy Caption"}
                </button>
              </div>

              {/* EDITABLE CAPTION AREA */}
              <div className="mt-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">
                  Caption Body (Type directly to edit):
                </label>
                <textarea
                  rows={15}
                  value={activePost.caption}
                  onChange={(e) => handleFieldChange("caption", e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#07090e] p-3 text-xs leading-relaxed text-white font-mono focus:border-[#4fc7ff] focus:bg-[#09101d] focus:outline-none transition"
                  placeholder="Type caption body..."
                />
              </div>

              {/* 5 DISCOVERY HASHTAGS */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                    Strictly 5 Discovery Hashtags (Zero Vanity Tags):
                  </label>
                  <button
                    onClick={() => handleCopy(activePost.hashtags, "hashtags")}
                    className="text-[11px] text-[#4fc7ff] hover:underline cursor-pointer"
                  >
                    {copiedKey === "hashtags" ? "✓ Copied" : "Copy Tags"}
                  </button>
                </div>
                <input
                  type="text"
                  value={activePost.hashtags}
                  onChange={(e) => handleFieldChange("hashtags", e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-[#07090e] px-3 py-2 text-xs font-mono text-cyan-300 focus:border-[#4fc7ff] focus:bg-[#09101d] focus:outline-none transition"
                  placeholder="#Hashtag1 #Hashtag2 #Hashtag3 #Hashtag4 #Hashtag5"
                />
              </div>

              {/* OPERATOR NOTES */}
              <div className="mt-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-1">
                  Operator Notes &amp; Governance Checks (Editable):
                </label>
                <textarea
                  rows={2}
                  value={activePost.notes}
                  onChange={(e) => handleFieldChange("notes", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#07090e] p-2 text-xs text-white/70 focus:border-[#4fc7ff] focus:bg-[#09101d] focus:outline-none transition"
                  placeholder="Operator notes..."
                />
              </div>
            </div>

            {/* CADENCE & HARD RULES ACCORDION */}
            <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Locked Operating Standards
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>No Hex Color Codes:</strong> Describe colors in natural words (Google injects numbers into images).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Zero White Border:</strong> White border rule permanently deleted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>5 Discovery Hashtags:</strong> High-intent keywords only. Zero branded vanity tags.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Zero Twitter/X:</strong> Twitter/X strictly banned across all NI content operations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Outreach Separated:</strong> Direct messages belong strictly in Outreach HQ, not Content.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ALL SCHEDULED SLOTS ROSTER */}
        <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Weekly Content Publishing Schedule
              </h3>
              <p className="text-xs text-white/50">
                Click any slot below to load and edit its full package above.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterChannel("all")}
                className={`rounded px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  filterChannel === "all" ? "bg-white/20 text-white" : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                All Cadences
              </button>
              <button
                onClick={() => setFilterChannel("IT")}
                className={`rounded px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  filterChannel === "IT" ? "bg-[#4fc7ff]/20 text-[#4fc7ff]" : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                Sector 3 ITs Only
              </button>
              <button
                onClick={() => setFilterChannel("Store")}
                className={`rounded px-2.5 py-1 text-xs font-bold transition cursor-pointer ${
                  filterChannel === "Store" ? "bg-amber-400/20 text-amber-300" : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                Smart Store Only
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const isSelected = post.id === activeSlotId;
              return (
                <div
                  key={post.id}
                  onClick={() => {
                    setActiveSlotId(post.id);
                    setActiveSlideIndex(0);
                  }}
                  className={`rounded-lg border p-4 transition cursor-pointer ${
                    isSelected
                      ? "border-[#4fc7ff] bg-[#4fc7ff]/5 shadow-md shadow-[#4fc7ff]/10"
                      : "border-white/10 bg-black/30 hover:border-white/20 hover:bg-black/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-white/60">
                      {post.date}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        post.status === "approved"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : post.status === "published"
                          ? "bg-cyan-950 text-cyan-300 border border-cyan-800"
                          : "bg-amber-950 text-amber-300 border border-amber-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <h4 className="mt-2 text-sm font-bold text-white">{post.title}</h4>
                  <p className="mt-1 text-xs line-clamp-2 text-white/70">{post.hook}</p>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[11px] text-white/50">
                    <span>{post.brand} ({post.format})</span>
                    <span className="text-[#4fc7ff] font-semibold">{isSelected ? "Selected" : "Click to Edit &rarr;"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
