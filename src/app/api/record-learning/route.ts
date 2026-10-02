import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { venture, artifact, itemId, field, originalText, editedText, meta } = body;

    if (!editedText || originalText === editedText) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const supabaseUrl = process.env.SUPABASE_URL || "https://kxijunwgbrlfzvgkhklo.supabase.co";
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SERVICE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "sb_publishable_-JPXXSn9eyX9BxdvIzTulw_QkHPIERR";

    const cleanOrig = String(originalText).replace(/\s+/g, " ").trim();
    const cleanEdit = String(editedText).replace(/\s+/g, " ").trim();

    const truncatedOrig = cleanOrig.length > 80 ? cleanOrig.slice(0, 79) + "…" : cleanOrig;
    const truncatedEdit = cleanEdit.length > 140 ? cleanEdit.slice(0, 139) + "…" : cleanEdit;

    const learningText = `${venture || "Northside Intelligence"} ${artifact?.includes("outreach") ? "outreach" : "content"} edit (${field || "copy"}): prefer "${truncatedEdit}" over "${truncatedOrig}".`;

    const learningPayload = {
      learning: learningText,
      source: `northsideventuresgroup.com/${artifact || "artifact"}`,
      date: new Date().toISOString(),
      category: artifact?.includes("outreach") ? "outreach" : "content",
      project: venture?.toLowerCase().includes("match") ? "Match Fit" : "Northside Intelligence",
    };

    // 1. Insert into core Learnings table
    const resLearnings = await fetch(`${supabaseUrl}/rest/v1/Learnings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(learningPayload),
    });

    if (!resLearnings.ok) {
      const err = await resLearnings.text().catch(() => "");
      console.error("[record-learning] Learnings insert error:", resLearnings.status, err);
    }

    // 2. Insert into structured signals table if applicable
    if (artifact?.includes("content")) {
      await fetch(`${supabaseUrl}/rest/v1/ni_content_learning_signals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          signal_type: "EDIT_DIFF",
          brand_slug: meta?.brand || "ni",
          original_text: cleanOrig.slice(0, 8000),
          edited_text: cleanEdit.slice(0, 8000),
          meta_json: { field, itemId, artifact, ...(meta || {}) },
        }),
      }).catch((e) => console.warn("[record-learning] Signal insert warning:", e));
    }

    return NextResponse.json({ ok: true, saved: true });
  } catch (err: unknown) {
    console.error("[record-learning] Unhandled error:", err);
    return NextResponse.json({ ok: false, error: "Internal Error" }, { status: 500 });
  }
}
