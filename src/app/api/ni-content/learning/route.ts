import { NextResponse } from "next/server";

const SUPABASE_URL = "https://kxijunwgbrlfzvgkhklo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_-JPXXSn9eyX9BxdvIzTulw_QkHPIERR";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      signalType = "EDIT_DIFF",
      brandSlug = "ni",
      originalText = null,
      editedText = null,
      metaJson = {},
      postId = null,
    } = body;

    // Allowed signal types per DB constraint:
    // 'EDIT_DIFF', 'POSTED', 'HASHTAG_RESEARCH', 'SOCIAL_SCAN', 'MEDIA_GENERATED', 'MEDIA_UPLOADED', 'APPROVED_FOR_POSTING', 'WEBSITE_SCAN', 'DAY_APPROVAL_MEMO'
    const allowedTypes = [
      "EDIT_DIFF",
      "POSTED",
      "HASHTAG_RESEARCH",
      "SOCIAL_SCAN",
      "MEDIA_GENERATED",
      "MEDIA_UPLOADED",
      "APPROVED_FOR_POSTING",
      "WEBSITE_SCAN",
      "DAY_APPROVAL_MEMO",
    ];

    const safeSignalType = allowedTypes.includes(signalType) ? signalType : "EDIT_DIFF";

    const payload = {
      signal_type: safeSignalType,
      brand_slug: brandSlug,
      original_text: originalText ? String(originalText).slice(0, 8000) : null,
      edited_text: editedText ? String(editedText).slice(0, 8000) : null,
      meta_json: metaJson,
      post_id: postId,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/ni_content_learning_signals`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[ni-content learning] Supabase error:", errText);
      return NextResponse.json({ error: "Failed to persist signal", details: errText }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, signal: data[0] || null });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[ni-content learning] Route exception:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/ni_content_learning_signals?order=created_at.desc&limit=20`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ signals: [] });
    }

    const signals = await res.json();
    return NextResponse.json({ signals });
  } catch {
    return NextResponse.json({ signals: [] });
  }
}
