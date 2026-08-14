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
        {/* Hero — centered, editorial, and visibly product-led from the opening viewport. */}
        <section className="relative min-h-[calc(100svh-68px)] overflow-hidden px-5 pb-0 pt-32 sm:px-8 sm:pt-36 lg:px-12 lg:pt-40">
          <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted"><span className="h-2 w-2 rounded-full bg-[var(--sun)]" /> Weather Atlas for iPhone</p>
            <h1 className="mt-7 font-display text-[clamp(3.8rem,8vw,7.7rem)] font-normal leading-[0.86] tracking-[-0.065em] text-foreground">
              Follow the forecast,<br /><em className="font-normal">find the sun.</em>
            </h1>
            <p className="mt-7 max-w-[510px] text-lg leading-[1.45] text-muted sm:text-xl">Weather Atlas shows where today is brightest, across the places you care about and the map in front of you.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href={appStoreUrl} className="rounded-xl border border-[var(--foreground)] bg-[var(--sun-pale)] px-5 py-3.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-px">Download for iOS</a>
              <a href="#how-it-works" className="rounded-xl border border-rule px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-panel">Explore the app</a>
            </div>
            <p className="mt-5 text-xs text-muted">A calmer way to make weather plans.</p>
          </div>
          <div className="relative mx-auto mt-12 w-full max-w-[850px] sm:mt-14">
            <div className="absolute -left-14 top-12 h-32 w-32 rounded-full bg-[var(--sun-pale)] opacity-45 blur-[1px]" aria-hidden="true" />
            <div className="absolute -right-12 bottom-10 h-24 w-24 rounded-full bg-[var(--drizzle)] opacity-20 blur-[1px]" aria-hidden="true" />
            <ProductMockup view="location" />
          </div>
        </section>

        <section className="border-y border-rule px-5 py-9 sm:px-8 lg:px-12">
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
