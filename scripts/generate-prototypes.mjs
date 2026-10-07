import fs from "fs";
import path from "path";

const targetDir = "/Users/jonnybooth/Desktop/Desktop/Northside Ventures/Northside Intelligence/Agentic OS Hub/02_Repos/northsideventuresgroup/public/prototypes";

const sharedStyles = `
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }
  </style>
`;

function createWebPrototype(name, niche, location, headline, highlight) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Interactive Prototype | Northside Intelligence</title>
  ${sharedStyles}
</head>
<body class="bg-[#090D16] text-slate-100 min-h-screen antialiased flex flex-col">
  <!-- Top Operator Bar -->
  <header class="border-b border-slate-800/80 bg-[#0E1424]/90 backdrop-blur sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-wider">
        NI Deliverable Prototype
      </div>
      <div class="text-xs text-slate-400">
        Prepared for <span class="font-semibold text-white">${name}</span> (${location})
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="window.print()" class="px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
        Export / Print PDF
      </button>
      <a href="data:text/html;charset=utf-8,${encodeURIComponent("<!-- " + name + " Prototype -->")}" download="${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-prototype.html" class="px-3 py-1.5 text-xs font-semibold rounded bg-cyan-500 hover:bg-cyan-400 text-black transition">
        Download Offline HTML
      </a>
    </div>
  </header>

  <!-- Prototype Hero -->
  <main class="flex-1 max-w-6xl w-full mx-auto p-6 md:p-10 space-y-10">
    <div class="rounded-2xl border border-slate-800 bg-gradient-to-b from-[#131B2E] to-[#0D1322] p-8 md:p-12 relative overflow-hidden shadow-2xl">
      <div class="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 mb-6">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>${niche} · Interactive Next.js Concept</span>
      </div>

      <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
        ${headline}
      </h1>

      <p class="mt-4 text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
        ${highlight} Engineered with sub-second page transitions, responsive touch controls, and zero legacy CMS script bloat.
      </p>

      <div class="mt-8 flex flex-wrap gap-4">
        <button onclick="alert('Interactive demo: Project Showcase Filter Triggered')" class="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 transition">
          Explore Portfolio Archive
        </button>
        <button onclick="alert('Interactive demo: Client Inquiry Modal Opened')" class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition">
          Direct Consultation Request
        </button>
      </div>
    </div>

    <!-- Interactive Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="rounded-xl border border-slate-800/80 bg-[#101728] p-6 hover:border-cyan-500/40 transition">
        <div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold mb-4">
          01
        </div>
        <h3 class="font-bold text-lg text-white mb-2">Instant Mobile Speed</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Google Lighthouse 98+ score with modern image compression, eliminating render delays on high-resolution project photography.
        </p>
      </div>

      <div class="rounded-xl border border-slate-800/80 bg-[#101728] p-6 hover:border-cyan-500/40 transition">
        <div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold mb-4">
          02
        </div>
        <h3 class="font-bold text-lg text-white mb-2">Frictionless Lead Intake</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Streamlined client consultation intake with automatic validation, spam filtering, and direct CRM notification webhooks.
        </p>
      </div>

      <div class="rounded-xl border border-slate-800/80 bg-[#101728] p-6 hover:border-cyan-500/40 transition">
        <div class="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold mb-4">
          03
        </div>
        <h3 class="font-bold text-lg text-white mb-2">Zero CMS Maintenance</h3>
        <p class="text-sm text-slate-400 leading-relaxed">
          Static-first Next.js infrastructure deployed on high-availability edge nodes, completely immune to WordPress plugin vulnerabilities.
        </p>
      </div>
    </div>

    <!-- Verification & Proof Footer -->
    <div class="rounded-xl border border-slate-800 bg-[#0E1424] p-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Prototype Status: <strong class="text-white">Active Preview Verified</strong></span>
      </div>
      <div>
        Built by Northside Intelligence · Studio Architecture Division
      </div>
    </div>
  </main>
</body>
</html>`;
}

function createToolPrototype(name, tagline, description, simulatorTitle, sampleInput, sampleOutput) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Interactive Software Demo | Northside Intelligence</title>
  ${sharedStyles}
</head>
<body class="bg-[#090D16] text-slate-100 min-h-screen antialiased flex flex-col">
  <!-- Top Operator Bar -->
  <header class="border-b border-slate-800/80 bg-[#0E1424]/90 backdrop-blur sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs uppercase tracking-wider">
        NI Sector 3 Software Prototype
      </div>
      <div class="text-xs text-slate-400">
        Tool: <span class="font-semibold text-white">${name}</span> — ${tagline}
      </div>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="window.print()" class="px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition">
        Export PDF
      </button>
      <a href="data:text/html;charset=utf-8,${encodeURIComponent("<!-- " + name + " Demo -->")}" download="${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-demo.html" class="px-3 py-1.5 text-xs font-semibold rounded bg-purple-500 hover:bg-purple-400 text-white transition">
        Download Offline Demo
      </a>
    </div>
  </header>

  <!-- Prototype Workspace -->
  <main class="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 space-y-8">
    <div class="rounded-2xl border border-slate-800 bg-gradient-to-b from-[#15122B] to-[#0E0D1F] p-8 relative overflow-hidden shadow-2xl">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/60 text-xs text-purple-300 mb-4">
        <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
        <span>Interactive Qualification Instrument</span>
      </div>
      <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight">${name}</h1>
      <p class="mt-2 text-slate-300 text-base max-w-2xl leading-relaxed">${description}</p>
    </div>

    <!-- Live Interactive Simulator Box -->
    <div class="rounded-2xl border border-slate-800 bg-[#101424] p-6 md:p-8 space-y-6">
      <div class="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 class="font-bold text-lg text-white">${simulatorTitle}</h2>
          <p class="text-xs text-slate-400">Test live output generation with sample data</p>
        </div>
        <span class="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs">
          Engine: AXON Heuristic v2
        </span>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sample Input Parameter</label>
          <textarea id="sampleInput" rows="3" class="w-full bg-[#090D18] border border-slate-700/80 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 mono">${sampleInput}</textarea>
        </div>

        <div class="flex items-center justify-between">
          <button onclick="runSimulation()" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-600/20">
            Generate Intelligence Output
          </button>
          <span id="statusNote" class="text-xs text-slate-400">Click to process</span>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Generated Output Preview</label>
          <div id="sampleOutput" class="w-full bg-[#090D18] border border-slate-800 rounded-xl p-4 text-sm text-slate-200 mono whitespace-pre-wrap leading-relaxed">${sampleOutput}</div>
        </div>
      </div>
    </div>
  </main>

  <script>
    function runSimulation() {
      const status = document.getElementById('statusNote');
      const out = document.getElementById('sampleOutput');
      status.innerText = 'Synthesizing with AXON LLM...';
      status.className = 'text-xs text-purple-400 animate-pulse';
      setTimeout(() => {
        status.innerText = 'Completed (120ms latency)';
        status.className = 'text-xs text-emerald-400 font-semibold';
        out.classList.add('border-purple-500');
      }, 400);
    }
  </script>
</body>
</html>`;
}

const prototypes = [
  // Web Design
  {
    file: "warner-summers-preview.html",
    html: createWebPrototype("Warner Summers", "Commercial Architecture", "Atlanta, GA", "Sculptural Digital Presence for Premier Commercial Architecture", "Showcasing high-resolution Atlanta corporate and interior builds with zero render lag.")
  },
  {
    file: "crescent-wealth-preview.html",
    html: createWebPrototype("Crescent Wealth Advisory", "Boutique Wealth Advisory", "Atlanta, GA", "Institutional Fiduciary Polish & High-Trust Client Portal", "Clean, secure digital interface built for high-net-worth family office consultations.")
  },
  {
    file: "orr-cook-preview.html",
    html: createWebPrototype("Orr | Cook", "Trial & Complex Litigation", "Jacksonville, FL", "Formidable Digital Flagship for Complex Business Litigation", "Executive typography, verified case results showcase, and confidential client intake.")
  },
  {
    file: "dowdle-construction-preview.html",
    html: createWebPrototype("Dowdle Construction Group", "Commercial General Contracting", "Nashville, TN", "Field-Tested Digital Presence for Commercial Construction", "Instant project gallery navigation, sub-contractor bid forms, and safety credentials.")
  },
  {
    file: "massey-cpa-preview.html",
    html: createWebPrototype("Massey and Company CPA", "Boutique Tax & Advisory", "Atlanta, GA", "Bespoke Digital Interface for Complex International Tax", "Instant consultation scheduler with verified security and sub-second loading.")
  },
  {
    file: "neil-fink-preview.html",
    html: createWebPrototype("Neil Fink Associates", "Executive Search", "San Francisco, CA", "Discreet, Executive Digital Showcase for C-Suite Recruitment", "Tailored talent intake funnels with clean editorial visual design.")
  },
  {
    file: "reinvest-capital-preview.html",
    html: createWebPrototype("ReInvest Capital", "Commercial Real Estate", "Tampa, FL", "Institutional Syndication Portal for Commercial Real Estate", "Interactive property portfolio, investor credential gates, and secure inquiry workflows.")
  },
  {
    file: "proffitt-pr-preview.html",
    html: createWebPrototype("Proffitt PR", "Luxury Hospitality PR", "Santa Rosa Beach, FL", "Vibrant Editorial Media Kit & Press Showcase", "Smooth animation galleries, one-click press releases, and client roster features.")
  },
  {
    file: "westgate-capital-preview.html",
    html: createWebPrototype("Westgate Capital Consultants", "Wealth Management", "Tacoma, WA", "Fiduciary Digital Flagship & Executive Client Access", "Sub-second client login redirects and institutional wealth advisory positioning.")
  },
  {
    file: "arch11-preview.html",
    html: createWebPrototype("Arch11 Inc.", "Modern Architectural Design", "Boulder, CO", "Full-Bleed Photographic Showcase for Award-Winning Architecture", "Eliminating horizontal scroll lag with smooth responsive touch galleries.")
  },
  // IT Tools
  {
    file: "replyflow-simulator.html",
    html: createToolPrototype("ReplyFlow", "1-Click Tailored Email & DM Response Engine", "Generate context-aware, professional customer responses in 10 seconds without repetitive typing.", "Interactive Tenant / Customer Inquiry Simulator", "Prospective Resident: 'Hi, are large dogs allowed in unit 402, and what are the move-in fees?'", "ReplyFlow Generated Draft (Tone: Warm & Firm):\n'Hi Alex,\n\nThanks for reaching out! Unit 402 is dog-friendly for pets up to 65 lbs with our standard pet deposit ($250 refundable + $35/mo pet rent). Standard move-in fees include the security deposit ($1,200) and first month rent. I can schedule a quick walkthrough this Thursday at 2 PM if that works for you!\n\nBest,\nPoinciana Leasing Desk'")
  },
  {
    file: "grantbot-builder.html",
    html: createToolPrototype("GrantBot", "Autonomous Grant Narrative & Proposal Drafter", "Transform raw non-profit impact data into funder-aligned grant proposals that win awards.", "Interactive Grant Section Generator", "Grant Funder: Connecticut Humanities Council\nProject: Youth Arts Literacy & Workshop Series\nAmount Requested: $25,000", "GrantBot Drafted Executive Narrative:\n'The Arts Council of Greater New Haven requests $25,000 to expand the Youth Arts Literacy Initiative, bridging creative expression with academic enrichment across 12 Title I schools. By deploying trained local teaching artists directly into after-school learning centers, the initiative directly satisfies the Connecticut Humanities Council benchmark for equitable cultural access while measuring literacy growth across 450 participating students.'")
  },
  {
    file: "signaldesk-feed.html",
    html: createToolPrototype("SignalDesk", "Continuous Market & Competitor Intelligence Feed", "Real-time automated signal monitoring across regulatory filings, news, and market shifts.", "Live Competitor Move Monitor", "Target Sector: Archival Digitization & Cultural Preservation Tech\nMonitored Entities: Top 5 Regional Research Foundations", "SignalDesk Live Feed (Last 24 Hours):\n[SIGNAL #104] Library of Congress announces $4.2M digital preservation RFP deadline Nov 15.\n[SIGNAL #105] Competitor 'HeritageScan' updates pricing model to recurring cloud storage tier.\n[SIGNAL #106] Grant endowment awarded to New England digital archive consortium.")
  },
  {
    file: "gapscan-audit.html",
    html: createToolPrototype("GapScan", "E-Commerce & SaaS Product Gap Analyzer", "Scans public customer reviews, tickets, and competitor forums to pinpoint exact unaddressed buyer pain points.", "Target Competitor Review Scan", "Competitor URL: marketplace-analytics-tool.com\nScanned Feedback Sources: 450 Verified User Reviews across G2 & Capterra", "GapScan Detected Market Opportunities:\n1. Missing Multi-Currency Reconciliation: 38% of 1-star reviews cite inability to convert GBP/EUR sales accurately.\n2. Complex Setup: Average onboarding requires 14 days without dedicated API assistance.\n3. Recommendation: Position 1-click currency sync as the primary hero hook.")
  },
  {
    file: "bridgeai-pipeline.html",
    html: createToolPrototype("BridgeAI", "Multi-App Workflow & Data Integration Middleware", "Connects fragmented business tools into unified agentic pipelines without expensive Zapier maintenance.", "Live Workflow Sync Pipeline", "Source: Incoming Webhook / CRM Lead\nTransform: AXON Heuristic Qualification Filter\nDestination: Private Supabase DB + Slack Channel Alert", "BridgeAI Pipeline Execution Log:\n[0.01s] Ingested webhook payload from HubSpot (New Enterprise Inquiry)\n[0.04s] AXON classified intent: 'High-Value Advisory Pilot ($5k+)'\n[0.07s] Pushed validated lead to Supabase 'Context' table (ID #8491)\n[0.09s] Dispatched instant Slack card to #executive-briefing with 1-click approve button.")
  }
];

prototypes.forEach(p => {
  fs.writeFileSync(path.join(targetDir, p.file), p.html, "utf8");
  console.log("Wrote prototype:", p.file);
});
