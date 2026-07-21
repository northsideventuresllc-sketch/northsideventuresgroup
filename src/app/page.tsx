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

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <Image
              src={SITE.logo}
              alt=""
              width={64}
              height={64}
              className="mb-6 h-14 w-14 sm:h-16 sm:w-16"
              priority
            />
            <h1 className="brand-display max-w-4xl text-[clamp(2.8rem,9vw,6.5rem)] text-ink">
              {SITE.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {SITE.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/projects" className="cta-see-all">
                See all projects
              </Link>
            </div>
          </div>
        </section>

        {/* Brief overview */}
        <section className="mx-auto max-w-3xl px-5 py-8 sm:px-10">
          <p className="text-lg leading-relaxed text-ink sm:text-xl">
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

        <LogoBanner items={bannerItems} />

        <footer className="flex flex-col items-center gap-6 px-5 py-16 text-center">
          <ContactButton />
          <p className="text-xs tracking-wide text-ink-soft">
            © {new Date().getFullYear()} {SITE.legalName}
          </p>
        </footer>
      </main>
    </div>
  );
}
