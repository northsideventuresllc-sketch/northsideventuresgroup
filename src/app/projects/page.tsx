import type { Metadata } from "next";
import Link from "next/link";
import { Glossary } from "@/components/Glossary";
import { ContactButton } from "@/components/ContactButton";
import { SITE, VENTURE_TREE } from "@/data/ventures";

export const metadata: Metadata = {
  title: "All projects",
  description: `Glossary of every venture under ${SITE.name}.`,
};

export default function ProjectsPage() {
  return (
    <div className="atmosphere min-h-screen">
      <header className="flex items-center justify-between px-5 py-5 sm:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-ink-soft hover:text-teal"
        >
          ← Home
        </Link>
        <ContactButton />
      </header>

      <main>
        <Glossary tree={VENTURE_TREE} />
      </main>

      <footer className="px-5 py-12 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} {SITE.name}
      </footer>
    </div>
  );
}
