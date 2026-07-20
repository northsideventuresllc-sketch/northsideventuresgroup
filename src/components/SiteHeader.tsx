import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/ventures";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-10">
      <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} home`}>
        <Image
          src={SITE.logo}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10"
          priority
        />
        <span className="brand-display hidden text-lg text-ink sm:inline">
          {SITE.shortName}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/projects" className="cta-see-all">
          See all projects
        </Link>
      </nav>
    </header>
  );
}
