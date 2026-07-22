import { BIO } from "@/data/ventures";

export function BioSection() {
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
        <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft">
          {BIO.founderBio}
        </p>
      </div>
      <div>
        <p className="font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.22em] text-signal uppercase">
          Co-founders
        </p>
        <h2 className="brand-display mt-2 text-3xl text-ink">Acknowledgements</h2>
        <ul className="mt-5 space-y-2 text-[0.95rem] leading-relaxed text-ink-soft">
          {BIO.cofounders.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm italic text-ink-soft">{BIO.cofoundersNote}</p>
      </div>
    </section>
  );
}
