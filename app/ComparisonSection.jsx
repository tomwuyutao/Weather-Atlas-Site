// -----------------------------------------------------------------------------
// Traditional weather versus Weather Atlas
// -----------------------------------------------------------------------------
// This section makes the product distinction concrete: conventional forecasts
// ask a person to inspect cities one at a time, while Weather Atlas starts from
// sunshine and offers several ways to find it.

const traditionalCities = [
  { city: "London", detail: "Cloudy · 14°" },
  { city: "Rome", detail: "Sunny · 26°" },
  { city: "Athens", detail: "Sunny · 29°" }
];

const atlasMethods = [
  { label: "Nearby", detail: "Find brighter places around you" },
  { label: "Saved", detail: "Compare the places you care about" },
  { label: "Map", detail: "Explore sunny areas at a glance" }
];

export default function ComparisonSection() {
  return (
    <section className="comparison-section">
      <div className="site-container py-24 md:py-32">
        <header className="mx-auto max-w-3xl text-center">
          <p className="comparison-kicker">A different kind of forecast</p>
          <h2 className="app-serif mt-5 text-4xl font-semibold leading-[1.02] tracking-normal md:text-6xl">
            Don’t search every city.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Traditional weather apps make you check places one by one. Weather Atlas helps you find sunshine systematically.
          </p>
        </header>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-8">
          <section className="comparison-panel comparison-panel-traditional">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="comparison-panel-label">Traditional weather app</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-normal">Search, then check.</h3>
              </div>
              <span className="comparison-step">1 city</span>
            </div>

            <div className="comparison-search mt-8">Search a city</div>
            <ol className="mt-4 grid divide-y divide-white/10 rounded-2xl border border-white/10 px-5">
              {traditionalCities.map((place) => (
                <li key={place.city} className="flex items-center justify-between gap-4 py-4">
                  <span className="font-medium">{place.city}</span>
                  <span className="text-sm text-white/55">{place.detail}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-6 text-white/45">Then start over for the next place.</p>
          </section>

          <section className="comparison-panel comparison-panel-atlas">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="comparison-panel-label">Weather Atlas</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-normal">Start with sunshine.</h3>
              </div>
              <span className="comparison-sun" aria-label="Sunshine">☀</span>
            </div>

            <div className="comparison-map mt-7" aria-label="Stylised weather map with sunny place markers">
              <span className="comparison-map-label">Sunny places</span>
              <i className="comparison-map-dot comparison-map-dot-one" />
              <i className="comparison-map-dot comparison-map-dot-two" />
              <i className="comparison-map-dot comparison-map-dot-three" />
              <i className="comparison-map-dot comparison-map-dot-four" />
            </div>

            <ol className="mt-5 grid divide-y divide-black/10">
              {atlasMethods.map((method) => (
                <li key={method.label} className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="text-sm font-semibold text-[#9b6b1c]">{method.label}</span>
                  <span className="text-sm leading-5 text-[#5a5143]">{method.detail}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}
