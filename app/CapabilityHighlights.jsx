// -----------------------------------------------------------------------------
// Secondary Weather Atlas capabilities
// -----------------------------------------------------------------------------
// The primary story establishes the three major areas of the app. These
// supporting examples reveal the useful details behind them without competing
// with the main narrative.

const timelineDays = [
  ["Mon", "4h", "long"],
  ["Tue", "8h", "full"],
  ["Wed", "7h", "mid"],
  ["Thu", "9h", "full"],
  ["Fri", "3h", "short"]
];

function TenDayTimelineVisual() {
  return (
    <div className="capability-visual capability-timeline">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--body)]">Saved places</p>
          <h3 className="mt-1 text-xl font-semibold">10-Day Sunny Hours</h3>
        </div>
        <span className="text-sm font-semibold text-[var(--sun)]">Next 10 days</span>
      </div>
      <div className="mt-7 grid grid-cols-5 gap-2">
        {timelineDays.map(([day, hours, width]) => (
          <div key={day} className="text-center">
            <p className="text-xs font-medium text-[var(--body)]">{day}</p>
            <div className="mt-3 flex h-28 items-end justify-center rounded-2xl bg-[var(--chart-track)] p-2">
              <span className={`timeline-bar timeline-bar-${width}`} />
            </div>
            <p className="mt-2 text-xs font-semibold text-[var(--ink)]">{hours}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegionSearchVisual() {
  return (
    <div className="capability-visual capability-region-search">
      <p className="text-sm font-medium text-[var(--body)]">Find Sun</p>
      <h3 className="mt-1 text-xl font-semibold">Where would you like to look?</h3>
      <div className="mt-7 grid gap-3">
        <div className="region-search-option">
          <span>Country</span>
          <strong>Italy</strong>
        </div>
        <div className="region-search-option">
          <span>Continent</span>
          <strong>Europe</strong>
        </div>
      </div>
      <p className="mt-6 text-sm leading-6 text-[var(--body)]">Choose a region, then see its sunnier places for the selected day.</p>
    </div>
  );
}

function MapTapVisual() {
  return (
    <div className="capability-visual capability-map-tap">
      <div className="map-tap-grid" aria-hidden="true" />
      <span className="map-tap-pin" aria-hidden="true" />
      <div className="map-tap-card">
        <p className="text-sm font-semibold">This area</p>
        <p className="mt-1 text-sm text-[var(--body)]">Tap anywhere to find sun nearby.</p>
      </div>
    </div>
  );
}

const capabilities = [
  {
    key: "timeline",
    eyebrow: "Plan beyond today",
    title: "See the sunny hours ahead.",
    body: "The 10-day timeline lets you compare when your saved places will be at their brightest, not just what the weather looks like now.",
    visual: <TenDayTimelineVisual />
  },
  {
    key: "region",
    eyebrow: "Look further afield",
    title: "Search a country or continent.",
    body: "Open up a whole region when you are still deciding where to go, then narrow in on its sunnier places.",
    visual: <RegionSearchVisual />
  },
  {
    key: "tap",
    eyebrow: "Stay curious",
    title: "Tap the map to search there.",
    body: "Any spot on the map can become the start of a new sunshine search—no need to know the city first.",
    visual: <MapTapVisual />
  }
];

export default function CapabilityHighlights() {
  return (
    <section className="capability-section">
      <div className="site-container py-24 md:py-32">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sun)]">More to explore</p>
          <h2 className="app-serif mt-5 text-4xl font-semibold leading-[1.02] tracking-normal text-[var(--ink)] md:text-6xl">
            A little more sunshine intelligence.
          </h2>
        </header>

        <div className="mt-16 grid gap-20 md:mt-24 md:gap-28">
          {capabilities.map((capability, index) => (
            <article key={capability.key} className={`capability-row ${index % 2 === 1 ? "capability-row-reverse" : ""}`}>
              <div>{capability.visual}</div>
              <div className="self-center">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sun)]">{capability.eyebrow}</p>
                <h3 className="app-serif mt-5 text-4xl font-semibold leading-[1.04] tracking-normal text-[var(--ink)] md:text-5xl">
                  {capability.title}
                </h3>
                <p className="body-text mt-5 max-w-xl text-lg leading-8">{capability.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
