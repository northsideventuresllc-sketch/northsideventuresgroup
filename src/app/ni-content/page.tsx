"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface SlideSpec {
  num: string;
  title: string;
  main: string;
  text: string;
  image?: string;
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
  dmScript: string;
  slides?: SlideSpec[];
  scenes?: { scene: string; desc: string; dialogue: string }[];
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
    dmScript: "Hey! Saw your recent expansion in your market. We built Signal Desk so founders and operators can drop in their competitor list and get one clean, ranked brief on pricing, hiring, and product moves before public announcements. Happy to set up a free monitor for you: northsideintelligence.com/signaldesk",
    slides: [
      {
        num: "Slide 1 of 6 (The Hook)",
        title: "The Cover Hook",
        main: "Cinematic executive cybersecurity intelligence command center at twilight. An ultra-wide curved OLED monitor displays the Signal Desk competitive intelligence radar interface in glowing cyan #00D4FF and electric sky blue #38BDF8 accents on dark cyber slate #07080C background. The radar shows live real-time detection cards highlighting competitor stealth hiring and silent pricing changes. Minimalist geometric HUD grid lines, high-tech atmospheric depth. Bold clean typography at top reads: 'HOW TO TRACK COMPETITORS BEFORE THEY ANNOUNCE THEIR NEXT MOVE'. Full bleed 3:4 portrait, zero white borders.",
        text: "By the time a competitor makes an announcement, you're already 3 months behind."
      },
      {
        num: "Slide 2 of 6 (The Input)",
        title: "Input & Signal Ingestion",
        main: "Close-up high-contrast capture of the Signal Desk user interface dashboard on an Apple Studio display screen. Dark cyber slate canvas #07080C with midnight navy panels. A minimalist input module shows plain-text competitor entries: 'acme-saas.com', 'hypercloud.io', followed by raw founder notes. A glowing cyan #00D4FF scanning status beam reads: 'Ingesting 14 live web and hiring signals...'. Top typography: 'DROP IN YOUR MARKET NOTES & COMPETITORS'. Full bleed 3:4 portrait, zero white borders.",
        text: "Drop in your market notes and competitors. Instant automated monitoring."
      },
      {
        num: "Slide 3 of 6 (The Radar)",
        title: "Silent Moves Ranked by Impact",
        main: "High-tech software interface card capture displaying the Signal Desk Signal Radar. Dark cyber slate #07080C background with deep navy glass cards. 3 categorized competitor shifts are prominently ranked: 1. Talent & Hiring (glowing cyan badge '98% High Impact'): 'Competitor hired 4 Senior AI Engineers'; 2. Pricing Restructure (amber highlight): 'Enterprise Tier discount quietly reduced 15%'; 3. Feature Velocity (sky blue highlight): 'Negative customer review spike on latency'. Top headline: 'SILENT MOVES RANKED BY IMPACT'. Full bleed 3:4 portrait, zero white borders.",
        text: "Silent moves ranked by impact. No vanity metrics, just real strategic shifts."
      },
      {
        num: "Slide 4 of 6 (The Brief)",
        title: "The Executive Brief",
        main: "Macro UI view of a sleek executive document generated inside the Signal Desk software. Dark background #07080C with crisp glassmorphism briefing card titled 'SIGNAL DESK — EXECUTIVE RADAR BRIEF'. Shows bulleted strategic analysis: 'Strategic Threat Level: Medium-High', 'Recommended Offensive Counter-Move: Accelerate API launch to capture dissatisfied latency churn', and 'Source Intelligence Trace: 14 data points verified'. Top headline: 'ONE RANKED BRIEF ON WHAT MATTERS NEXT'. Full bleed 3:4 portrait, zero white borders.",
        text: "One ranked brief on what matters next. Delivered in seconds, not weeks."
      },
      {
        num: "Slide 5 of 6 (The Action)",
        title: "Manual vs Signal Desk",
        main: "High-contrast visual comparison graphic for competitive intelligence software. Dark obsidian background #07080C. Top headline reads: 'STOP MANUAL DIGGING. START OFFENSIVE EXECUTION.'. Left card (muted dark grey, warning red accent) shows 'MANUAL MONITORING: 15+ hours/week, 20 open tabs, 3 months behind'. Right card (glowing radiant cyan border #00D4FF, electric blue glow) shows 'SIGNAL DESK RADAR: 2 minutes/day, automated signal ingestion, real-time ranked briefs'. Full bleed 3:4 portrait, zero white borders.",
        text: "Stop manual digging. Turn quiet market shifts into your next offensive move."
      },
      {
        num: "Slide 6 of 6 (Dedicated CTA Card)",
        title: "Dedicated CTA Card",
        main: "Authoritative closing call-to-action brand card for Signal Desk. Dark cyber slate #07080C background with subtle glowing cyan grid depth. In the center, a luminous 3D radar emblem of Signal Desk in electric cyan #00D4FF and white titanium. Below the emblem is an interactive-style glassmorphism button displaying 'START FREE COMPETITOR RADAR'. Bold clean typography at top reads: 'STAY A STEP AHEAD OF THE COMPETITION.'. Crisp URL displayed at the bottom: 'northsideintelligence.com/signaldesk'. Full bleed 3:4 portrait, zero white borders.",
        text: "Stay a step ahead of the competition. Start tracking free at northsideintelligence.com/signaldesk"
      }
    ],
    notes: "Today's Hero Post! Signal Desk 6-Slide Carousel (3:4 portrait, full bleed, top-3/4 rule, 5 high-intent discovery tags, zero vanity tags). Autopilot excluded per Decision #2068."
  },

  // WEDNESDAY SEP 30 (YESTERDAY)
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
    dmScript: "Hey! Saw your recent community initiative. Did you know there are currently 14 active foundation grants open for organizations in your sector? Put together a custom GrantBot pipeline showing eligibility scores and deadline dates. Would love to share the breakdown: northsideintelligence.com/grantbot",
    notes: "Published yesterday. High organic reach on LinkedIn and Instagram."
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
    dmScript: "Sent you the direct deal link for that ergonomic vertical mouse from our reel! Sits at $6.40 on Smart Store right now: northsideintelligence.com/store",
    notes: "Published yesterday on IG & FB Reels."
  },

  // FRIDAY OCT 2 (TOMORROW)
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
    dmScript: "Hey! Saw your team is scaling up and dealing with disconnected tool handoffs. We built BridgeAI to connect CRMs, project boards, and billing tools without writing custom code. Would love to send a quick architecture overview!",
    notes: "Scheduled for Friday morning."
  },
  {
    id: "ni-w1-fri-store",
    week: 1,
    day: "Friday",
    date: "Fri Oct 2, 2026",
    channel: "Store",
    slot: "Smart Store Video (Ask Smart Store)",
    brand: "Smart Store",
    format: "Video",
    platforms: ["Instagram", "Facebook Reels"],
    title: "Smart Store: Ask Smart Store (Noise Cancelling Headphones)",
    hook: "Hey Smart Store, find me studio-grade ANC headphones under $35.",
    status: "pending",
    pillar: "Tell Smart Store what you are after. It searches the whole catalog and finds a similar option for less, with picks tailored to you. Pay less for what you were already going to buy.",
    caption: `Why spend $380 on brand-name travel headphones when the exact same factory acoustic specs exist for under $32? 🎧

Tell Smart Store what you are after. It searches the whole catalog and finds a similar option for less, with picks tailored to you.

40dB active noise cancellation. 45-hour battery life. Memory foam comfort.
$31.80 on Smart Store.

Pay less for what you were already going to buy.

👉 Shop smarter at northsideintelligence.com/store.

#SmartShopping #AudioDeals #Headphones #SaveMoney #ShoppingAssistant`,
    hashtags: "#SmartShopping #AudioDeals #Headphones #SaveMoney #ShoppingAssistant",
    dmScript: "Sent you the direct deal link for the 40dB ANC headphones from today's reel! Currently $31.80 on Smart Store: northsideintelligence.com/store",
    notes: "Scheduled for Friday afternoon."
  }
];

export default function NiContentPage() {
  const [posts, setPosts] = useState<ContentPost[]>(INITIAL_POSTS);
  const [activeSlotId, setActiveSlotId] = useState<string>("ni-w1-thu-it");
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [filterChannel, setFilterChannel] = useState<string>("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ni_calendar_full_user_edits_v3");
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
    try {
      localStorage.setItem("ni_calendar_full_user_edits_v3", JSON.stringify(updatedPosts));
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

  const filteredPosts = posts.filter((p) => {
    if (filterChannel === "IT") return p.channel === "IT";
    if (filterChannel === "Store") return p.channel === "Store";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f2f7fb] font-sans antialiased selection:bg-[#4fc7ff] selection:text-black">
      {/* TOP STATUS NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0f18]/90 backdrop-blur-md px-5 py-3.5">
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
              </div>
              <h1 className="text-sm font-bold tracking-tight text-white sm:text-base">
                Content Command & Review Console
              </h1>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 text-xs">
            <div className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5">
              <span className="text-white/50">Today: </span>
              <span className="font-bold text-[#4fc7ff]">Thu Oct 1 (Signal Desk)</span>
            </div>
            <div className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5">
              <span className="text-white/50">Cadence: </span>
              <span className="font-bold text-emerald-400">Sector 3 IT Carousel (M–F)</span>
            </div>
            <button
              onClick={() => handleCopy(activePost.caption, "top-caption")}
              className="rounded-md bg-gradient-to-r from-[#4fc7ff] to-[#3a8fc2] px-3.5 py-1.5 text-xs font-bold text-black shadow-sm hover:brightness-110 transition cursor-pointer"
            >
              {copiedKey === "top-caption" ? "✓ Copied Today's Caption!" : "Copy Active Caption"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-5 py-6 space-y-6">
        {/* HERO BANNER FOR THURSDAY OCT 1 */}
        <div className="relative overflow-hidden rounded-xl border border-[#4fc7ff]/30 bg-gradient-to-r from-[#0b1424] via-[#09101d] to-[#060a12] p-6 shadow-xl shadow-[#4fc7ff]/5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4fc7ff]">
                  Active Publishing Target — Thursday, October 1, 2026
                </span>
              </div>
              <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                Sector 3 IT: Signal Desk — 6-Slide Carousel
              </h2>
              <p className="mt-1 max-w-2xl text-xs text-white/70 sm:text-sm">
                Clean 3:4 portrait carousel, full bleed, zero white borders, top-3/4 rule, 5 high-intent discovery tags. Verified under Decision #2072, #2073 & #2074.
              </p>
            </div>

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
          </div>
        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT COLUMN: CAROUSEL SLIDE VIEWER & PROMPT INSPECTOR (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            {activePost.slides && (
              <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Slide Gallery & Creative Directives
                    </h3>
                    <p className="text-xs text-white/50">
                      Click any slide below to inspect prompt and on-screen text.
                    </p>
                  </div>
                  <span className="rounded bg-[#4fc7ff]/10 px-2 py-0.5 font-mono text-xs font-bold text-[#4fc7ff] border border-[#4fc7ff]/30">
                    Slide {activeSlideIndex + 1} of {activePost.slides.length}
                  </span>
                </div>

                {/* SLIDE TABS */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
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
                      {idx === 0 ? "Slide 1 (Cover)" : idx === 5 ? "Slide 6 (CTA)" : `Slide ${idx + 1}`}
                    </button>
                  ))}
                </div>

                {/* ACTIVE SLIDE CARD */}
                {activePost.slides[activeSlideIndex] && (
                  <div className="mt-4 space-y-4">
                    <div className="rounded-lg border border-white/10 bg-black/40 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#4fc7ff]">
                          {activePost.slides[activeSlideIndex].num}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-white/50">
                          {activePost.slides[activeSlideIndex].title}
                        </span>
                      </div>

                      {/* ON-SCREEN TEXT */}
                      <div className="mt-3">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                          On-Screen Text (Top 3/4 Rule)
                        </label>
                        <div className="mt-1 rounded-md border border-white/10 bg-[#07090e] p-3 text-sm font-semibold text-white">
                          "{activePost.slides[activeSlideIndex].text}"
                        </div>
                      </div>

                      {/* GENERATION PROMPT */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                            Hyper-Specific Generation Prompt
                          </label>
                          <button
                            onClick={() =>
                              handleCopy(activePost.slides![activeSlideIndex].main, `prompt-${activeSlideIndex}`)
                            }
                            className="text-[11px] text-[#4fc7ff] hover:underline cursor-pointer"
                          >
                            {copiedKey === `prompt-${activeSlideIndex}` ? "✓ Copied" : "Copy Prompt"}
                          </button>
                        </div>
                        <div className="mt-1 rounded-md border border-white/5 bg-[#07090e]/80 p-3 text-xs leading-relaxed text-white/80 font-mono">
                          {activePost.slides[activeSlideIndex].main}
                        </div>
                      </div>
                    </div>

                    {/* SPECS STRIP */}
                    <div className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                      <div className="rounded-md border border-white/5 bg-white/[0.02] p-2 text-center">
                        <span className="block text-[10px] uppercase text-white/40">Ratio</span>
                        <span className="font-bold text-white">3:4 Portrait</span>
                      </div>
                      <div className="rounded-md border border-white/5 bg-white/[0.02] p-2 text-center">
                        <span className="block text-[10px] uppercase text-white/40">Scaffold</span>
                        <span className="font-bold text-emerald-400">Zero White Border</span>
                      </div>
                      <div className="rounded-md border border-white/5 bg-white/[0.02] p-2 text-center">
                        <span className="block text-[10px] uppercase text-white/40">Placement</span>
                        <span className="font-bold text-cyan-400">Top-3/4 Safe Zone</span>
                      </div>
                      <div className="rounded-md border border-white/5 bg-white/[0.02] p-2 text-center">
                        <span className="block text-[10px] uppercase text-white/40">Tool Tier</span>
                        <span className="font-bold text-amber-400">Autopilot Excluded</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* DIRECT OUTREACH SCRIPT */}
            <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Direct Outreach DM Script (1-on-1)
                  </h3>
                  <p className="text-xs text-white/50">
                    50–125 words, problem empathy &rarr; highlight &rarr; single link CTA.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(activePost.dmScript, "dm-script")}
                  className="rounded bg-white/10 px-2.5 py-1 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                >
                  {copiedKey === "dm-script" ? "✓ Copied!" : "Copy DM"}
                </button>
              </div>

              <div className="mt-3">
                <textarea
                  rows={3}
                  value={activePost.dmScript}
                  onChange={(e) => handleFieldChange("dmScript", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#07090e] p-3 text-xs leading-relaxed text-white focus:border-[#4fc7ff] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: UNIFIED COPY-PASTE CAPTION & CONTROLS (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-white/10 bg-[#0b121b] p-5 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Unified Copy-Paste Caption
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
                <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  Caption Body (Real-time Autosave)
                </label>
                <textarea
                  rows={14}
                  value={activePost.caption}
                  onChange={(e) => handleFieldChange("caption", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#07090e] p-3 text-xs leading-relaxed text-white font-mono focus:border-[#4fc7ff] focus:outline-none"
                />
              </div>

              {/* 5 DISCOVERY HASHTAGS */}
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                    Strictly 5 Discovery Hashtags (Zero Vanity)
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
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#07090e] px-3 py-2 text-xs font-mono text-cyan-300 focus:border-[#4fc7ff] focus:outline-none"
                />
              </div>

              {/* OPERATOR NOTES */}
              <div className="mt-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  Operator Notes & Governance Checks
                </label>
                <textarea
                  rows={2}
                  value={activePost.notes}
                  onChange={(e) => handleFieldChange("notes", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-[#07090e] p-2 text-xs text-white/70 focus:border-[#4fc7ff] focus:outline-none"
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
                  <span><strong>Zero Twitter/X:</strong> Twitter/X strictly banned across all NI content.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>5 Hashtags Only:</strong> Search-intent discovery keywords only. Zero vanity tags.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Autopilot Gated:</strong> Higher 1.5x tier remains internal; omitted from public posts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Full Bleed:</strong> 3:4 portrait ratio with top-3/4 composition rule.</span>
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
                Sector 3 IT Software (M–F: LinkedIn + IG) &amp; Sector 4 Smart Store (M/W/F: Video Reels)
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
                    <span className="text-[#4fc7ff] font-semibold">{isSelected ? "Selected" : "View Details &rarr;"}</span>
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
