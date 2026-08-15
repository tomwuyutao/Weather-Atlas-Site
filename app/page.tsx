import { FloatingNavigation } from '../components/floating-navigation';
import { PagedStory } from '../components/paged-story';
import { PlaceholderProduct } from '../components/placeholder-product';
import { SiteFooter } from '../components/site-footer';

const mobileStages = [
  ['01', 'Section one', 'Placeholder heading.', 'flow'],
  ['02', 'Section two', 'Another placeholder heading.', 'compare'],
  ['03', 'Section three', 'Final placeholder heading.', 'map'],
] as const;

export default function HomePage() {
  return (
    <>
      <FloatingNavigation />
      <main>
        {/* Centered opening composition and lower demo plane are structural placeholders only. */}
        <section className="snap-page flex min-h-[100svh] flex-col items-center justify-between overflow-hidden px-5 pb-0 pt-36 text-center sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-[850px]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Placeholder label</p>
            <h1 className="mt-8 font-editorial text-[clamp(4rem,8vw,7.7rem)] leading-[.84] tracking-[-.07em] text-[var(--ink)]">Placeholder headline,<br /><em>placeholder emphasis.</em></h1>
            <p className="mx-auto mt-8 max-w-[500px] text-lg leading-relaxed text-[var(--muted)]">Placeholder paragraph copy. This is intentionally neutral text used to demonstrate the layout only.</p>
            <a id="placeholder-action" href="#stage-one" className="mt-7 inline-flex rounded-xl border-2 border-[var(--ink)] bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[var(--ink)]">Primary action</a>
            <p className="mt-5 text-xs text-[var(--muted)]">Placeholder supporting detail</p>
          </div>
          <div className="mt-12 w-full max-w-[800px] translate-y-10 sm:mt-16"><PlaceholderProduct variant="flow" /></div>
        </section>

        <section className="border-y border-[var(--line)] px-5 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-[1180px] gap-6 sm:grid-cols-3">
            {['Placeholder detail one', 'Placeholder detail two', 'Placeholder detail three'].map((item) => <p key={item} className="border-l-2 border-[var(--accent)] pl-4 text-sm text-[var(--muted)]">{item}</p>)}
          </div>
        </section>

        <section className="snap-page px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Placeholder label</p>
            <h2 className="mt-4 max-w-[660px] font-editorial text-5xl leading-[.9] tracking-[-.06em] text-[var(--ink)] sm:text-6xl">Placeholder section heading.</h2>
          </div>
        </section>

        <PagedStory />

        {/* Mobile turns the pinned story into normal full-height placeholder pages. */}
        <section className="lg:hidden">
          {mobileStages.map(([number, label, title, product]) => <article id={`mobile-${number}`} className="snap-page grid min-h-[100svh] content-center gap-8 px-5 py-20 sm:px-8" key={number}>
            <div><p className="text-sm font-semibold text-[var(--muted)]">{number} / 03</p><p className="mt-6 text-xs font-semibold uppercase tracking-[.16em] text-[var(--muted)]">{label}</p><h2 className="mt-3 font-editorial text-5xl leading-[.9] tracking-[-.06em] text-[var(--ink)]">{title}</h2><p className="mt-5 max-w-[460px] text-base leading-relaxed text-[var(--muted)]">Placeholder paragraph content that fills this product page.</p></div>
            <PlaceholderProduct variant={product} />
          </article>)}
        </section>

        <section className="snap-page flex min-h-[78svh] items-center justify-center border-t border-[var(--line)] px-5 py-20 text-center sm:px-8">
          <div className="max-w-[720px]"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[var(--muted)]">Placeholder label</p><h2 className="mt-5 font-editorial text-5xl leading-[.9] tracking-[-.06em] text-[var(--ink)] sm:text-6xl">Final placeholder heading.</h2><p className="mt-6 text-[var(--muted)]">Placeholder supporting copy.</p><a href="#placeholder-action" className="mt-8 inline-flex rounded-xl border-2 border-[var(--ink)] bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-[var(--ink)]">Primary action</a></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
