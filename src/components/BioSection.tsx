"use client";

import { useState } from "react";
import { BIO } from "@/data/ventures";

function Chevron() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="accordion-chevron"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccordionRow({
  id,
  isOpen,
  onToggle,
  title,
  children,
}: {
  id: string;
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  children: string;
}) {
  return (
    <div className={`accordion-item ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="accordion-trigger"
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
      >
        <span className="font-[family-name:var(--font-display)] font-semibold text-ink">
          {title}
        </span>
        <Chevron />
      </button>
      <div className="accordion-panel" id={`${id}-panel`}>
        <div className="accordion-panel-inner">
          <p className="pb-4 text-[0.95rem] leading-relaxed text-ink-soft">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}

function useOpenSet(initial: number[] = []) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(initial));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  return [open, toggle] as const;
}

export function BioSection() {
  const [openFounder, toggleFounder] = useOpenSet([0]);
  const [openCofounder, toggleCofounder] = useOpenSet();

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-16 sm:grid-cols-2 sm:px-10">
      <div>
        <p className="font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.22em] text-signal uppercase">
          Founder
        </p>
        <h2 className="brand-display mt-2 text-3xl text-ink">
          {BIO.founderName}
        </h2>
        <p className="mt-1 text-sm text-teal">{BIO.founderTitle}</p>
        <div className="mt-5">
          {BIO.founderSections.map((section, i) => (
            <AccordionRow
              key={section.heading}
              id={`founder-${i}`}
              isOpen={openFounder.has(i)}
              onToggle={() => toggleFounder(i)}
              title={section.heading}
            >
              {section.body}
            </AccordionRow>
          ))}
        </div>
      </div>
      <div>
        <p className="font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.22em] text-signal uppercase">
          Co-founders
        </p>
        <h2 className="brand-display mt-2 text-3xl text-ink">Acknowledgements</h2>
        <div className="mt-5">
          {BIO.cofounders.map((person, i) => (
            <AccordionRow
              key={person.name}
              id={`cofounder-${i}`}
              isOpen={openCofounder.has(i)}
              onToggle={() => toggleCofounder(i)}
              title={person.name}
            >
              {person.contribution}
            </AccordionRow>
          ))}
        </div>
        <p className="mt-5 text-sm italic text-ink-soft">{BIO.cofoundersNote}</p>
      </div>
    </section>
  );
}
