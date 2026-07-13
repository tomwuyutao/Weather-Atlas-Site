"use client";

import { useEffect, useRef, useState } from "react";
import DownloadButton from "./DownloadButton";

// -----------------------------------------------------------------------------
// Shared path helpers
// -----------------------------------------------------------------------------
// GitHub Pages serves the site from a base path, so all internal links go
// through this helper instead of hard-coding root-relative URLs.
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const publicAsset = (path) => `${publicBasePath}${path}`;

// -----------------------------------------------------------------------------
// External app links
// -----------------------------------------------------------------------------
// Kept in one place so every download CTA points to the same App Store listing.
const appStoreUrl = "https://apps.apple.com/gb/app/weather-atlas/id6759912603";

// -----------------------------------------------------------------------------
// Discovery workflow content
// -----------------------------------------------------------------------------
// These steps explain the main use case: tracking possible destinations instead
// of checking traditional city-by-city forecasts.
const workflowSteps = [
  {
    label: "1",
    navTitle: "Create lists",
    title: "Build your travel list",
    body: "Add the places you’re thinking about visiting."
  },
  {
    label: "2",
    navTitle: "Find sunny dates",
    title: "See when each place shines",
    body: "Skip opening forecasts day by day."
  },
  {
    label: "3",
    navTitle: "Visualise on map",
    title: "Spot sunshine instantly",
    body: "See weather patterns across your saved places."
  }
];

// -----------------------------------------------------------------------------
// Europe list example data
// -----------------------------------------------------------------------------
// Mirrors the sunny-city list in the provided app reference. Step one uses this
// data in a desktop-style window rather than showing a phone screenshot.
const europePlaces = [
  { city: "Rome", temperature: "36°", cloud: "0%" },
  { city: "Athens", temperature: "33°", cloud: "0%" },
  { city: "Antalya", temperature: "35°", cloud: "3%" },
  { city: "Ankara", temperature: "29°", cloud: "3%" },
  { city: "Hamburg", temperature: "27°", cloud: "4%" },
  { city: "Bursa", temperature: "29°", cloud: "6%" },
  { city: "Berlin", temperature: "28°", cloud: "9%" }
];

// -----------------------------------------------------------------------------
// Sunny-hours example data
// -----------------------------------------------------------------------------
// Each segment uses a percentage position across the 06:00-20:00 timeline.
// This keeps the visual timeline data-driven and easy to adjust later.
const sunnyHoursRows = [
  { date: "Today", segments: [["sun", 0, 74], ["partly", 74, 7], ["sun", 81, 19]] },
  { date: "Jul 13", segments: [["sun", 0, 27], ["partly", 27, 13]] },
  { date: "Jul 14", segments: [["partly", 13, 27], ["sun", 40, 14], ["partly", 54, 13], ["sun", 94, 6]] },
  { date: "Jul 15", segments: [["sun", 0, 7], ["partly", 7, 40], ["sun", 47, 14], ["partly", 61, 13]] },
  { date: "Jul 16", segments: [["sun", 0, 100]] },
  { date: "Jul 17", segments: [["sun", 0, 60], ["partly", 60, 13], ["partly", 94, 6]] },
  { date: "Jul 18", segments: [["partly", 0, 20], ["partly", 47, 13]] },
  { date: "Jul 19", segments: [["partly", 7, 47]] },
  { date: "Jul 20", segments: [["partly", 74, 7], ["sun", 81, 19]] },
  { date: "Jul 21", segments: [["sun", 0, 27], ["partly", 27, 47], ["sun", 74, 26]] }
];

// -----------------------------------------------------------------------------
// Theme icons
// -----------------------------------------------------------------------------
// Inline SVGs keep the light/dark toggle dependency-free and visually quiet.
function ThemeIcon({ mode }) {
  if (mode === "dark") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M20.4 15.3A8.6 8.6 0 0 1 8.7 3.6 8.6 8.6 0 1 0 20.4 15.3Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2.8v2.1M12 19.1v2.1M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// SF Symbol renderer
// -----------------------------------------------------------------------------
// Uses the exported SF Symbols as CSS masks. This preserves their vector shape
// while letting the site apply its own app-palette colours at any size.
function SfSymbol({ name, className = "" }) {
  const iconPath = publicAsset(`/icons/${name}.svg`);

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        WebkitMask: `url("${iconPath}") center / contain no-repeat`,
        mask: `url("${iconPath}") center / contain no-repeat`
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Desktop travel-list preview
// -----------------------------------------------------------------------------
// The first story step is intentionally rendered as a clean macOS-style app
// window. It keeps the focus on the ranked places and omits phone hardware and
// the app's sort, edit, and add toolbar controls.
function DesktopTravelList() {
  return (
    <div className="stage-preview w-full max-w-[560px] overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--paper)] p-5 text-[var(--ink)] md:p-6">
      <h3 className="app-serif text-3xl font-semibold leading-none tracking-normal md:text-4xl">Europe</h3>
      <ol className="mt-6 grid gap-1 md:mt-7">
        {europePlaces.map((place, index) => (
          <li
            key={place.city}
            className="grid grid-cols-[2rem_minmax(0,1fr)_auto_auto_auto] items-center gap-3 border-b border-[var(--line)] py-2.5 text-sm md:grid-cols-[2.25rem_minmax(0,1fr)_auto_auto_auto] md:gap-3 md:py-3 md:text-base"
          >
            <span className="font-medium text-[var(--muted)]">{index + 1}</span>
            <span className="text-lg font-semibold md:text-xl">{place.city}</span>
            <span className="flex items-center gap-1 text-[var(--sun)]">
              <SfSymbol name="thermometer.medium" className="h-4 w-3 bg-[var(--sun)]" />
              {place.temperature}
            </span>
            <span className="flex items-center gap-1 text-[var(--body)]">
              <SfSymbol name="cloud" className="h-4 w-4 bg-[var(--body)]" />
              {place.cloud}
            </span>
            <SfSymbol name="sun.max.fill" className="h-5 w-5 bg-[var(--sun)]" />
          </li>
        ))}
      </ol>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Sunny-hours preview
// -----------------------------------------------------------------------------
// Recreates the second app view with real layout elements rather than a flat
// screenshot: dates, hour markers, and colour-coded sunshine ranges.
function SunnyHoursPreview() {
  const hours = ["06", "08", "10", "12", "14", "16", "18", "20"];

  return (
    <div className="stage-preview w-full max-w-[560px] rounded-[26px] border border-[var(--line)] bg-[var(--paper)] p-5 text-[var(--ink)] md:p-7">
      <div className="flex items-center gap-3">
        <SfSymbol name="sun.max.fill" className="h-8 w-8 bg-[var(--ink)] md:h-10 md:w-10" />
        <h3 className="text-2xl font-semibold tracking-normal md:text-3xl">Sunny Hours</h3>
      </div>

      <div className="mt-6 text-xs font-semibold text-[var(--body)] md:mt-8 md:text-sm">
        <div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-2.5 md:grid-cols-[4.75rem_minmax(0,1fr)] md:gap-x-3">
          <span aria-hidden="true" />
          <div className="grid grid-cols-8">
            {hours.map((hour) => (
              <span key={hour} className="text-center">{hour}</span>
            ))}
          </div>

          <div className="mt-1 grid gap-y-1 md:gap-y-1.5">
            {sunnyHoursRows.map((row) => (
              <span key={row.date} className={`flex h-7 items-center ${row.date === "Today" ? "font-semibold text-[var(--ink)]" : "font-medium"}`}>
                {row.date}
              </span>
            ))}
          </div>

          <div className="relative mt-1">
            {/* One continuous grid layer prevents hour lines breaking between dates. */}
            <div className="absolute inset-0 grid grid-cols-8" aria-hidden="true">
              {hours.map((hour) => (
                <span key={hour} className="border-l border-[var(--line)]" />
              ))}
            </div>
            <div className="relative grid gap-y-1 md:gap-y-1.5">
              {sunnyHoursRows.map((row) => (
                <div key={row.date} className="relative h-7 overflow-hidden">
                  {row.segments.map(([type, start, width], index) => (
                    <span
                      key={`${row.date}-${index}`}
                      className={`absolute top-1/2 h-4 -translate-y-1/2 rounded-full ${type === "sun" ? "bg-[var(--sun)]" : "bg-[var(--partly)]"}`}
                      style={{ left: `${start}%`, width: `${width}%` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-5 text-sm font-medium text-[var(--body)]">
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[var(--sun)]" />Sunny</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full bg-[var(--partly)]" />Partly Sunny</span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Map story preview
// -----------------------------------------------------------------------------
// Uses the supplied map screenshot as the cartographic backdrop. The Rome card
// is deliberately built in code so its content remains clear and editable.
function MapStoryPreview() {
  return (
    <div className="stage-preview relative h-[500px] w-full max-w-[560px] overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--map-bg)] md:h-[560px]">
      <img
        src={publicAsset("/images/map-view-background-july-12.png")}
        alt="Weather Atlas map of Europe showing sunny places"
        className="absolute inset-0 h-full w-full object-cover object-[center_72%]"
      />
      <section className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-[26px] border border-[var(--line)] bg-[var(--surface-strong)] px-6 py-6 text-[var(--ink)] md:inset-x-6 md:bottom-6 md:px-8 md:py-7">
        <div>
          <p className="text-3xl font-semibold leading-none tracking-normal md:text-5xl">7 AM - 9 PM</p>
          <p className="mt-4 text-base font-medium text-[var(--body)] md:text-lg">Sunny Hours</p>
          <p className="mt-2 text-2xl font-semibold leading-none md:text-3xl">Rome</p>
        </div>
        <SfSymbol name="sun.max.fill" className="h-16 w-16 bg-[var(--sun)] md:h-20 md:w-20" />
      </section>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Workflow preview
// -----------------------------------------------------------------------------
// Shows three distinct coded previews: a travel list, a sunshine timeline, and
// a screenshot-backed map with an editable card.
function EuropeListExample({ activeStep }) {
  if (activeStep === 0) {
    return (
      <div className="relative flex justify-start">
        <DesktopTravelList />
      </div>
    );
  }

  if (activeStep === 1) {
    return (
      <div className="relative flex justify-start">
        <SunnyHoursPreview />
      </div>
    );
  }

  if (activeStep === 2) {
    return (
      <div className="relative flex justify-start">
        <MapStoryPreview />
      </div>
    );
  }

  return null;
}

// -----------------------------------------------------------------------------
// Landing page
// -----------------------------------------------------------------------------
// The page keeps a compact structure: header, hero, interactive workflow, footer.
export default function LandingPage() {
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [workflowProgress, setWorkflowProgress] = useState(0);
  const [colorMode, setColorMode] = useState("light");
  const isDarkMode = colorMode === "dark";
  const workflowSectionRef = useRef(null);
  const workflowContentRefs = useRef([]);

  // Keep the sticky left rail in sync with the right-hand scroll content,
  // matching the Granola-style staged narrative without adding a scroll library.
  useEffect(() => {
    let animationFrame = null;

    const updateActiveStep = () => {
      if (workflowSectionRef.current) {
        const section = workflowSectionRef.current;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const scrollableDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max((window.scrollY - sectionTop) / scrollableDistance, 0), 1);
        setWorkflowProgress(progress);

        // The next rail item only becomes active after the previous progress
        // line is complete, so the highlight and progress bar stay in sync.
        const activeIndex = Math.min(Math.floor(progress * workflowSteps.length), workflowSteps.length - 1);
        setActiveWorkflowIndex(activeIndex);
      }
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        updateActiveStep();
      });
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const scrollToWorkflowStep = (index) => {
    const target = workflowContentRefs.current[index];
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };

  return (
    <main className="site-shell min-h-screen text-[var(--ink)]" data-theme={colorMode}>
      {/* Floating brand header: always visible while the visitor scrolls. */}
      <header className="floating-header py-5">
        <div className="site-container flex items-center justify-between">
          <a href={publicAsset("/")} className="flex items-center gap-3" aria-label="Weather Atlas home">
            <span className="brand-dot h-10 w-10 rounded-full bg-[var(--sun)]" />
            <span className="block text-2xl font-semibold leading-none tracking-normal text-[var(--ink)]">Weather Atlas</span>
          </a>
          <button
            type="button"
            onClick={() => setColorMode(isDarkMode ? "light" : "dark")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[var(--paper)] text-[var(--ink)] transition hover:scale-[1.04]"
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            aria-pressed={isDarkMode}
          >
            <ThemeIcon mode={isDarkMode ? "dark" : "light"} />
          </button>
        </div>
      </header>

      {/* First viewport: header and hero stay together so the story starts cleanly. */}
      <div className="first-screen flex flex-col">
        {/* Hero section: product promise plus real app screenshot */}
        <section className="site-container relative grid flex-1 items-center gap-10 pb-10 pt-24 md:grid-cols-[0.9fr_1.1fr] md:pb-12 md:pt-28">
          <div className="relative z-10">
            <h1 className="app-serif max-w-2xl text-5xl font-semibold leading-[0.96] tracking-normal text-[var(--ink)] md:text-7xl">
              Find where it's sunny.
            </h1>
            <p className="body-text mt-7 max-w-xl text-lg leading-8">
              Planning your next holiday? Weather Atlas helps you find sunny destinations and plan ahead.
            </p>
            <div className="mt-10 flex">
              <DownloadButton href={appStoreUrl} />
            </div>
          </div>

          <div id="sunny" className="relative flex min-h-[500px] items-center justify-center">
            <div className="hero-phone-shell relative rounded-[48px] bg-black p-2">
              <img
                src={publicAsset(isDarkMode ? "/images/hero-dark.png" : "/images/hero-light.png")}
                alt="Weather Atlas app showing sunny places on a map"
                className="hero-screenshot h-auto w-auto rounded-[40px] border border-white/10"
                style={{ maxHeight: "min(640px, calc(100vh - 190px))" }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* How it works: Granola-style sticky rail with scrollable content */}
      <section ref={workflowSectionRef} className="py-20 md:py-24">
        <div className="site-container grid gap-12 md:grid-cols-2">
          <nav className="hidden self-start md:sticky md:top-[24vh] md:block" aria-label="Weather Atlas workflow">
            <div className="grid max-w-[250px] gap-1">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sun)]">How it works</p>
              {workflowSteps.map((step, index) => {
                const isActive = activeWorkflowIndex === index;
                const segmentProgress = Math.min(Math.max(workflowProgress * workflowSteps.length - index, 0), 1);

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => scrollToWorkflowStep(index)}
                    className={`relative py-4 text-left text-base font-medium transition ${
                      isActive ? "text-[var(--ink)]" : "text-[var(--muted)] opacity-55 hover:opacity-85"
                    }`}
                  >
                    <span>{step.navTitle}</span>
                    <span className="absolute bottom-0 left-0 h-px w-44 bg-[var(--line)]" />
                    <span
                      className="absolute bottom-0 left-0 h-[3px] w-44 origin-left rounded-full bg-[var(--ink)]"
                      style={{ transform: `scaleX(${segmentProgress})` }}
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="grid gap-24 md:gap-32">
            {workflowSteps.map((step, index) => (
              <article
                key={step.title}
                ref={(element) => {
                  workflowContentRefs.current[index] = element;
                }}
                className="min-h-[88svh] scroll-mt-24"
              >
                <div className="mb-8 max-w-2xl">
                  <h2 className="app-serif text-4xl font-semibold leading-[1.04] tracking-normal text-[var(--ink)] md:text-5xl">
                    <span className="text-[var(--sun)] md:hidden">{step.label}. </span>
                    {step.title}
                  </h2>
                  <p className="body-text mt-4 text-lg leading-8">{step.body}</p>
                </div>

                <EuropeListExample activeStep={index} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Download close: quiet final call-to-action on the same page surface. */}
      <section id="download" className="download-cta py-28 md:py-36">
        <div className="site-container text-center">
          <h2 className="text-5xl font-black leading-none tracking-normal text-[var(--ink)] md:text-7xl">
            Try Weather Atlas today
          </h2>
          <div className="mt-10 flex justify-center">
            <DownloadButton href={appStoreUrl} />
          </div>
        </div>
      </section>

      {/* Footer: plain support/legal links on the same warm background. */}
      <footer className="site-footer py-10 md:py-12">
        <div className="site-container flex justify-end">
          <nav className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3 text-sm font-medium text-[var(--body)] md:text-base">
            <a href={publicAsset("/contact/")} className="transition hover:text-[var(--ink)]">Support</a>
            <a href={publicAsset("/privacy/")} className="transition hover:text-[var(--ink)]">Privacy policy</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
