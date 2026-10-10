"use client";

import { useState } from "react";

/**
 * Workstream 6 — 7-day free-trial promo banner (portal homepage).
 *
 * Date-gated client-side so it stops rendering automatically after
 * 2026-12-01 00:00 UTC, even if the page HTML was statically generated
 * while the promo was live.
 */
export const SEVEN_DAY_TRIAL_PROMO_END_TS = Date.parse("2026-12-01T00:00:00.000Z");

export function TrialPromoBanner() {
  const [active] = useState(() => Date.now() < SEVEN_DAY_TRIAL_PROMO_END_TS);
  if (!active) return null;

  return (
    <div
      role="status"
      className="relative z-20 border-b border-amber-300/25 bg-gradient-to-r from-amber-400/10 via-amber-300/15 to-amber-400/10"
    >
      <p className="mx-auto max-w-5xl px-5 py-2.5 text-center text-xs text-amber-100 sm:text-sm">
        <span className="font-bold uppercase tracking-widest text-amber-300">
          Limited-time offer
        </span>
        {" — "}
        <span className="font-bold">7-day free trial</span> on any Northside Intelligence
        subscription. Card required up front, nothing charged until the trial ends.
        <span className="font-semibold"> Ends Nov 30.</span>
      </p>
    </div>
  );
}
