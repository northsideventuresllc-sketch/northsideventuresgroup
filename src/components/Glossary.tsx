import Image from "next/image";
import type { VentureNode } from "@/data/ventures";
import { SITE } from "@/data/ventures";

type Props = {
  tree: VentureNode[];
};

export function Glossary({ tree }: Props) {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <Image src={SITE.logo} alt={SITE.name} width={72} height={72} priority />
        <div>
          <h1 className="brand-display uppercase text-4xl text-ink sm:text-5xl">{SITE.name}</h1>
          <p className="mt-3 text-sm tracking-[0.18em] text-ink-soft uppercase">
            Project glossary
          </p>
        </div>
      </div>

      {tree.map((group) => (
        <section key={group.id} className="glossary-group">
          <GlossaryLine node={group} strong />
          <div className="ml-4 border-l border-ink/15 pl-5 sm:ml-8">
            {(group.children ?? []).map((child) => (
              <GlossaryLine key={child.id} node={child} nested />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function GlossaryLine({
  node,
  strong,
  nested,
}: {
  node: VentureNode;
  strong?: boolean;
  nested?: boolean;
}) {
  const nameClass = strong
    ? "font-[family-name:var(--font-display)] text-lg font-bold text-ink"
    : nested
      ? "font-[family-name:var(--font-display)] text-base font-semibold text-ink"
      : "text-ink";

  const label = (
    <>
      <Image
        src={node.logo}
        alt=""
        width={strong ? 40 : 28}
        height={strong ? 40 : 28}
        className="object-contain"
      />
      <span className="min-w-0">
        <span className={nameClass}>{node.name}</span>
        {node.blurb ? (
          <span className="mt-0.5 block text-xs text-ink-soft">{node.blurb}</span>
        ) : null}
      </span>
      <span className="justify-self-end">
        {node.status === "placeholder" || !node.href ? (
          <span className="placeholder-chip">Soon</span>
        ) : (
          <span className="font-[family-name:var(--font-display)] text-xs font-bold tracking-wider text-teal uppercase">
            Open ↗
          </span>
        )}
      </span>
    </>
  );

  if (node.href && node.status !== "placeholder") {
    return (
      <a
        className="glossary-row transition hover:bg-white/40"
        href={node.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  return <div className="glossary-row opacity-80">{label}</div>;
}
