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
  { name: "London", x: "29%", y: "35%", color: "#8790C4", muted: true },
  { name: "Paris", x: "42%", y: "48%", color: "#E3E0D6", muted: true },
  { name: "Berlin", x: "58%", y: "38%", color: "#FF8A65" },
  { name: "Lisbon", x: "22%", y: "67%", color: "#F7AB3E" },
  { name: "Athens", x: "70%", y: "70%", color: "#F7AB3E" },
  { name: "Oslo", x: "52%", y: "19%", color: "#E3E0D6", muted: true },
  { name: "Rome", x: "53%", y: "63%", color: "#FF8A65" }
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
    <div className={`relative overflow-hidden rounded-[28px] bg-[#F7F6F2] ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(247,171,62,0.15),transparent_26%),radial-gradient(circle_at_28%_62%,rgba(135,144,196,0.14),transparent_28%)]" />
      <div className="absolute inset-0">
        <div className="absolute left-[3%] top-[13%] h-[76%] w-[42%] rounded-[50%_36%_46%_40%] bg-[#E5E0D9]" />
        <div className="absolute left-[40%] top-[8%] h-[82%] w-[50%] rounded-[45%_55%_42%_48%] bg-[#E9E4DE]" />
        <div className="absolute left-[54%] top-[14%] h-[35%] w-[16%] rounded-full bg-[#F7F6F2]" />
        <div className="absolute left-[46%] top-[58%] h-[23%] w-[16%] rounded-full bg-[#F7F6F2]" />
        <div className="absolute left-[72%] top-[58%] h-[25%] w-[22%] rounded-[50%] bg-[#E5E0D9]" />
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
        ["Lisbon", "Portugal", "#F7AB3E", "24°"],
        ["Barcelona", "Spain", "#F8D152", "22°"],
        ["Berlin", "Germany", "#FF8A65", "19°"],
        ["London", "United Kingdom", "#8790C4", "16°"]
      ],
      mapLabel: "List map"
    },
    {
      eyebrow: "List ranking",
      title: "Sunny places",
      badge: "Next 10 days",
      cities: [
        ["Lisbon", "Sunny on 4 upcoming days", "#F7AB3E", "92"],
        ["Barcelona", "Sunny this weekend", "#F8D152", "84"],
        ["Athens", "Brightest late week", "#F7AB3E", "81"],
        ["London", "Cloudier window", "#8790C4", "42"]
      ],
      mapLabel: "Ranked by sunniness"
    },
    {
      eyebrow: "Map mode",
      title: "Sunny at a glance",
      badge: "Spatial view",
      cities: [
        ["Lisbon", "Sunny", "#F7AB3E", "92"],
        ["Athens", "Sunny", "#F7AB3E", "81"],
        ["Berlin", "Clearing", "#FF8A65", "76"],
        ["London", "Cloudier", "#8790C4", "42"]
      ],
      mapLabel: "Weather dots"
    }
  ];
  const preview = previewStates[activeStep] ?? previewStates[0];
  const mapFirst = activeStep === 2;
  const list = (
    <div className="grid gap-3">
      {preview.cities.map(([city, condition, color, score]) => (
        <div key={city} className="flex items-center justify-between rounded-[22px] border border-[#E6E1D9] bg-[#FDF9F3]/72 px-4 py-3">
          <div className="flex items-center gap-3">
            <span
              className="h-4 w-4 rounded-full border border-white/70"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 22px ${color}80`
              }}
            />
            <div>
              <p className="text-base font-semibold text-[#2E2961]">{city}</p>
              <p className="text-sm text-[#5E6CB3]">{condition}</p>
            </div>
          </div>
          <p className="text-xl font-semibold text-[#0F4A9C]">{score}</p>
        </div>
      ))}
    </div>
  );
  const map = (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0F4A9C]">{preview.mapLabel}</p>
      <MiniMap className={`${mapFirst ? "h-[360px]" : "h-[230px]"} border border-[#E6E1D9]`} />
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-[34px] border border-[#E6E1D9] bg-white/72 p-5 shadow-[0_24px_80px_rgba(46,41,97,0.08)] backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FF8A65]">{preview.eyebrow}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-normal text-[#0F4A9C]">{preview.title}</h3>
        </div>
        <span className="rounded-full bg-[#F7AB3E]/18 px-4 py-2 text-sm font-semibold text-[#0F4A9C]">{preview.badge}</span>
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

  return (
    <main className="min-h-screen bg-[#FBF8F2] text-[#0F4A9C]">
      {/* Header and navigation */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <a href={publicAsset("/")} className="flex items-center gap-3" aria-label="Weather Atlas home">
          <span className="h-10 w-10 rounded-full bg-[#F7AB3E] shadow-[0_0_26px_rgba(247,171,62,0.38)]" />
          <span className="block text-2xl font-semibold leading-none tracking-normal text-[#0F4A9C]">Weather Atlas</span>
        </a>
      </header>

      {/* Hero section: product promise plus real app screenshot */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-10 pt-6 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:pb-12 md:pt-8">
        <div className="relative z-10">
          <h1 className="app-serif max-w-2xl text-5xl font-semibold leading-[0.96] tracking-normal text-[#0F4A9C] md:text-7xl">
            Find where it's sunny.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#2E2961]/72">
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
          <div className="relative rounded-[48px] bg-black p-2 shadow-[0_32px_100px_rgba(46,41,97,0.24),inset_0_0_0_1px_rgba(255,255,255,0.14)]">
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
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-normal text-[#0F4A9C] md:text-6xl">
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
                      ? "border-[#F7AB3E]/60 bg-white shadow-[0_18px_45px_rgba(46,41,97,0.08)]"
                      : "border-[#E6E1D9] bg-white/52 hover:bg-white/76"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                    activeWorkflowIndex === Number(step.label) - 1
                      ? "bg-[#F7AB3E] text-[#2E2961]"
                      : "bg-[#F7AB3E]/22 text-[#0F4A9C]"
                  }`}>
                    {step.label}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F4A9C]">{step.title}</h3>
                    <p className="mt-0.5 text-sm leading-6 text-[#2E2961]/64">{step.body}</p>
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
              <span className="h-8 w-8 rounded-full bg-[#F7AB3E]" />
              <p className="text-2xl font-semibold text-[#0F4A9C]">Weather Atlas</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-[#0F4A9C]">
            <a href={publicAsset("/contact/")} className="transition hover:text-[#FF8A65]">Contact</a>
            <a href={publicAsset("/privacy/")} className="transition hover:text-[#FF8A65]">Privacy Policy</a>
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
