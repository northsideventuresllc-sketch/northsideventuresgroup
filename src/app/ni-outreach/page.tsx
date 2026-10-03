"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  INITIAL_FOLLOWUPS,
  INITIAL_WEBDESIGN,
  INITIAL_ITTOOLS,
  OutreachLeadItem,
} from "@/data/ni-outreach-data";

export default function NiOutreachPage() {
  const [allLeads, setAllLeads] = useState<OutreachLeadItem[]>([
    ...INITIAL_FOLLOWUPS.map((l) => ({ ...l, category: "followup" })),
    ...INITIAL_WEBDESIGN.map((l) => ({ ...l, category: "webdesign" })),
    ...INITIAL_ITTOOLS.map((l) => ({ ...l, category: "ittools" })),
  ]);
  const [activeTab, setActiveTab] = useState<"followup" | "webdesign" | "ittools">("webdesign");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Restore edits from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ni_outreach_console_edits_v2");
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

  const updateLead = (id: string, field: string, value: unknown, stepNum?: number) => {
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
          };
        });
        localStorage.setItem("ni_outreach_console_edits_v2", JSON.stringify(editsMap));
      } catch (e) {
        console.warn("Could not save to localStorage:", e);
      }

      // Fire write-back to NI-Brain Learnings
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
            meta: { name: target?.name, business: target?.business, niche: target?.niche },
          }),
        }).catch((err) => console.warn("Learning write-back failed:", err));
      }

      return updated;
    });

    setSaveToast("Saved & Synced");
    setTimeout(() => setSaveToast(null), 2000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const countWords = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const currentTabLeads = useMemo(() => {
    return allLeads.filter((l) => {
      if (l.category !== activeTab) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          (l.name || "").toLowerCase().includes(q) ||
          (l.business || l.company || "").toLowerCase().includes(q) ||
          (l.niche || "").toLowerCase().includes(q) ||
          (l.contact || l.email || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allLeads, activeTab, statusFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      followup: allLeads.filter((l) => l.category === "followup").length,
      webdesign: allLeads.filter((l) => l.category === "webdesign").length,
      ittools: allLeads.filter((l) => l.category === "ittools").length,
    };
  }, [allLeads]);

  const statusColors: Record<string, string> = {
    new: "bg-gray-800 text-gray-300 border-gray-700",
    ready: "bg-cyan-950 text-cyan-300 border-cyan-800",
    sent: "bg-emerald-950 text-emerald-300 border-emerald-800",
    replied: "bg-purple-950 text-purple-300 border-purple-800",
    dead: "bg-rose-950 text-rose-300 border-rose-800",
  };

  return (
    <div className="min-h-screen bg-[#070A10] text-[#F1F5F9] font-sans antialiased selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-[#0B0F19]/90 backdrop-blur px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-cyan-500/20">
            NI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg tracking-tight text-white">
                NORTHSIDE INTELLIGENCE OUTREACH HQ
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Live In-Place Editing
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Locked Standards (Decision #2065) · 50–125 Words · Click & Edit Any Subject, Body, or Lead Info
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveToast && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 animate-pulse">
              ✓ {saveToast}
            </span>
          )}
          <Link
            href="/ni-content"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 transition"
          >
            ← Content Calendar
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 transition"
          >
            Home
          </Link>
        </div>
      </header>

      {/* Tabs & Controls */}
      <div className="border-b border-gray-800/80 bg-[#090D16] px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {[
            { id: "followup", label: "Active Follow-Ups", count: counts.followup },
            { id: "webdesign", label: "Web Sites / Design", count: counts.webdesign },
            { id: "ittools", label: "Sector 3 IT Tools", count: counts.ittools },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "followup" | "webdesign" | "ittools")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20"
                  : "bg-gray-900/80 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-[10px]">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search leads, niche, contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0E1424] text-xs text-gray-200 px-3 py-1.5 rounded-lg border border-gray-800 focus:border-cyan-500 focus:outline-none w-60"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0E1424] text-xs text-gray-300 px-3 py-1.5 rounded-lg border border-gray-800 focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="ready">Ready</option>
            <option value="sent">Sent</option>
            <option value="replied">Replied</option>
            <option value="dead">Dead Lead</option>
          </select>
        </div>
      </div>

      {/* Main Leads List */}
      <main className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {currentTabLeads.map((lead) => {
            const stepNum = lead.currentStep || 1;
            const currentStepData = lead.steps?.[stepNum] || { subject: "", body: "", label: "" };
            const words = countWords(currentStepData.body || "");
            const isWordCountCompliant = words >= 50 && words <= 125;

            return (
              <div
                key={lead.id}
                className="p-6 rounded-2xl bg-[#0B101D] border border-gray-800/80 shadow-md space-y-5"
              >
                {/* Lead Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                        {lead.group || lead.niche}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs font-semibold text-gray-400">{lead.channel}</span>
                    </div>
                    <h2 className="font-extrabold text-lg text-white tracking-tight">
                      {lead.business || lead.company || "Prospective Partner"}
                    </h2>
                    <p className="text-xs text-gray-400">
                      Contact: <span className="text-gray-200 font-semibold">{lead.name || lead.contact || "Team"}</span> ({lead.contact || lead.email || "No direct email"})
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status Dropdown */}
                    <select
                      value={lead.status || "new"}
                      onChange={(e) => updateLead(lead.id, "status", e.target.value)}
                      className={`text-xs font-bold uppercase rounded-lg px-3 py-1.5 border cursor-pointer ${
                        statusColors[lead.status || "new"] || "bg-gray-800 text-gray-400"
                      }`}
                    >
                      <option value="new">New Lead</option>
                      <option value="ready">Ready to Send</option>
                      <option value="sent">Sent</option>
                      <option value="replied">Replied</option>
                      <option value="dead">Dead Lead</option>
                    </select>

                    {lead.profileUrl && (
                      <a
                        href={lead.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-cyan-400 hover:text-cyan-300 transition"
                      >
                        Profile ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Step Selector Ribbon */}
                <div className="flex items-center gap-2 border-b border-gray-800/60 pb-3">
                  <span className="text-xs text-gray-400 font-semibold mr-2">Sequence Step:</span>
                  {Object.entries(lead.steps || {}).map(([key, s]) => {
                    const k = Number(key);
                    const isActive = k === stepNum;
                    return (
                      <button
                        key={key}
                        onClick={() => updateLead(lead.id, "currentStep", k)}
                        className={`text-xs font-bold px-3 py-1 rounded-lg transition ${
                          isActive
                            ? "bg-cyan-600 text-white"
                            : "bg-[#0E1424] text-gray-400 hover:text-white border border-gray-800"
                        }`}
                      >
                        {s.label || `Step ${k}`}
                      </button>
                    );
                  })}
                </div>

                {/* Subject & Body Editor */}
                <div className="space-y-4">
                  {currentStepData.subject !== undefined && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                          Subject Line
                        </label>
                        <button
                          onClick={() => copyToClipboard(currentStepData.subject || "", `${lead.id}-subj`)}
                          className="text-[11px] text-cyan-400 hover:underline"
                        >
                          {copiedId === `${lead.id}-subj` ? "✓ Copied" : "Copy Subject"}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={currentStepData.subject || ""}
                        onChange={(e) => updateLead(lead.id, "subject", e.target.value, stepNum)}
                        className="w-full bg-[#0E1424] text-sm text-gray-100 p-2.5 rounded-lg border border-gray-800 focus:border-cyan-500 focus:outline-none font-medium"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                          Outreach Body (50–125 Words Standard)
                        </label>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                            isWordCountCompliant
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                              : "bg-amber-950 text-amber-300 border border-amber-800"
                          }`}
                        >
                          {words} words {isWordCountCompliant ? "✓ Compliant" : "(Target: 50–125)"}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(currentStepData.body || "", `${lead.id}-body`)}
                        className="text-xs font-bold text-cyan-400 hover:underline"
                      >
                        {copiedId === `${lead.id}-body` ? "✓ Copied Body" : "Copy Body"}
                      </button>
                    </div>
                    <textarea
                      rows={4}
                      value={currentStepData.body || ""}
                      onChange={(e) => updateLead(lead.id, "body", e.target.value, stepNum)}
                      className="w-full bg-[#0E1424] text-sm text-gray-200 p-3 rounded-lg border border-gray-800 focus:border-cyan-500 focus:outline-none leading-relaxed font-sans"
                    />
                  </div>
                </div>

                {/* Lead Notes */}
                <div className="pt-2 border-t border-gray-800/40 flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Notes:</span>
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
    </div>
  );
}
