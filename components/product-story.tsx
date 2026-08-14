'use client';

import { useEffect, useRef, useState } from 'react';
import { ProductMockup } from './product-mockups';

type Stage = {
  number: string;
  kicker: string;
  title: string;
  description: string;
  view: 'location' | 'saved' | 'map';
};

const stages: Stage[] = [
  {
    number: '01',
    kicker: 'Your Location',
    title: 'Start where you are.',
    description: 'See the conditions at your location, the hours that look brightest, and nearby places with better weather.',
    view: 'location',
  },
  {
    number: '02',
    kicker: 'Saved Places',
    title: 'Plan across your places.',
    description: 'Keep the places that matter close. Compare the best sunny dates and the longest sunny hours over the next ten days.',
    view: 'saved',
  },
  {
    number: '03',
    kicker: 'Map',
    title: 'Find sunshine on the map.',
    description: 'Read the weather geographically, inspect your places, and look for sunny areas when a better plan is worth the trip.',
    view: 'map',
  },
];

/** Desktop is a single pinned demonstration; mobile lets each product stage breathe on its own. */
export function ProductStory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | undefined;
    const updateStory = () => {
      const root = rootRef.current;
      if (!root) return;
      const totalTravel = Math.max(1, root.offsetHeight - window.innerHeight);
      const position = Math.min(1, Math.max(0, -root.getBoundingClientRect().top / totalTravel));
      setProgress(position);
      setActiveIndex(Math.min(stages.length - 1, Math.floor(position * stages.length)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        updateStory();
        frame = undefined;
      });
    };
    updateStory();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateStory);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateStory);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const activeStage = stages[activeIndex];
  return (
    <section id="how-it-works" className="px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pb-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-[650px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">How Weather Atlas works</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-5xl">A forecast that helps you choose.</h2>
        </div>

        {/* The three viewport-length triggers drive the desktop’s pinned interface. */}
        <div ref={rootRef} className="relative mt-10 hidden h-[300vh] lg:block">
          <div className="sticky top-[68px] grid h-[calc(100vh-68px)] grid-cols-[270px_minmax(0,1fr)] gap-12 py-12 xl:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">The weather, in three views</p>
                <div className="mt-7 flex gap-4">
                  <div className="relative mt-1 h-[154px] w-px bg-[var(--rule)]"><span className="story-progress absolute inset-x-0 top-0" style={{ height: `${Math.max(4, progress * 100)}%` }} /></div>
                  <ol className="space-y-6">
                    {stages.map((stage, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <li key={stage.number}>
                          <button type="button" onClick={() => document.getElementById(`story-trigger-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--sun)]">
                            <span className={`block text-xs font-semibold ${isActive ? 'text-foreground' : 'text-muted'}`}>{stage.number}</span>
                            <span className={`mt-1 block text-sm ${isActive ? 'text-foreground' : 'text-muted'}`}>{stage.kicker}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <p className="max-w-[210px] text-xs leading-relaxed text-muted">Scroll to move through the ways Weather Atlas turns a forecast into an option.</p>
            </aside>

            <div className="grid h-full grid-cols-[minmax(240px,0.68fr)_minmax(390px,1fr)] items-center gap-10 xl:gap-16">
              <div className="stage-fade" key={activeStage.number}>
                <p className="text-sm font-medium text-[var(--sun)]">{activeStage.number} / 03</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-muted">{activeStage.kicker}</p>
                <h3 className="mt-3 font-display text-5xl font-bold leading-[0.98] tracking-[-0.06em] text-foreground xl:text-6xl">{activeStage.title}</h3>
                <p className="mt-6 max-w-[330px] text-base leading-relaxed text-muted">{activeStage.description}</p>
              </div>
              <div className="stage-fade" key={`${activeStage.number}-product`}>
                <ProductMockup view={activeStage.view} />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-full">
            {stages.map((stage, index) => <div id={`story-trigger-${index}`} key={stage.number} className="h-1/3" />)}
          </div>
        </div>

        <div className="mt-10 grid gap-14 lg:hidden">
          {stages.map((stage) => (
            <article key={stage.number} className="grid gap-7">
              <div>
                <p className="text-sm font-semibold text-[var(--sun)]">{stage.number}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">{stage.kicker}</p>
                <h3 className="mt-2 font-display text-4xl font-bold leading-[0.98] tracking-[-0.055em] text-foreground">{stage.title}</h3>
                <p className="mt-4 max-w-[560px] text-base leading-relaxed text-muted">{stage.description}</p>
              </div>
              <ProductMockup view={stage.view} compact />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
