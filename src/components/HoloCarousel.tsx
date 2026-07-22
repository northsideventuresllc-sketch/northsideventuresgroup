"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { VentureNode } from "@/data/ventures";

type Props = {
  items: VentureNode[];
  /** Random interval between min and max (ms) */
  minMs?: number;
  maxMs?: number;
};

function wrap(i: number, len: number) {
  return ((i % len) + len) % len;
}

export function HoloCarousel({ items, minMs = 3000, maxMs = 5000 }: Props) {
  const [index, setIndex] = useState(0);
  const len = items.length;

  useEffect(() => {
    if (len < 2) return;
    let timer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      const wait = minMs + Math.random() * (maxMs - minMs);
      timer = setTimeout(() => {
        setIndex((prev) => wrap(prev + 1, len));
        schedule();
      }, wait);
    };

    schedule();
    return () => clearTimeout(timer);
  }, [len, minMs, maxMs]);

  if (!len) return null;

  const prev = items[wrap(index - 1, len)];
  const current = items[index];
  const next = items[wrap(index + 1, len)];

  return (
    <section
      className="relative mx-auto w-full max-w-5xl px-4 py-10 sm:px-8"
      aria-roledescription="carousel"
      aria-label="Ventures holographic carousel"
    >
      <div className="mb-8 flex justify-center">
        <p className="max-w-sm text-center text-sm leading-relaxed text-ink-soft">
          Center link rotates every few seconds. Click any face to open the
          venture — or wait and watch the hologram shift.
        </p>
      </div>

      <div className="holo-stage relative mx-auto flex min-h-[280px] items-center justify-center sm:min-h-[320px]">
        {len > 1 && (
          <button
            type="button"
            className="holo-card is-side absolute left-0 z-10 hidden w-[28%] max-w-[180px] sm:block"
            style={{ ["--tilt" as string]: "28deg" }}
            onClick={() => setIndex(wrap(index - 1, len))}
            aria-label={`Previous: ${prev.name}`}
          >
            <CarouselFace item={prev} dim />
          </button>
        )}

        <div className="holo-card is-center relative z-20 w-[min(100%,300px)]">
          <CarouselFace item={current} featured />
        </div>

        {len > 1 && (
          <button
            type="button"
            className="holo-card is-side absolute right-0 z-10 hidden w-[28%] max-w-[180px] sm:block"
            style={{ ["--tilt" as string]: "-28deg" }}
            onClick={() => setIndex(wrap(index + 1, len))}
            aria-label={`Next: ${next.name}`}
          >
            <CarouselFace item={next} dim />
          </button>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setIndex(wrap(index - 1, len))}
          className="font-[family-name:var(--font-display)] text-sm font-bold text-ink-soft hover:text-teal"
          aria-label="Previous venture"
        >
          ←
        </button>
        <p className="text-center">
          <span className="font-[family-name:var(--font-display)] text-base font-bold text-ink">
            {current.name}
          </span>
          <span className="mt-1 block text-xs tracking-wide text-ink-soft">
            {index + 1} / {len}
            {current.status === "placeholder" ? " · soon" : ""}
          </span>
        </p>
        <button
          type="button"
          onClick={() => setIndex(wrap(index + 1, len))}
          className="font-[family-name:var(--font-display)] text-sm font-bold text-ink-soft hover:text-teal"
          aria-label="Next venture"
        >
          →
        </button>
      </div>
    </section>
  );
}

function CarouselFace({
  item,
  featured,
  dim,
}: {
  item: VentureNode;
  featured?: boolean;
  dim?: boolean;
}) {
  const inner = (
    <div
      className={`holo-shell flex flex-col items-center gap-4 px-6 py-8 ${
        dim ? "pointer-events-none" : ""
      }`}
    >
      <div
        className={`relative flex items-center justify-center ${
          featured ? "h-28 w-28" : "h-20 w-20"
        }`}
      >
        <Image
          src={item.logo}
          alt=""
          width={featured ? 112 : 80}
          height={featured ? 112 : 80}
          className="object-contain"
        />
      </div>
      <div className="text-center">
        <p
          className={`font-[family-name:var(--font-display)] font-bold tracking-tight text-ink ${
            featured ? "text-lg" : "text-sm"
          }`}
        >
          {item.name}
        </p>
        {featured && item.blurb ? (
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">{item.blurb}</p>
        ) : null}
        {featured && item.status === "placeholder" ? (
          <span className="placeholder-chip mt-3 inline-block">Coming soon</span>
        ) : null}
      </div>
    </div>
  );

  if (item.href && item.status !== "placeholder") {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <div aria-disabled="true">{inner}</div>;
}
