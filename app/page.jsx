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
    body: "Add the places you’re thinking about visiting.",
    screenshot: "/images/create-lists-screenshot.png",
    screenshotAlt: "Weather Atlas showing a saved travel list"
  },
  {
    label: "2",
    navTitle: "Find sunny dates",
    title: "See when each place shines",
    body: "Skip opening forecasts one by one.",
    screenshot: "/images/sunny-dates-screenshot.png",
    screenshotAlt: "Weather Atlas ranking places by sunny dates"
  },
  {
    label: "3",
    navTitle: "Visualise on map",
    title: "Spot sunshine instantly",
    body: "See weather patterns across your saved places.",
    screenshot: "/images/map-view-screenshot.png",
    screenshotAlt: "Weather Atlas map view for saved places"
  }
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
// Europe list example
// -----------------------------------------------------------------------------
// Shows the matching app screenshot for each narrative step.
function EuropeListExample({ activeStep }) {
  const preview = workflowSteps[activeStep] ?? workflowSteps[0];

  return (
    <div className="relative flex justify-center">
      <div className="relative rounded-[48px] bg-black p-2 md:-translate-x-14">
        <img
          key={preview.screenshot}
          src={publicAsset(preview.screenshot)}
          alt={preview.screenshotAlt}
          className="stage-preview h-auto w-auto rounded-[40px] border border-white/10"
          style={{ maxHeight: "min(560px, 72vh)" }}
        />
      </div>
    </div>
  );
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
      {/* First viewport: header and hero stay together so the story starts cleanly. */}
      <div className="first-screen flex flex-col">
        {/* Header and navigation */}
        <header className="site-container flex shrink-0 items-center justify-between py-5">
          <a href={publicAsset("/")} className="flex items-center gap-3" aria-label="Weather Atlas home">
            <span className="brand-dot h-10 w-10 rounded-full bg-[var(--sun)]" />
            <span className="block text-2xl font-semibold leading-none tracking-normal text-[var(--ink)]">Weather Atlas</span>
          </a>
          <button
            type="button"
            onClick={() => setColorMode(isDarkMode ? "light" : "dark")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-[var(--surface)] text-[var(--ink)] transition hover:scale-[1.04]"
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            aria-pressed={isDarkMode}
          >
            <ThemeIcon mode={isDarkMode ? "dark" : "light"} />
          </button>
        </header>

        {/* Hero section: product promise plus real app screenshot */}
        <section className="site-container relative grid flex-1 items-center gap-10 pb-10 pt-6 md:grid-cols-[0.9fr_1.1fr] md:pb-12 md:pt-8">
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
            <div className="relative rounded-[48px] bg-black p-2">
              <img
                src={publicAsset("/images/hero-screenshot.png")}
                alt="Weather Atlas app showing sunny places on a map"
                className="h-auto w-auto rounded-[40px] border border-white/10"
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

      {/* Download close: light CTA band plus dark footer, inspired by app sites. */}
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

      {/* Footer: dark brand panel with simple legal/support links */}
      <footer className="site-footer py-16 md:py-24">
        <div className="site-container flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <a href={publicAsset("/")} className="flex w-fit items-center gap-4 transition hover:opacity-80">
            <span className="h-12 w-12 rounded-full bg-[var(--sun)]" />
            <span className="text-3xl font-semibold text-[#F7F3EA]">Weather Atlas</span>
          </a>

          <nav className="grid gap-4 text-xl font-medium text-[#F7F3EA] md:justify-items-end md:text-right">
            <a href={publicAsset("/contact/")} className="transition hover:text-white">Support</a>
            <a href={publicAsset("/privacy/")} className="transition hover:text-white">Privacy policy</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
