"use client";

import { useEffect, useState } from "react";
import { CONTACT_EMAIL, SITE } from "@/data/ventures";

export function ContactButton() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Hello from the ${SITE.name} site`
  )}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the visible email text is the fallback.
    }
  };

  return (
    <>
      <button
        type="button"
        className="cta-contact"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        Contact
        <span aria-hidden="true">↗</span>
      </button>

      {open ? (
        <div
          className="contact-overlay"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="contact-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-portal-heading"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="contact-close"
              onClick={() => setOpen(false)}
              aria-label="Close contact"
            >
              ✕
            </button>

            <p className="font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.22em] text-teal uppercase">
              Get in touch
            </p>
            <h2
              id="contact-portal-heading"
              className="brand-display mt-2 text-2xl text-ink"
            >
              Reach Northside
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Ventures, press, or partnership inquiries — send a note directly
              to JB.
            </p>

            <a
              href={mailHref}
              className="cta-contact mt-6 w-full justify-center"
            >
              Email JB
              <span aria-hidden="true">↗</span>
            </a>

            <div className="contact-email-row">
              <span className="min-w-0 flex-1 truncate text-sm text-ink-soft">
                {CONTACT_EMAIL}
              </span>
              <button
                type="button"
                onClick={copyEmail}
                className="shrink-0 font-[family-name:var(--font-display)] text-xs font-bold tracking-wider text-teal uppercase hover:text-ice-soft"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
