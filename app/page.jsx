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

// The story rail activates each stage when its heading reaches this viewport
// position. Keeping the value shared avoids a mismatch between click targets
// and scroll-driven progress.
const workflowStageAnchorRatio = 0.2;
const workflowProgressEpsilon = 0.01;
// Clicking stops a couple of pixels before the stage boundary to avoid a
// rounded-up progress bar. This tolerance still activates the chosen item.
const workflowActivationTolerance = 4;

// -----------------------------------------------------------------------------
// Discovery workflow content
// -----------------------------------------------------------------------------
// The story follows the app's three primary surfaces: the current location,
// the places a person has saved, and open-ended discovery on the map.
const workflowSteps = [
  {
    label: "1",
    navTitle: "Your place",
    title: "Find sun at your place.",
    body: "See today’s conditions and sunny hours, then discover nearby places with more sunshine."
  },
  {
    label: "2",
    navTitle: "Saved places",
    title: "Find sun across your saved places.",
    body: "Compare the best sunny dates and places across the next 10 days—without checking forecasts one by one."
  },
  {
    label: "3",
    navTitle: "Explore the map",
    title: "Explore new places with sun.",
    body: "See sunny hours spatially, inspect places on the map, and find somewhere brighter."
  }
];

// -----------------------------------------------------------------------------
// Your Location and Saved Places example data
// -----------------------------------------------------------------------------
// These compact examples mirror the real app's nearby-sunnier ranking and
// Saved Places planning cards without relying on a live forecast.
const nearbySunnyPlaces = [
  { city: "Brighton", sunnyHours: "8 h", distance: "83 km" },
  { city: "Cambridge", sunnyHours: "7 h", distance: "79 km" },
  { city: "Oxford", sunnyHours: "7 h", distance: "84 km" }
];

const sunnyDateOptions = [
  { weekday: "Mon", date: "27", accent: "bg-[var(--partly)]" },
  { weekday: "Tue", date: "28", accent: "bg-[var(--sun)]" },
  { weekday: "Wed", date: "29", accent: "bg-[var(--sun)]" },
  { weekday: "Thu", date: "30", accent: "bg-[var(--partly)]" },
  { weekday: "Fri", date: "31", accent: "bg-[var(--sun-faint-alpha)]" }
];

const savedPlaceRankings = [
  { city: "Athens", sunnyHours: "10 h", bestDate: "Wed 29" },
  { city: "Rome", sunnyHours: "9 h", bestDate: "Tue 28" },
  { city: "Antalya", sunnyHours: "9 h", bestDate: "Wed 29" },
  { city: "Madrid", sunnyHours: "8 h", bestDate: "Fri 31" }
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
// Your Location preview
// -----------------------------------------------------------------------------
// The current-location report brings together the selected day's local weather,
// its daily sunshine timeline, and the nearby-sunnier recommendation list.
function YourLocationPreview() {
  return (
    <div className="stage-preview w-full max-w-[560px] rounded-[26px] border border-[var(--line)] bg-[var(--card-fill)] p-5 text-[var(--ink)] md:p-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-[var(--body)]">Your Location</p>
          <h3 className="app-serif mt-1 text-3xl font-semibold leading-none tracking-normal md:text-4xl">London</h3>
          <p className="mt-2 text-sm text-[var(--body)]">Partly sunny · 18°</p>
        </div>
        <SfSymbol name="cloud.sun.fill" className="h-11 w-11 bg-[var(--sun)]" />
      </div>

      <section className="mt-7 border-t border-[var(--line)] pt-5">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-base font-semibold">
            <SfSymbol name="sun.max.fill" className="h-5 w-5 bg-[var(--sun)]" />
            Daily Sunny Hours
          </span>
          <span className="text-sm font-semibold text-[var(--sun)]">6 h</span>
        </div>
        <div className="mt-5">
          <div className="relative h-4 overflow-hidden rounded-full bg-[var(--chart-track)]">
            <span className="absolute inset-y-0 left-[18%] w-[35%] rounded-full bg-[var(--sun)]" />
            <span className="absolute inset-y-0 left-[63%] w-[19%] rounded-full bg-[var(--partly)]" />
          </div>
          <div className="mt-2 flex justify-between text-xs font-medium text-[var(--body)]">
            <span>06</span><span>09</span><span>12</span><span>15</span><span>18</span><span>21</span>
          </div>
        </div>
      </section>

      <section className="mt-7 border-t border-[var(--line)] pt-5">
        <div className="flex items-center gap-2 text-base font-semibold">
          <SfSymbol name="sun.max.fill" className="h-5 w-5 bg-[var(--sun)]" />
          Nearby sunnier places
        </div>
        <ol className="mt-3 grid divide-y divide-[var(--line)]">
          {nearbySunnyPlaces.map((place) => (
            <li key={place.city} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div>
                <p className="font-semibold">{place.city}</p>
                <p className="mt-0.5 text-sm text-[var(--body)]">{place.distance} away</p>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--sun)]">
                <SfSymbol name="sun.max.fill" className="h-4 w-4 bg-[var(--sun)]" />
                {place.sunnyHours}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Saved Places preview
// -----------------------------------------------------------------------------
// This pairs the app's two planning cards: the forecast dates with the best
// overall sunshine and the saved places ranking for the selected date.
function SavedPlacesPreview() {
  return (
    <div className="stage-preview w-full max-w-[560px] rounded-[26px] border border-[var(--line)] bg-[var(--card-fill)] p-5 text-[var(--ink)] md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--body)]">Saved Places</p>
          <h3 className="app-serif mt-1 text-3xl font-semibold leading-none tracking-normal md:text-4xl">Plan ahead</h3>
        </div>
        <span className="rounded-full bg-[var(--sun-soft-alpha)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)]">Next 10 days</span>
      </div>

      <section className="mt-7 border-t border-[var(--line)] pt-5">
        <div className="flex items-center gap-2 text-base font-semibold">
          <span aria-hidden="true" className="text-lg">▦</span>
          Best Sunny Dates
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {sunnyDateOptions.map((option) => (
            <div key={option.date} className="text-center">
              <p className="text-xs font-medium text-[var(--body)]">{option.weekday}</p>
              <span className={`mt-2 flex aspect-square items-center justify-center rounded-2xl border border-[color:var(--line)] text-lg font-semibold ${option.accent}`}>
                {option.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-7 border-t border-[var(--line)] pt-5">
        <div className="flex items-center gap-2 text-base font-semibold">
          <SfSymbol name="sun.max.fill" className="h-5 w-5 bg-[var(--sun)]" />
          Best Sunny Places
        </div>
        <ol className="mt-3 grid divide-y divide-[var(--line)]">
          {savedPlaceRankings.map((place, index) => (
            <li key={place.city} className="grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className="text-sm font-medium text-[var(--muted)]">{index + 1}</span>
              <div className="min-w-0">
                <p className="truncate font-semibold">{place.city}</p>
                <p className="mt-0.5 text-sm text-[var(--body)]">Best on {place.bestDate}</p>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--sun)]">
                <SfSymbol name="sun.max.fill" className="h-4 w-4 bg-[var(--sun)]" />
                {place.sunnyHours}
              </span>
            </li>
          ))}
        </ol>
      </section>
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
      <section className="absolute inset-x-5 bottom-5 flex h-32 items-center justify-between gap-4 rounded-[24px] border border-[var(--line)] bg-[var(--surface-strong)] px-[22px] py-4 text-[var(--ink)] md:inset-x-6 md:bottom-6">
        <div className="min-w-0">
          <p className="text-[32px] font-semibold leading-none tracking-normal">7 AM - 9 PM</p>
          <p className="mt-2 truncate text-base font-normal leading-tight">Rome · Sunny Hours</p>
        </div>
        <SfSymbol name="sun.max.fill" className="h-10 w-10 bg-[var(--sun)]" />
      </section>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Workflow preview
// -----------------------------------------------------------------------------
// Shows the app's three product areas: current location, saved-place planning,
// and map discovery.
function WorkflowPreview({ activeStep }) {
  if (activeStep === 0) {
    return (
      <div className="relative flex justify-start">
        <YourLocationPreview />
      </div>
    );
  }

  if (activeStep === 1) {
    return (
      <div className="relative flex justify-start">
        <SavedPlacesPreview />
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
  const [activeWorkflowProgress, setActiveWorkflowProgress] = useState(0);
  const [colorMode, setColorMode] = useState("light");
  const isDarkMode = colorMode === "dark";
  const workflowSectionRef = useRef(null);
  const workflowContentRefs = useRef([]);

  // Keep the sticky left rail in sync with the right-hand scroll content.
  // Each stage begins when its heading reaches this point in the viewport. The
  // click handler below uses the same anchor, so opening a rail item always
  // begins its own progress bar at 0%.
  useEffect(() => {
    let animationFrame = null;

    const updateActiveStep = () => {
      if (workflowSectionRef.current && workflowContentRefs.current.length) {
        const section = workflowSectionRef.current;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const stageAnchor = Math.round(window.innerHeight * workflowStageAnchorRatio);
        const stageStarts = workflowContentRefs.current.map((content) => (
          content.getBoundingClientRect().top + window.scrollY - stageAnchor
        ));
        const sectionEnd = sectionTop + section.offsetHeight - window.innerHeight + stageAnchor;
        const activeIndex = stageStarts.reduce(
          (currentIndex, start, index) => (
            window.scrollY >= start - workflowActivationTolerance ? index : currentIndex
          ),
          0
        );
        const nextStageStart = stageStarts[activeIndex + 1] ?? Math.max(sectionEnd, stageStarts[activeIndex] + 1);
        const rawStageProgress = Math.min(
          Math.max((window.scrollY - stageStarts[activeIndex]) / (nextStageStart - stageStarts[activeIndex]), 0),
          1
        );
        // Browser scroll positions can be fractional. Treat the first 1% as
        // the stage's starting point so a rail click never renders a sliver of
        // progress before the visitor has actually begun scrolling.
        const stageProgress = rawStageProgress < workflowProgressEpsilon ? 0 : rawStageProgress;

        setActiveWorkflowIndex(activeIndex);
        setActiveWorkflowProgress(stageProgress);
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

    // Align the selected stage with the same anchor used by the scroll
    // observer. A two-pixel cushion keeps rounding from rendering 1% progress
    // as soon as the browser finishes the smooth scroll.
    const stageAnchor = Math.round(window.innerHeight * workflowStageAnchorRatio);
    window.scrollTo({
      top: Math.max(0, Math.floor(target.getBoundingClientRect().top + window.scrollY - stageAnchor - 2)),
      behavior: "smooth"
    });
  };

  return (
    <main className="site-shell min-h-screen text-[var(--ink)]" data-theme={colorMode}>
      {/* Floating brand header: always visible while the visitor scrolls. */}
      <header className="floating-header py-5">
        <div className="site-container flex items-center justify-between">
          <a href={publicAsset("/")} className="flex items-center gap-3" aria-label="Weather Atlas home">
            <span className="brand-dot h-10 w-10 rounded-full bg-[var(--sun)]" />
            <span className="app-serif block text-2xl font-semibold leading-none tracking-normal text-[var(--ink)]">Weather Atlas</span>
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
                src={publicAsset(isDarkMode ? "/images/hero-dark-july-28.png" : "/images/hero-light-july-28.png")}
                alt="Weather Atlas app showing sunny places on a map"
                className="hero-screenshot h-auto w-auto rounded-[40px] border border-white/10"
                style={{ maxHeight: "min(640px, calc(100vh - 190px))" }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* How it works: sticky rail with the app's three product areas. */}
      <section ref={workflowSectionRef} className="py-20 md:py-24">
        <div className="site-container grid gap-12 md:grid-cols-2">
          <nav className="hidden self-start md:sticky md:top-[24vh] md:block" aria-label="Weather Atlas workflow">
            <div className="grid max-w-[250px] gap-1">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sun)]">How it works</p>
              {workflowSteps.map((step, index) => {
                const isActive = activeWorkflowIndex === index;
                const segmentProgress = index < activeWorkflowIndex ? 1 : index === activeWorkflowIndex ? activeWorkflowProgress : 0;

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

                <WorkflowPreview activeStep={index} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen close: its opaque surface cleanly takes over from the
          workflow, including the support and privacy links at the bottom. */}
      <section id="download" className="download-cta relative z-10 flex min-h-[100svh] py-10 md:py-12">
        <div className="site-container flex flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h2 className="text-5xl font-black leading-none tracking-normal text-[var(--ink)] md:text-7xl">
              Try Weather Atlas today
            </h2>
            <div className="mt-10 flex justify-center">
              <DownloadButton href={appStoreUrl} />
            </div>
          </div>

          <footer className="site-footer pt-10">
            <nav className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3 text-sm font-medium text-[var(--body)] md:text-base">
              <a href={publicAsset("/contact/")} className="transition hover:text-[var(--ink)]">Support</a>
              <a href={publicAsset("/privacy/")} className="transition hover:text-[var(--ink)]">Privacy policy</a>
            </nav>
          </footer>
        </div>
      </section>
    </main>
  );
}
