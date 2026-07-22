import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { HoloCarousel } from "@/components/HoloCarousel";
import { LogoBanner } from "@/components/LogoBanner";
import { BioSection } from "@/components/BioSection";
import { ContactButton } from "@/components/ContactButton";
import {
  SITE,
  getBannerItems,
  getCarouselItems,
} from "@/data/ventures";

export default function HomePage() {
  const carouselItems = getCarouselItems();
  const bannerItems = getBannerItems();

  return (
    <div className="atmosphere min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero — brand first, one composition */}
        <section className="relative flex min-h-[78vh] flex-col justify-end px-5 pb-16 pt-10 sm:px-10 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute inset-x-0 top-[12%] mx-auto h-[55vh] max-w-6xl opacity-80">
              <div
                className="h-full w-full"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(79,199,255,0.22), transparent 70%), radial-gradient(ellipse 40% 30% at 70% 30%, rgba(191,232,255,0.14), transparent 60%)",
                }}
              />
            </div>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <Image
              src="/hero-skyline.svg"
              alt=""
              width={960}
              height={240}
              className="mb-4 w-full max-w-3xl sm:mb-6"
              priority
            />
            <h1 className="brand-display max-w-4xl uppercase text-[clamp(2.8rem,9vw,6.5rem)] text-ink">
              {SITE.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {SITE.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <Link href="/projects" className="cta-see-all">
                See all projects
              </Link>
            </div>
          </div>
        </section>

        {/* Mission statement */}
        <section className="mx-auto max-w-3xl px-5 py-8 text-center sm:px-10">
          <p className="font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.22em] text-teal uppercase">
            Mission Statement
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink sm:text-xl">
            {SITE.overview}
          </p>
        </section>

        <HoloCarousel items={carouselItems} minMs={3000} maxMs={5000} />

        <div className="mx-auto flex max-w-5xl justify-center px-5 pb-6 sm:px-10">
          <Link href="/projects" className="cta-see-all">
            See all projects
          </Link>
        </div>

        <BioSection />

        {/* Portfolio of ventures — leads into the scrolling logo banner */}
        <section className="mx-auto max-w-3xl px-5 pb-8 pt-16 text-center sm:px-10">
          <p className="font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.22em] text-teal uppercase">
            Portfolio of Ventures
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Intelligence products, community foundations, and creator
            ventures under one house — including{" "}
            <strong className="text-ink">The Northside Foundation Inc.</strong>
            , NVG&rsquo;s nonprofit affiliate that carries the group&rsquo;s
            community and impact work.
          </p>
        </section>

        <LogoBanner items={bannerItems} />

        <footer className="flex flex-col items-center gap-6 px-5 py-16 text-center">
          <ContactButton />
          <p className="text-xs uppercase tracking-wide text-ink-soft">
            © {new Date().getFullYear()} {SITE.legalName}
          </p>
        </footer>
      </main>
    </div>
  );
}
