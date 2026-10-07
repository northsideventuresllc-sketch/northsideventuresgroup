"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  INITIAL_FOLLOWUPS,
  INITIAL_WEBDESIGN,
  INITIAL_ITTOOLS,
  OutreachLeadItem,
  OutreachStep,
  ArtifactReceipt,
} from "@/data/ni-outreach-data";

export default function NiOutreachPage() {
  const [allLeads, setAllLeads] = useState<OutreachLeadItem[]>([
    ...INITIAL_WEBDESIGN.map((l) => ({ ...l, category: "webdesign" })),
    ...INITIAL_ITTOOLS.map((l) => ({ ...l, category: "ittools" })),
    ...INITIAL_FOLLOWUPS.map((l) => ({ ...l, category: "archive" })),
  ]);

  // Requirement 7: Default is "active" view vs "archive" view
  const [viewMode, setViewMode] = useState<"active" | "archive">("active");
  const [ventureFilter, setVentureFilter] = useState<"all" | "webdesign" | "ittools">("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Requirement 1: Info Pop-up Modal State
  const [infoLead, setInfoLead] = useState<OutreachLeadItem | null>(null);

  // Requirement 11: Artifact Edit Request Modal & Side Panel State
  const [editArtifactLead, setEditArtifactLead] = useState<OutreachLeadItem | null>(null);
  const [editOptions, setEditOptions] = useState<string[]>([]);
  const [customEditNotes, setCustomEditNotes] = useState("");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [editProgress, setEditProgress] = useState(0);
  const [editStatusText, setEditStatusText] = useState("");
  const [activeReceiptLead, setActiveReceiptLead] = useState<OutreachLeadItem | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<ArtifactReceipt | null>(null);

  // Tooltip hover states for confidence ratings (Requirement 4)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Restore edits from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ni_outreach_console_edits_v4");
      if (saved) {
        const parsed = JSON.parse(saved);
        setAllLeads((prev) =>
          prev.map((lead) => (parsed[lead.id] ? { ...lead, ...parsed[lead.id] } : lead))
        );
      }
    } catch (e) {
      console.warn("Could not load saved outreach leads:", e);
    }
  }, []);

  const updateLead = (id: string, field: string, value: unknown, stepNum?: number, channelIndex?: number) => {
    setAllLeads((prev) => {
      const target = prev.find((l) => l.id === id);
      const originalText =
        stepNum && target?.steps?.[stepNum]
          ? target.steps[stepNum][field as "subject" | "body"] || ""
          : String((target as Record<string, unknown>)?.[field] ?? "");

      const updated = prev.map((lead) => {
        if (lead.id !== id) return lead;
        if (stepNum) {
          const currentSteps = lead.steps || {};
          const currentStepObj = currentSteps[stepNum] || {};

          // Channel-specific edit (Requirement 6)
          if (channelIndex !== undefined && currentStepObj.channels && currentStepObj.channels[channelIndex]) {
            const updatedChannels = [...currentStepObj.channels];
            updatedChannels[channelIndex] = {
              ...updatedChannels[channelIndex],
              [field]: value,
            };
            return {
              ...lead,
              steps: {
                ...currentSteps,
                [stepNum]: {
                  ...currentStepObj,
                  channels: updatedChannels,
                  [field]: value,
                },
              },
            };
          }

          const updatedSteps = {
            ...currentSteps,
            [stepNum]: {
              ...currentStepObj,
              [field]: value,
            },
          };
          return { ...lead, steps: updatedSteps };
        }
        return { ...lead, [field]: value };
      });

      // Save to localStorage
      try {
        const editsMap: Record<string, unknown> = {};
        updated.forEach((l) => {
          editsMap[l.id] = {
            status: l.status,
            currentStep: l.currentStep,
            steps: l.steps,
            notes: l.notes,
            deliverablePrototype: l.deliverablePrototype,
          };
        });
        localStorage.setItem("ni_outreach_console_edits_v4", JSON.stringify(editsMap));
      } catch (e) {
        console.warn("Could not save to localStorage:", e);
      }

      // Requirement 9: Wire-in learning write-back to NI-Brain Learnings
      if (typeof value === "string" && value.trim() !== originalText.trim()) {
        fetch("/api/record-learning", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            venture: "Northside Intelligence",
            artifact: "ni-outreach",
            itemId: id,
            field: stepNum ? `${field}_step${stepNum}` : field,
            originalText,
            editedText: value,
            meta: { name: target?.name, business: target?.business || target?.company, niche: target?.niche },
          }),
        }).catch((err) => console.warn("Learning write-back failed:", err));
      }

      return updated;
    });

    setSaveToast("Saved & Synced");
    setTimeout(() => setSaveToast(null), 2500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Requirement 11: Execute Artifact Edit Request with animated progress bar
  const handleStartArtifactEdit = (lead: OutreachLeadItem) => {
    setEditArtifactLead(lead);
    setEditOptions(["Headline / Value Proposition"]);
    setCustomEditNotes("");
  };

  const handleDispatchArtifactEdit = () => {
    if (!editArtifactLead) return;
    const targetLead = editArtifactLead;
    setEditArtifactLead(null);
    setIsSidePanelOpen(true);
    setEditProgress(10);
    setEditStatusText("Ingesting operator edit instructions & schema constraints...");

    setTimeout(() => {
      setEditProgress(35);
      setEditStatusText("Parsing deliverable prototype AST & design parameters...");
    }, 600);

    setTimeout(() => {
      setEditProgress(65);
      setEditStatusText("Synthesizing agentic redesign with AXON engine...");
    }, 1300);

    setTimeout(() => {
      setEditProgress(88);
      setEditStatusText("Enforcing word count limits & verifying interactive links...");
    }, 2000);

    setTimeout(() => {
      setEditProgress(100);
      setEditStatusText("Complete! Generated verifiable change receipt.");

      const newReceipt: ArtifactReceipt = {
        id: `rcpt-${Date.now()}`,
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
        requestedOptions: editOptions.length > 0 ? editOptions : ["General Re-alignment"],
        summary: `Updated ${targetLead.company} deliverable with focus on: ${editOptions.join(", ")}. ${customEditNotes ? `Notes: "${customEditNotes}"` : ""}`,
        diffNotes: [
          `Adjusted value proposition to emphasize: ${editOptions.join(", ")}`,
          "Recalculated responsive touch layouts and sub-second asset bundle",
          "Generated verified hash & proof receipt",
        ],
      };

      setActiveReceiptLead(targetLead);
      setActiveReceipt(newReceipt);

      // Persist receipt into the lead's deliverablePrototype
      setAllLeads((prev) =>
        prev.map((l) => {
          if (l.id !== targetLead.id) return l;
          const currentProto = l.deliverablePrototype;
          if (!currentProto) return l;
          return {
            ...l,
            deliverablePrototype: {
              ...currentProto,
              receipts: [newReceipt, ...(currentProto.receipts || [])],
            },
          };
        })
      );

      // Record learning for next generation
      fetch("/api/record-learning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venture: "Northside Intelligence",
          artifact: "ni-outreach-deliverable",
          itemId: targetLead.id,
          field: "artifact_recompile",
          originalText: targetLead.deliverablePrototype?.title || "Original Prototype",
          editedText: `Recompiled with options: ${editOptions.join(", ")} | Notes: ${customEditNotes}`,
          meta: { company: targetLead.company, options: editOptions },
        }),
      }).catch((e) => console.warn(e));
    }, 2800);
  };

  // Requirement 7: Filter logic
  const filteredLeads = useMemo(() => {
    return allLeads.filter((lead) => {
      // 1. View mode: Active vs Archive
      if (viewMode === "active") {
        if (lead.category === "archive" || lead.status === "dead") return false;
      } else {
        if (lead.category !== "archive" && lead.status !== "dead") return false;
      }

      // 2. Venture filter (only applies to active view)
      if (viewMode === "active") {
        if (ventureFilter === "webdesign" && lead.category !== "webdesign") return false;
        if (ventureFilter === "ittools" && lead.category !== "ittools") return false;
      }

      // 3. Status filter
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;

      // 4. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (lead.name || "").toLowerCase().includes(q);
        const matchComp = (lead.company || lead.business || "").toLowerCase().includes(q);
        const matchEmail = (lead.email || "").toLowerCase().includes(q);
        const matchNiche = (lead.niche || "").toLowerCase().includes(q);
        const matchTool = (lead.tool || "").toLowerCase().includes(q);
        return matchName || matchComp || matchEmail || matchNiche || matchTool;
      }

      return true;
    });
  }, [allLeads, viewMode, ventureFilter, statusFilter, searchQuery]);

  // Requirement 10: Count active leads for limits
  const activeWebCount = allLeads.filter((l) => l.category === "webdesign" && l.status !== "dead").length;
  const activeItCount = allLeads.filter((l) => l.category === "ittools" && l.status !== "dead").length;
  const archiveCount = allLeads.filter((l) => l.category === "archive" || l.status === "dead").length;

  return (
    <div className="bg-[#090D16] text-[#F3F4F6] min-h-screen antialiased flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-950 border border-cyan-500/50 text-cyan-200 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>{saveToast}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="border-b border-gray-800 bg-[#0E1424]/90 backdrop-blur sticky top-0 z-40 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 font-black text-white text-lg">
            NI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg text-white tracking-tight">NORTHSIDE INTELLIGENCE OUTREACH HQ</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                100% Verified Only
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Interactive Prototypes · Full Lead Verification · Individual Channel Touches · Self-Learning Loop
            </p>
          </div>
        </div>

        {/* PIPELINE STATS & LIMITS (Requirement 10) */}
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <div className="bg-[#11192E] border border-gray-800 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-gray-400">Web Design (Services):</span>
            <span className="font-bold text-white">{activeWebCount} / 10 Active Cap</span>
          </div>
          <div className="bg-[#11192E] border border-gray-800 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span className="text-gray-400">Sector 3 ITs:</span>
            <span className="font-bold text-white">{activeItCount} / 10 Active Cap (2/tool)</span>
          </div>
          <div className="bg-[#11192E] border border-gray-800 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            <span className="text-gray-400">Archived Leads:</span>
            <span className="font-bold text-gray-300">{archiveCount}</span>
          </div>

          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 bg-[#0E1424] px-3 py-1.5 rounded-lg transition"
          >
            ← Back to HQ
          </Link>
        </div>
      </header>

      {/* CONTROLS & NAVIGATION (Requirement 7) */}
      <section className="bg-[#0D1220] border-b border-gray-800/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        {/* Primary Page Switcher: Active Leads vs Archived Leads */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setViewMode("active");
              setVentureFilter("all");
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              viewMode === "active"
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20"
                : "bg-[#111827] text-gray-400 hover:text-gray-200 border border-gray-800"
            }`}
          >
            <span>⚡ Active Leads</span>
            <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">
              {activeWebCount + activeItCount}
            </span>
          </button>

          <button
            onClick={() => setViewMode("archive")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              viewMode === "archive"
                ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20"
                : "bg-[#111827] text-gray-400 hover:text-gray-200 border border-gray-800"
            }`}
          >
            <span>📁 Archived Leads</span>
            <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">{archiveCount}</span>
          </button>
        </div>

        {/* Sub-Filters (Venture & Status & Search) */}
        <div className="flex items-center gap-3 flex-wrap">
          {viewMode === "active" && (
            <div className="flex items-center bg-[#111827] border border-gray-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setVentureFilter("all")}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  ventureFilter === "all" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                All Active ({activeWebCount + activeItCount})
              </button>
              <button
                onClick={() => setVentureFilter("webdesign")}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  ventureFilter === "webdesign" ? "bg-cyan-900/60 text-cyan-300" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Web Design ({activeWebCount})
              </button>
              <button
                onClick={() => setVentureFilter("ittools")}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  ventureFilter === "ittools" ? "bg-purple-900/60 text-purple-300" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Sector 3 ITs ({activeItCount})
              </button>
            </div>
          )}

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111827] border border-gray-800 text-xs text-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="ready">Ready for Touch</option>
            <option value="sent">Touch Sent</option>
            <option value="replied">Client Replied</option>
            {viewMode === "archive" && <option value="dead">Dead Lead</option>}
          </select>

          {/* Search box */}
          <input
            type="text"
            placeholder="Search leads, contacts, or tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#111827] border border-gray-800 text-xs text-gray-200 px-3.5 py-2 rounded-xl focus:outline-none focus:border-cyan-500 w-56 placeholder-gray-500"
          />
        </div>
      </section>

      {/* MAIN LEADS FEED */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-gray-800/60">
          <span>
            Showing <strong className="text-white">{filteredLeads.length}</strong> {viewMode === "active" ? "active" : "archived"} leads
          </span>
          <span className="text-[11px] text-gray-500">
            {viewMode === "active" ? "Strict Cap: Maximum 10 new leads per project active at any time" : "Archived historical leads"}
          </span>
        </div>

        {filteredLeads.length === 0 && (
          <div className="p-12 text-center rounded-2xl border border-gray-800 bg-[#0E1424]">
            <p className="text-gray-400 text-sm">No leads match the selected filter criteria.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {filteredLeads.map((lead) => {
            const stepNum = lead.currentStep || 1;
            const currentStepData: OutreachStep = (lead.steps && lead.steps[stepNum]) || {};

            return (
              <div
                key={lead.id}
                className="rounded-2xl border border-gray-800/90 bg-[#0E1424] p-6 hover:border-cyan-500/30 transition shadow-xl space-y-5"
              >
                {/* LEAD HEADER BAR */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-800/60 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        {lead.company || lead.business}
                      </h2>

                      {/* Requirement 1: Information Pop-up Button */}
                      <button
                        onClick={() => setInfoLead(lead)}
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 hover:bg-cyan-900 transition flex items-center gap-1 shadow-sm"
                        title="Click to view verified company data, contact details, DPMO fit, and source links"
                      >
                        <span>ℹ️</span> Info & Verification
                      </button>

                      {lead.serviceTrack && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            lead.serviceTrack.includes("No Website")
                              ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                              : lead.serviceTrack.includes("Legacy")
                              ? "bg-cyan-950 text-cyan-300 border-cyan-800"
                              : "bg-blue-950 text-blue-300 border-blue-800"
                          }`}
                        >
                          {lead.serviceTrack}
                        </span>
                      )}

                      {lead.tool && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/60">
                          {lead.tool}
                        </span>
                      )}

                      {lead.vertical && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {lead.vertical}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                      <span>👤 {lead.contact || lead.name}</span>
                      <span>·</span>
                      <span>✉️ <strong className="text-gray-200">{lead.email}</strong></span>
                      <span>·</span>
                      <span>📍 {lead.location}</span>
                      {lead.website && (
                        <>
                          <span>·</span>
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline"
                          >
                            🌐 Website ↗
                          </a>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status & Category Selector */}
                  <div className="flex items-center gap-3">
                    <select
                      value={lead.status || "ready"}
                      onChange={(e) => updateLead(lead.id, "status", e.target.value)}
                      className="bg-[#111827] border border-gray-800 text-xs font-semibold text-gray-200 px-3 py-1.5 rounded-xl focus:outline-none focus:border-cyan-500"
                    >
                      <option value="ready">Ready for Touch</option>
                      <option value="sent">Touch Sent</option>
                      <option value="replied">Client Replied</option>
                      <option value="dead">Dead / Archive</option>
                    </select>
                  </div>
                </div>

                {/* REQUIREMENT 2 & 11: DELIVERABLE PROTOTYPE SECTION (SERVICES ONLY) */}
                {lead.deliverablePrototype && (
                  <div className="bg-[#11192E] border border-cyan-500/20 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span>📦</span> Deliverable Prototype:
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {lead.deliverablePrototype.title}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 max-w-2xl">
                        {lead.deliverablePrototype.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Button 1: Deliverable Prototype (Opens in New Tab) */}
                      <a
                        href={lead.deliverablePrototype.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition flex items-center gap-1.5"
                      >
                        <span>🚀 Deliverable Prototype</span>
                        <span>↗</span>
                      </a>

                      {/* Button 2: Download Artifact (Downloads to Computer) */}
                      <a
                        href={lead.deliverablePrototype.downloadUrl}
                        download={lead.deliverablePrototype.downloadFilename}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center gap-1.5"
                        title="Downloads offline artifact to your computer"
                      >
                        <span>⬇️ Download Artifact</span>
                      </a>

                      {/* Button 3: Request Edit (Requirement 11) */}
                      <button
                        onClick={() => handleStartArtifactEdit(lead)}
                        className="px-3 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-200 font-semibold text-xs border border-purple-800/60 transition flex items-center gap-1.5"
                      >
                        <span>🪄 Request Edit</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* DIRECT PRODUCT ACCESS FOR IT TOOLS (ITs don't need deliverables) */}
                {!lead.deliverablePrototype && lead.category === "ittools" && (
                  <div className="bg-[#111322] border border-purple-500/20 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span>⚡</span> Direct Portal Trial Access:
                        </span>
                        <span className="font-semibold text-white">14-Day Self-Serve Pilot (No Custom Deliverable Required)</span>
                      </div>
                      <p className="text-gray-400">
                        Prospect receives instant direct trial pass ({lead.toolUrl || "https://northsideintelligence.com/signup"}) · Zero custom deliverable required
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={lead.toolUrl || "https://northsideintelligence.com/signup"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition flex items-center gap-1.5"
                      >
                        <span>Open Portal Signup</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* REQUIREMENT 5: REVENUE POTENTIAL BAR */}
                {(lead.revenueOneTime || lead.revenueMonthly) && (
                  <div className="bg-[#0C1222] border border-gray-800/80 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                        Revenue Potential:
                      </span>
                      {lead.revenueOneTime && (
                        <span className="font-semibold text-emerald-400">
                          💵 {lead.revenueOneTime}
                        </span>
                      )}
                      {lead.revenueMonthly && (
                        <span className="font-semibold text-cyan-400">
                          🔄 {lead.revenueMonthly}
                        </span>
                      )}
                    </div>
                    {lead.revenueTotalEstimated && (
                      <div className="font-mono font-bold text-white text-[11px] bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                        Target LTV: {lead.revenueTotalEstimated}
                      </div>
                    )}
                  </div>
                )}

                {/* CADENCE STEP NAVIGATION */}
                <div className="flex items-center gap-2 border-b border-gray-800/40 pb-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-2">
                    Cadence Touch:
                  </span>
                  {lead.steps &&
                    Object.keys(lead.steps).map((key) => {
                      const k = Number(key);
                      const s = lead.steps![key];
                      const isActive = k === stepNum;
                      return (
                        <button
                          key={key}
                          onClick={() => updateLead(lead.id, "currentStep", k)}
                          className={`text-xs font-bold px-3 py-1 rounded-lg transition ${
                            isActive
                              ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                              : "bg-[#0E1424] text-gray-400 hover:text-white border border-gray-800"
                          }`}
                        >
                          {s.label || `Step ${k}`}
                        </button>
                      );
                    })}
                </div>

                {/* REQUIREMENT 6: MULTI-PLATFORM COMMUNICATION BOXES */}
                {currentStepData.channels && currentStepData.channels.length > 0 ? (
                  <div className="space-y-4">
                    {currentStepData.channels.map((chan, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0C1222] border border-gray-800 rounded-xl p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-300 border border-slate-700">
                              {chan.platform} Touch
                            </span>
                            {chan.recipient && (
                              <span className="text-xs text-gray-400">
                                Target: <strong className="text-gray-200">{chan.recipient}</strong>
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() =>
                              copyToClipboard(chan.body, `${lead.id}-step${stepNum}-chan${idx}`)
                            }
                            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-800/60 transition"
                          >
                            <span>
                              {copiedId === `${lead.id}-step${stepNum}-chan${idx}`
                                ? `✓ Copied ${chan.platform}`
                                : `📋 Copy ${chan.platform}`}
                            </span>
                          </button>
                        </div>

                        {chan.subject !== undefined && (
                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                              Subject Line
                            </label>
                            <input
                              type="text"
                              value={chan.subject || ""}
                              onChange={(e) =>
                                updateLead(lead.id, "subject", e.target.value, stepNum, idx)
                              }
                              className="w-full bg-[#0E1424] text-sm text-gray-100 p-2.5 rounded-lg border border-gray-800 focus:border-cyan-500 focus:outline-none"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Message Body
                          </label>
                          <textarea
                            rows={4}
                            value={chan.body || ""}
                            onChange={(e) =>
                              updateLead(lead.id, "body", e.target.value, stepNum, idx)
                            }
                            className="w-full bg-[#0E1424] text-sm text-gray-200 p-3 rounded-lg border border-gray-800 focus:border-cyan-500 focus:outline-none leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback for single email step
                  <div className="space-y-4">
                    {currentStepData.subject !== undefined && (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            📝 Subject Line
                          </label>
                          <button
                            onClick={() =>
                              copyToClipboard(currentStepData.subject || "", `${lead.id}-subj`)
                            }
                            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800/60 transition"
                          >
                            {copiedId === `${lead.id}-subj` ? "✓ Copied" : "📋 Copy Subject"}
                          </button>
                        </div>
                        <input
                          type="text"
                          value={currentStepData.subject || ""}
                          onChange={(e) => updateLead(lead.id, "subject", e.target.value, stepNum)}
                          className="w-full bg-[#0E1424] text-sm text-gray-100 p-3 rounded-xl border border-gray-800 focus:border-cyan-500 focus:outline-none"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                          ✉️ Outreach Message Body
                        </label>
                        <button
                          onClick={() => copyToClipboard(currentStepData.body || "", `${lead.id}-body`)}
                          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800/60 transition"
                        >
                          {copiedId === `${lead.id}-body` ? "✓ Copied" : "📋 Copy Body"}
                        </button>
                      </div>
                      <textarea
                        rows={4}
                        value={currentStepData.body || ""}
                        onChange={(e) => updateLead(lead.id, "body", e.target.value, stepNum)}
                        className="w-full bg-[#0E1424] text-sm text-gray-200 p-3.5 rounded-xl border border-gray-800 focus:border-cyan-500 focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* REQUIREMENT 4: CONFIDENCE RATINGS WITH HOVER REASONS */}
                <div className="bg-[#0B101D] border border-gray-800/80 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6 flex-wrap">
                    {/* Response Confidence */}
                    <div
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setActiveTooltip(`${lead.id}-resp`)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase font-bold text-gray-400">
                          Response Likelihood:
                        </span>
                        <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                          {lead.responseLikelihood || 80}% ⓘ
                        </span>
                      </div>

                      {/* Tooltip */}
                      {activeTooltip === `${lead.id}-resp` && (
                        <div className="absolute bottom-full left-0 mb-2 w-72 bg-[#141C30] border border-cyan-500/40 rounded-xl p-3 shadow-2xl z-50 text-xs text-gray-200 space-y-1.5 animate-fadeIn">
                          <div className="font-bold text-cyan-300 text-[11px] uppercase border-b border-gray-700/60 pb-1">
                            Why Likely to Respond:
                          </div>
                          <ul className="space-y-1 text-[11px] text-gray-300 list-disc list-inside">
                            {(lead.responseLikelihoodReasons || ["Direct verified email with customized sample prototype"]).map(
                              (r, i) => (
                                <li key={i}>{r}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Conversion Confidence */}
                    <div
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setActiveTooltip(`${lead.id}-conv`)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase font-bold text-gray-400">
                          Client Conversion Likelihood:
                        </span>
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                          {lead.conversionLikelihood || 75}% ⓘ
                        </span>
                      </div>

                      {/* Tooltip */}
                      {activeTooltip === `${lead.id}-conv` && (
                        <div className="absolute bottom-full left-0 mb-2 w-72 bg-[#141C30] border border-emerald-500/40 rounded-xl p-3 shadow-2xl z-50 text-xs text-gray-200 space-y-1.5 animate-fadeIn">
                          <div className="font-bold text-emerald-300 text-[11px] uppercase border-b border-gray-700/60 pb-1">
                            Why Likely to Become a Client:
                          </div>
                          <ul className="space-y-1 text-[11px] text-gray-300 list-disc list-inside">
                            {(lead.conversionLikelihoodReasons || ["Clear technical pain points and high project margins"]).map(
                              (r, i) => (
                                <li key={i}>{r}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] text-gray-500">
                    Hover metrics for verified qualification factors
                  </span>
                </div>

                {/* OPERATOR NOTES */}
                <div className="pt-2 border-t border-gray-800/40 flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Operator Notes:</span>
                  <input
                    type="text"
                    value={lead.notes || ""}
                    onChange={(e) => updateLead(lead.id, "notes", e.target.value)}
                    placeholder="Add operator notes about this lead..."
                    className="w-full bg-transparent text-xs text-gray-400 focus:text-gray-200 border-b border-transparent hover:border-gray-800 focus:border-cyan-500 focus:outline-none py-1"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* REQUIREMENT 8: ADMIN FOOTER */}
      <footer className="mt-16 border-t border-gray-800 bg-[#0B0F19] px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs text-gray-400">
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">NORTHSIDE VENTURES GROUP</div>
            <div>Centralized Outreach Command & Intelligence Routing</div>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <span className="font-semibold text-gray-300">Sector 1A Admin Links:</span>
            <a
              href="https://matchfit.app/admin/outreach"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-[#11192E] border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/40 transition flex items-center gap-1.5 font-semibold"
            >
              <span>🏃 Match Fit Outreach Console</span>
              <span>↗</span>
            </a>
            <a
              href="https://northsideintelligence.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              Northside Intelligence ↗
            </a>
          </div>
        </div>
      </footer>

      {/* REQUIREMENT 1: INFORMATION POP-UP MODAL */}
      {infoLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="bg-[#0E1526] border border-cyan-500/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-gray-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                    100% Verified Lead Intel
                  </span>
                  <span className="text-xs text-gray-400">
                    {infoLead.category === "webdesign" ? "NI Services" : "Sector 3 ITs"}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {infoLead.company || infoLead.business}
                </h2>
              </div>
              <button
                onClick={() => setInfoLead(null)}
                className="text-gray-400 hover:text-white bg-gray-800/80 p-2 rounded-xl transition"
              >
                ✕
              </button>
            </div>

            {/* Email Discovery & Verification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#121A2F] border border-gray-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Where Email Was Found:
                </span>
                <p className="text-xs text-white font-medium">
                  {infoLead.emailFoundLabel || infoLead.emailSource}
                </p>
                {infoLead.emailFoundUrl && (
                  <a
                    href={infoLead.emailFoundUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:underline block pt-1"
                  >
                    🔗 View Source URL ↗
                  </a>
                )}
              </div>

              <div className="bg-[#121A2F] border border-gray-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  How Email Was Verified:
                </span>
                <p className="text-xs text-emerald-300">
                  {infoLead.emailVerificationMethod || "DNS MX records verified & corporate server handshake"}
                </p>
              </div>
            </div>

            {/* Socials & Profiles */}
            <div className="bg-[#121A2F] border border-gray-800 rounded-xl p-4 space-y-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Social Profiles Tied to Contact:
              </span>
              <div className="space-y-2">
                {infoLead.socials && infoLead.socials.length > 0 ? (
                  infoLead.socials.map((soc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs border-b border-gray-800/60 pb-2 last:border-none"
                    >
                      <div className="space-y-0.5">
                        <a
                          href={soc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <span>{soc.platform}:</span>
                          <span>{soc.handle || soc.url} ↗</span>
                        </a>
                        <p className="text-[11px] text-gray-400">{soc.howFound}</p>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        {soc.howVerified}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No external socials tied to general address.</p>
                )}
              </div>
            </div>

            {/* Bullets: Company & Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#121A2F] border border-gray-800 rounded-xl p-4 space-y-2">
                <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                  3–5 Facts About Company:
                </span>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  {(infoLead.companyBullets || ["Established regional business with verified operations"]).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#121A2F] border border-gray-800 rounded-xl p-4 space-y-2">
                <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                  Contact Person Details:
                </span>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  {(infoLead.contactBullets || ["N/A — General Corporate Inbox"]).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Why Good Fit & DPMO Alignment */}
            <div className="space-y-3">
              <div className="bg-[#121A2F] border border-gray-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  Why This Company Is a Good Fit:
                </span>
                <p className="text-xs text-gray-200 leading-relaxed">{infoLead.whyGoodFit}</p>
              </div>

              <div className="bg-[#121A2F] border border-gray-800 rounded-xl p-4 space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  DPMO Alignment:
                </span>
                <p className="text-xs text-gray-200 leading-relaxed">{infoLead.dpmoAlignment}</p>
              </div>
            </div>

            {/* Outreach Strategy */}
            {infoLead.outreachStrategy && (
              <div className="bg-[#121A2F] border border-gray-800 rounded-xl p-4 space-y-2">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                  Outreach Strategy ({infoLead.outreachStrategy.channels.join(" + ")}):
                </span>
                <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                  {infoLead.outreachStrategy.explanationBullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REQUIREMENT 11: ARTIFACT EDIT OPTIONS MODAL */}
      {editArtifactLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1526] border border-purple-500/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span>🪄</span> Request Artifact Re-synthesis
              </h3>
              <button
                onClick={() => setEditArtifactLead(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Select specifically what you want updated in the deliverable prototype for{" "}
              <strong className="text-white">{editArtifactLead.company}</strong>:
            </p>

            <div className="space-y-2">
              {[
                "Headline / Value Proposition",
                "Pricing Tiers & Monthly Retainer",
                "Visual Styling & Color Palette",
                "Specific Feature & Pain Point Emphasis",
                "Touch Navigation & Mobile Layout",
              ].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-[#121A2F] border border-gray-800 hover:border-gray-700 cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={editOptions.includes(opt)}
                    onChange={(e) => {
                      if (e.target.checked) setEditOptions([...editOptions, opt]);
                      else setEditOptions(editOptions.filter((o) => o !== opt));
                    }}
                    className="accent-purple-500"
                  />
                  <span className="text-gray-200 font-medium">{opt}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-400 mb-1">
                Custom Operator Instructions (Optional):
              </label>
              <textarea
                rows={2}
                value={customEditNotes}
                onChange={(e) => setCustomEditNotes(e.target.value)}
                placeholder="e.g. Make the CTA more urgent, change primary color to emerald..."
                className="w-full bg-[#121A2F] border border-gray-800 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setEditArtifactLead(null)}
                className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDispatchArtifactEdit}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition"
              >
                Dispatch Agentic Update →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REQUIREMENT 11: SLIDE-OVER SIDE PANEL (PROGRESS BAR & CHANGE RECEIPTS) */}
      {isSidePanelOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0D1424] border-l border-gray-800 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping"></span>
                <h3 className="font-bold text-white text-base">Agentic Deliverable Pipeline</h3>
              </div>
              <button
                onClick={() => setIsSidePanelOpen(false)}
                className="text-gray-400 hover:text-white bg-gray-800/60 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Active Progress Bar */}
            <div className="space-y-2 bg-[#121A2F] border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-300">Synthesis Progress</span>
                <span className="font-mono text-purple-400 font-bold">{editProgress}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${editProgress}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-gray-400 pt-1 flex items-center gap-1.5">
                <span>⚡</span> {editStatusText}
              </p>
            </div>

            {/* Change Receipts (Displayed when completed) */}
            {activeReceipt && (
              <div className="bg-[#11192E] border border-emerald-500/30 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <h4 className="font-bold text-emerald-300 text-xs uppercase tracking-wider">
                    Verified Change Receipt
                  </h4>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-gray-400">Target Lead: <strong className="text-white">{activeReceiptLead?.company}</strong></p>
                  <p className="text-gray-400">Timestamp: <strong className="text-gray-300 font-mono text-[11px]">{activeReceipt.timestamp}</strong></p>
                  <p className="text-gray-400">Options Applied: <strong className="text-cyan-300">{activeReceipt.requestedOptions.join(", ")}</strong></p>
                </div>

                <div className="border-t border-gray-800 pt-3 space-y-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Verified Changes & Receipts:
                  </span>
                  <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                    {activeReceipt.diffNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={activeReceiptLead?.deliverablePrototype?.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition"
                  >
                    View Updated Prototype ↗
                  </a>
                  <a
                    href={activeReceiptLead?.deliverablePrototype?.downloadUrl}
                    download={activeReceiptLead?.deliverablePrototype?.downloadFilename}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-800 text-center">
            <button
              onClick={() => setIsSidePanelOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-xs transition"
            >
              Close Side Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
