'use client';

import { useEffect, useRef, useState } from 'react';
import { PlaceholderProduct } from './placeholder-product';

const stages = [
  { id: 'stage-one', number: '01', label: 'Section one', title: 'Placeholder heading.', body: 'Placeholder paragraph content that fills this fixed product page.', product: 'flow' as const },
  { id: 'stage-two', number: '02', label: 'Section two', title: 'Another placeholder heading.', body: 'Placeholder paragraph content that fills this fixed product page.', product: 'compare' as const },
  { id: 'stage-three', number: '03', label: 'Section three', title: 'Final placeholder heading.', body: 'Placeholder paragraph content that fills this fixed product page.', product: 'map' as const },
];

/** Pinned presentation driven by full-height snap pages. */
export function PagedStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    function update() {
      const root = ref.current;
      if (!root) return;
      const offset = Math.max(0, -root.getBoundingClientRect().top);
      setActive(Math.min(stages.length - 1, Math.floor(offset / Math.max(1, window.innerHeight))));
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  const current = stages[active];
  return (
    <section ref={ref} className="relative hidden lg:block">
      <div className="sticky top-0 z-10 -mb-[100svh] grid h-[100svh] grid-cols-[260px_minmax(0,1fr)] items-center gap-16 px-12 pt-20 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="self-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Placeholder label</p>
          <ol className="mt-8 space-y-5 border-l border-[var(--line)] pl-4">
            {stages.map((stage, index) => <li key={stage.id}><a href={`#${stage.id}`} className={index === active ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}><span className="block text-xs font-semibold">{stage.number}</span><span className="mt-1 block text-sm">{stage.label}</span></a></li>)}
          </ol>
          <p className="mt-10 max-w-[210px] text-xs leading-relaxed text-[var(--muted)]">Placeholder supporting text for the scroll sequence.</p>
        </aside>
        <div className="grid grid-cols-[minmax(260px,.75fr)_minmax(410px,1fr)] items-center gap-14 xl:gap-20">
          <div className="fade-stage" key={current.id}>
            <p className="text-sm font-semibold text-[var(--muted)]">{current.number} / 03</p>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{current.label}</p>
            <h2 className="mt-3 font-editorial text-6xl leading-[.9] tracking-[-.06em] text-[var(--ink)]">{current.title}</h2>
            <p className="mt-7 max-w-[340px] text-base leading-relaxed text-[var(--muted)]">{current.body}</p>
          </div>
          <div className="fade-stage" key={`${current.id}-product`}><PlaceholderProduct variant={current.product} /></div>
        </div>
      </div>
      {stages.map((stage) => <div id={stage.id} key={stage.id} className="snap-page h-[100svh]" aria-hidden="true" />)}
    </section>
  );
}
