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
      // Clipboard API unavailable — nothing further to fall back to here.
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

            <p
              id="contact-portal-heading"
              className="brand-display text-3xl font-bold uppercase tracking-wide text-teal sm:text-4xl"
            >
              Get in touch
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Contact us for all inquiries
            </p>

            <a
              href={mailHref}
              className="cta-contact mt-6 w-full justify-center"
            >
              Email JB
              <span aria-hidden="true">↗</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="cta-secondary mt-3 w-full justify-center"
            >
              {copied ? "Copied" : "Copy Email"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
