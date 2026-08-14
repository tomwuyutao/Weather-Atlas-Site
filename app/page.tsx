import { ProductMockup } from '../components/product-mockups';
import { ProductStory } from '../components/product-story';
import { appStoreUrl, SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      {/* No overflow ancestor here: desktop product story relies on native `position: sticky`. */}
      <main className="pt-[68px]">
        {/* Hero — the only large opening moment, anchored by a native-style product report. */}
        <section className="px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pb-32 lg:pt-28">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="max-w-[570px]">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted"><span className="h-2 w-2 rounded-full bg-[var(--sun)]" /> Weather discovery, for iPhone</p>
              <h1 className="mt-6 font-display text-[clamp(3.5rem,7.4vw,7.2rem)] font-bold leading-[0.88] tracking-[-0.07em] text-foreground">Find the brighter way.</h1>
              <p className="mt-7 max-w-[470px] text-lg leading-relaxed text-muted sm:text-xl">Weather Atlas helps you see the sun at your location, compare the places you care about, and go somewhere better when the forecast calls for it.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href={appStoreUrl} className="rounded-full bg-[var(--foreground)] px-5 py-3.5 text-sm font-semibold text-[var(--canvas)] transition-transform hover:-translate-y-px">Download for iOS</a>
                <a href="#how-it-works" className="text-sm font-medium text-foreground underline decoration-[var(--sun)] decoration-2 underline-offset-4">See how it works</a>
              </div>
              <p className="mt-5 text-xs text-muted">Built for the next good day.</p>
            </div>
            <div className="relative mx-auto w-full max-w-[650px] lg:max-w-none">
              <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-[var(--sun-pale)] opacity-45 blur-[1px]" aria-hidden="true" />
              <ProductMockup view="location" />
            </div>
          </div>
        </section>

        <section className="border-y border-rule px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1280px] gap-5 sm:grid-cols-3 sm:gap-8">
            <SmallPromise label="Your Location" text="Know when today is at its brightest." />
            <SmallPromise label="Saved Places" text="Compare the places already on your mind." />
            <SmallPromise label="Map" text="Turn a forecast into a direction." />
          </div>
        </section>

        <ProductStory />

        {/* Closing CTA keeps the visual quiet and returns attention to the decision to download. */}
        <section className="border-t border-rule px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[780px] text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Weather Atlas for iPhone</p>
            <h2 className="mt-5 font-display text-5xl font-bold leading-[0.94] tracking-[-0.06em] text-foreground sm:text-6xl">Make room for the better forecast.</h2>
            <p className="mx-auto mt-6 max-w-[510px] text-base leading-relaxed text-muted sm:text-lg">A weather app for checking less and choosing more: where to go, when to go, and which plans have the best chance of sun.</p>
            <a href={appStoreUrl} className="mt-9 inline-flex rounded-full bg-[var(--foreground)] px-5 py-3.5 text-sm font-semibold text-[var(--canvas)] transition-transform hover:-translate-y-px">Download for iOS</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function SmallPromise({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-l-2 border-[var(--sun)] pl-4">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}
