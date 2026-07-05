"use client";

import { useState } from "react";

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
// Map mock data
// -----------------------------------------------------------------------------
// These dots recreate the app's sunny-place comparison view without loading a
// full interactive map on the marketing page.
const cityDots = [
  { name: "London", x: "29%", y: "35%", color: "var(--rain)", muted: true },
  { name: "Paris", x: "42%", y: "48%", color: "var(--cloud)", muted: true },
  { name: "Berlin", x: "58%", y: "38%", color: "var(--warm)" },
  { name: "Lisbon", x: "22%", y: "67%", color: "var(--sun)" },
  { name: "Athens", x: "70%", y: "70%", color: "var(--sun)" },
  { name: "Oslo", x: "52%", y: "19%", color: "var(--cloud)", muted: true },
  { name: "Rome", x: "53%", y: "63%", color: "var(--warm)" }
];

// -----------------------------------------------------------------------------
// Discovery workflow content
// -----------------------------------------------------------------------------
// These steps explain the main use case: tracking possible destinations instead
// of checking traditional city-by-city forecasts.
const workflowSteps = [
  {
    label: "1",
    title: "Create a list of cities you would like to visit",
    body: "For example, make a Europe list for possible holiday destinations."
  },
  {
    label: "2",
    title: "See cities ranked by sunniness",
    body: "The list view shows which places look brightest across the next 10 days."
  },
  {
    label: "3",
    title: "Use map mode for a quick glance",
    body: "See where sunny places are distributed across your tracked cities."
  }
];

// -----------------------------------------------------------------------------
// Weather map dot
// -----------------------------------------------------------------------------
// A single softly glowing weather dot used by the mini map mockups.
function WeatherDot({ dot, large = false }) {
  return (
    <span
      className={`absolute rounded-full border border-white/70 ${large ? "h-4 w-4" : "h-3 w-3"}`}
      style={{
        left: dot.x,
        top: dot.y,
        backgroundColor: dot.color,
        opacity: dot.muted ? 0.5 : 1,
        boxShadow: dot.muted ? `0 0 18px ${dot.color}66` : `0 0 0 18px ${dot.color}24, 0 0 42px ${dot.color}`
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Abstract map mockup
// -----------------------------------------------------------------------------
// A lightweight CSS-only map that suggests land, sea, and weather points while
// keeping the page fast and dependency-free.
function MiniMap({ className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-[var(--map-bg)] ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,color-mix(in_srgb,var(--sun)_18%,transparent),transparent_26%),radial-gradient(circle_at_28%_62%,color-mix(in_srgb,var(--rain)_14%,transparent),transparent_28%)]" />
      <div className="absolute inset-0">
        <div className="absolute left-[3%] top-[13%] h-[76%] w-[42%] rounded-[50%_36%_46%_40%] bg-[var(--map-land)]" />
        <div className="absolute left-[40%] top-[8%] h-[82%] w-[50%] rounded-[45%_55%_42%_48%] bg-[var(--map-land-active)]" />
        <div className="absolute left-[54%] top-[14%] h-[35%] w-[16%] rounded-full bg-[var(--map-bg)]" />
        <div className="absolute left-[46%] top-[58%] h-[23%] w-[16%] rounded-full bg-[var(--map-bg)]" />
        <div className="absolute left-[72%] top-[58%] h-[25%] w-[22%] rounded-[50%] bg-[var(--map-land)]" />
      </div>
      {cityDots.map((dot) => (
        <WeatherDot key={dot.name} dot={dot} large={dot.name === "Berlin"} />
      ))}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Europe list example
// -----------------------------------------------------------------------------
// A compact product story showing how a tracked list becomes a weather discovery
// surface for upcoming travel.
function EuropeListExample({ activeStep }) {
  const previewStates = [
    {
      eyebrow: "Tracked list",
      title: "Europe",
      badge: "Saved cities",
      cities: [
        ["Lisbon", "Portugal", "var(--sun)", "24°"],
        ["Barcelona", "Spain", "var(--partly)", "22°"],
        ["Berlin", "Germany", "var(--warm)", "19°"],
        ["London", "United Kingdom", "var(--rain)", "16°"]
      ],
      mapLabel: "List map"
    },
    {
      eyebrow: "List ranking",
      title: "Sunny places",
      badge: "Next 10 days",
      cities: [
        ["Lisbon", "Sunny on 4 upcoming days", "var(--sun)", "92"],
        ["Barcelona", "Sunny this weekend", "var(--partly)", "84"],
        ["Athens", "Brightest late week", "var(--sun)", "81"],
        ["London", "Cloudier window", "var(--rain)", "42"]
      ],
      mapLabel: "Ranked by sunniness"
    },
    {
      eyebrow: "Map mode",
      title: "Sunny at a glance",
      badge: "Spatial view",
      cities: [
        ["Lisbon", "Sunny", "var(--sun)", "92"],
        ["Athens", "Sunny", "var(--sun)", "81"],
        ["Berlin", "Clearing", "var(--warm)", "76"],
        ["London", "Cloudier", "var(--rain)", "42"]
      ],
      mapLabel: "Weather dots"
    }
  ];
  const preview = previewStates[activeStep] ?? previewStates[0];
  const mapFirst = activeStep === 2;
  const list = (
    <div className="grid gap-3">
      {preview.cities.map(([city, condition, color, score]) => (
        <div key={city} className="flex items-center justify-between rounded-[22px] border border-[color:var(--line)] bg-[var(--surface-soft)] px-4 py-3">
          <div className="flex items-center gap-3">
            <span
              className="h-4 w-4 rounded-full border border-white/70"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 22px ${color}80`
              }}
            />
            <div>
              <p className="text-base font-semibold text-[var(--body)]">{city}</p>
              <p className="text-sm text-[var(--muted)]">{condition}</p>
            </div>
          </div>
          <p className="text-xl font-semibold text-[var(--ink)]">{score}</p>
        </div>
      ))}
    </div>
  );
  const map = (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ink)]">{preview.mapLabel}</p>
      <MiniMap className={`${mapFirst ? "h-[360px]" : "h-[230px]"} border border-[color:var(--line)]`} />
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-[34px] border border-[color:var(--line)] bg-[var(--surface)] p-5 shadow-[0_24px_80px_var(--shadow)] backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--warm)]">{preview.eyebrow}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-normal text-[var(--ink)]">{preview.title}</h3>
        </div>
        <span className="rounded-full bg-[color-mix(in_srgb,var(--sun)_18%,transparent)] px-4 py-2 text-sm font-semibold text-[var(--ink)]">{preview.badge}</span>
      </div>

      <div className="mt-6 grid gap-5">
        {mapFirst ? (
          <>
            {map}
            {list}
          </>
        ) : (
          <>
            {list}
            {map}
          </>
        )}
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
  const [colorMode, setColorMode] = useState("light");
  const isDarkMode = colorMode === "dark";

  return (
    <main className="site-shell min-h-screen text-[var(--ink)]" data-theme={colorMode}>
      {/* Header and navigation */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href={publicAsset("/")} className="flex items-center gap-3" aria-label="Weather Atlas home">
          <span className="h-10 w-10 rounded-full bg-[var(--sun)] shadow-[0_0_26px_color-mix(in_srgb,var(--sun)_38%,transparent)]" />
          <span className="block text-2xl font-semibold leading-none tracking-normal text-[var(--ink)]">Weather Atlas</span>
        </a>
        <button
          type="button"
          onClick={() => setColorMode(isDarkMode ? "light" : "dark")}
          className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--ink)] shadow-[0_16px_42px_var(--shadow)] backdrop-blur transition hover:scale-[1.02]"
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          aria-pressed={isDarkMode}
        >
          <span>{isDarkMode ? "Dark" : "Light"}</span>
          <span className="relative h-6 w-11 rounded-full bg-[color-mix(in_srgb,var(--muted)_22%,transparent)]">
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-[var(--sun)] shadow-[0_0_18px_color-mix(in_srgb,var(--sun)_42%,transparent)] transition-transform ${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </span>
        </button>
      </header>

      {/* Hero section: product promise plus real app screenshot */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-10 pt-6 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:pb-12 md:pt-8">
        <div className="relative z-10">
          <h1 className="app-serif max-w-2xl text-5xl font-semibold leading-[0.96] tracking-normal text-[var(--ink)] md:text-7xl">
            Find where it's sunny.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[color-mix(in_srgb,var(--body)_72%,transparent)]">
            Planning your next holiday? Weather Atlas helps you find sunny destinations and plan ahead.
          </p>
          <div className="mt-10 flex">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit transition hover:opacity-90"
              aria-label="Download Weather Atlas on the App Store"
            >
              <img
                src={publicAsset("/badges/download-on-the-app-store.svg")}
                alt="Download on the App Store"
                className="h-14 w-auto"
              />
            </a>
          </div>
        </div>

        <div id="sunny" className="relative flex min-h-[500px] items-center justify-center">
          <div className="relative rounded-[48px] bg-black p-2 shadow-[0_32px_100px_var(--hero-shadow),inset_0_0_0_1px_rgba(255,255,255,0.14)]">
            <img
              src={publicAsset("/images/app-screenshot.png")}
              alt="Weather Atlas app showing sunny places on a map"
              className="h-auto w-auto rounded-[40px] border border-white/10"
              style={{ maxHeight: "min(640px, calc(100vh - 190px))" }}
            />
          </div>
        </div>
      </section>

      {/* How it works: three-step tracked-list weather discovery */}
      <section className="px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-normal text-[var(--ink)] md:text-6xl">
              How it works.
            </h2>
            <div className="mt-9 grid gap-3">
              {workflowSteps.map((step) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActiveWorkflowIndex(Number(step.label) - 1)}
                  className={`flex items-center gap-4 rounded-[24px] border p-4 text-left transition ${
                    activeWorkflowIndex === Number(step.label) - 1
                      ? "border-[color:var(--sun)] bg-[var(--surface-strong)] shadow-[0_18px_45px_var(--shadow)]"
                      : "border-[color:var(--line)] bg-[var(--surface-soft)] hover:bg-[var(--surface)]"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    activeWorkflowIndex === Number(step.label) - 1
                      ? "bg-[var(--sun)] text-[var(--paper)]"
                      : "bg-[color-mix(in_srgb,var(--sun)_22%,transparent)] text-[var(--ink)]"
                  }`}>
                    {step.label}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--ink)]">{step.title}</h3>
                    <p className="mt-0.5 text-sm leading-6 text-[color-mix(in_srgb,var(--body)_64%,transparent)]">{step.body}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <EuropeListExample activeStep={activeWorkflowIndex} />
        </div>
      </section>

      {/* Footer: brand reminder and utility links */}
      <footer id="download" className="px-6 py-12 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-[var(--sun)]" />
              <p className="text-2xl font-semibold text-[var(--ink)]">Weather Atlas</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-[var(--ink)]">
            <a href={publicAsset("/contact/")} className="transition hover:text-[var(--warm)]">Contact</a>
            <a href={publicAsset("/privacy/")} className="transition hover:text-[var(--warm)]">Privacy Policy</a>
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex transition hover:opacity-90"
              aria-label="Download Weather Atlas on the App Store"
            >
              <img
                src={publicAsset("/badges/download-on-the-app-store.svg")}
                alt="Download on the App Store"
                className="h-10 w-auto"
              />
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
