import Image from "next/image";
import type { VentureNode } from "@/data/ventures";

type Props = {
  items: VentureNode[];
};

export function LogoBanner({ items }: Props) {
  if (!items.length) return null;

  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <div className="logo-banner" aria-label="All Northside projects scrolling banner">
      <div className="logo-track">
        {loop.map((item, i) => (
          <BannerItem key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function BannerItem({ item }: { item: VentureNode }) {
  const content = (
    <span className="flex items-center gap-3 whitespace-nowrap opacity-90 transition hover:opacity-100">
      <Image
        src={item.logo}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 object-contain brightness-0 invert"
      />
      <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide">
        {item.name}
      </span>
    </span>
  );

  if (item.href && item.status !== "placeholder") {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
