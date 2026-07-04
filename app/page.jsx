// -----------------------------------------------------------------------------
// Shared path helpers
// -----------------------------------------------------------------------------
// GitHub Pages serves the site from a base path, so all internal links go
// through this helper instead of hard-coding root-relative URLs.
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const publicAsset = (path) => `${publicBasePath}${path}`;

// -----------------------------------------------------------------------------
// Map mock data
// -----------------------------------------------------------------------------
// These dots recreate the app's signature map-first view without loading a full
// interactive map on the marketing page.
const cityDots = [
  { name: "London", x: "29%", y: "35%", color: "#65ABE3", muted: true },
  { name: "Paris", x: "42%", y: "48%", color: "#D3E3EC", muted: true },
  { name: "Berlin", x: "58%", y: "38%", color: "#FF8A65" },
  { name: "Lisbon", x: "22%", y: "67%", color: "#F4B65E" },
  { name: "Athens", x: "70%", y: "70%", color: "#F4B65E" },
  { name: "Oslo", x: "52%", y: "19%", color: "#D3E3EC", muted: true },
  { name: "Rome", x: "53%", y: "63%", color: "#FF8A65" }
];

// -----------------------------------------------------------------------------
// Feature content
// -----------------------------------------------------------------------------
// The feature cards keep the page honest: they describe what the app does today.
const features = [
  {
    title: "Map-first weather",
    body: "Compare conditions across saved places without opening forecasts one by one.",
    icon: "⌖"
  },
  {
    title: "Plan ahead",
    body: "Use the date slider to see when conditions improve before you travel.",
    icon: "◷"
  },
  {
    title: "Weather layers",
    body: "Switch between weather, cloud cover, UV index, visibility, and more.",
    icon: "☼"
  },
  {
    title: "Private and free",
    body: "Weather Atlas is free and does not collect your personal information.",
    icon: "○"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(244,182,94,0.15),transparent_26%),radial-gradient(circle_at_28%_62%,rgba(101,171,227,0.14),transparent_28%)]" />
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
// Phone app mockup
// -----------------------------------------------------------------------------
// The phone frame highlights the core product idea: Weather Atlas starts from
// the map and keeps forecast details secondary.
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[250px] rounded-[42px] border border-[#2E2961]/18 bg-[#17152F] p-2 shadow-[0_28px_80px_rgba(46,41,97,0.24)] md:w-[292px]">
      <div className="overflow-hidden rounded-[34px] bg-[#FBFAF7]">
        <div className="flex items-center justify-between px-5 pt-4 text-[10px] font-semibold text-[#2E2961]">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-[#17152F]" />
          <span>80%</span>
        </div>
        <div className="px-5 pb-5 pt-8">
          <div className="mb-5 flex items-center justify-center gap-2 text-lg font-semibold text-[#2E2961]">
            Europe
            <span className="text-[#6F67C8]">⌄</span>
          </div>
          <MiniMap className="h-[300px] border border-[#E6E1D9]" />
          <div className="mt-5 rounded-[26px] border border-[#E3DDD2] bg-white/88 p-5 shadow-[0_18px_45px_rgba(46,41,97,0.08)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-5xl font-semibold tracking-normal text-[#111111]">20°</p>
                <p className="mt-3 text-sm font-medium text-[#6C675F]">Current Temperature</p>
                <p className="mt-3 text-2xl font-semibold text-[#111111]">Berlin</p>
              </div>
              <span className="mt-1 h-11 w-11 rounded-full bg-[#FF8A65] shadow-[0_0_0_14px_rgba(255,138,101,0.16),0_0_30px_rgba(255,138,101,0.42)]" />
            </div>
            <div className="mt-5 grid w-24 grid-cols-5 gap-1.5">
              {["#F4B65E", "#65ABE3", "#D3E3EC", "#D3E3EC", "#FF8A65", "#FF8A65", "#F4B65E", "#FF8A65", "#FF8A65", "#F4B65E"].map((color, index) => (
                <span key={index} className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Floating weather summary card
// -----------------------------------------------------------------------------
// This card supports the hero composition and mirrors the compact information
// style used in the app.
function WeatherCard() {
  return (
    <div className="rounded-[28px] border border-[#E6E1D9] bg-white/76 p-6 shadow-[0_22px_70px_rgba(46,41,97,0.08)] backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-[#003D99]">Berlin</p>
          <p className="mt-4 text-5xl font-semibold text-[#FF8A65]">20°</p>
          <p className="mt-2 text-sm text-[#6C675F]">Clear, comfortable</p>
        </div>
        <span className="h-16 w-16 rounded-full bg-[#F4B65E] shadow-[0_0_0_14px_rgba(244,182,94,0.18),0_0_34px_rgba(244,182,94,0.35)]" />
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[#E6E1D9] pt-5 text-sm text-[#2E2961]">
        <div>
          <p className="text-[#6C675F]">Cloud</p>
          <p className="mt-1 font-semibold">22%</p>
        </div>
        <div>
          <p className="text-[#6C675F]">UV</p>
          <p className="mt-1 font-semibold">Moderate</p>
        </div>
        <div>
          <p className="text-[#6C675F]">View</p>
          <p className="mt-1 font-semibold">Map</p>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Landing page
// -----------------------------------------------------------------------------
// The page is intentionally static and simple: header, hero, features, and footer.
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F2] text-[#003D99]">
      {/* Header and navigation */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-10">
        <a href={publicAsset("/")} className="flex items-center gap-3" aria-label="Weather Atlas home">
          <span className="h-10 w-10 rounded-full bg-[#F4B65E] shadow-[0_0_26px_rgba(244,182,94,0.38)]" />
          <span>
            <span className="block text-2xl font-semibold leading-none tracking-normal text-[#003D99]">Weather Atlas</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.42em] text-[#FF8A65]">Weather Map</span>
          </span>
        </a>
        <nav className="hidden items-center gap-9 text-sm font-medium text-[#003D99] md:flex">
          <a href="#features" className="transition hover:text-[#FF8A65]">Features</a>
          <a href="#map" className="transition hover:text-[#FF8A65]">Map</a>
          <a href={publicAsset("/privacy/")} className="transition hover:text-[#FF8A65]">Privacy</a>
          <a href={publicAsset("/contact/")} className="transition hover:text-[#FF8A65]">Support</a>
        </nav>
        <a
          href="#download"
          className="rounded-2xl bg-[#F4B65E] px-5 py-3 text-sm font-semibold text-[#2E2961] shadow-[0_14px_36px_rgba(244,182,94,0.26)] transition hover:bg-[#FFD071]"
        >
          Get the App
        </a>
      </header>

      {/* Hero section: product promise plus map-centered app mockups */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-16 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:pb-24 md:pt-24">
        <div className="relative z-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-[#FF8A65]">Free private weather map</p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[0.96] tracking-normal text-[#003D99] md:text-7xl">
            Weather, on a map.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#2E2961]/72">
            Weather Atlas is a simple map-first weather app for comparing conditions across places, planning trips, and keeping saved cities easy to understand.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#download"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#F4B65E] px-7 text-base font-semibold text-[#2E2961] shadow-[0_18px_45px_rgba(244,182,94,0.28)] transition hover:bg-[#FFD071]"
            >
              Download on the App Store
            </a>
            <a
              href="#features"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#003D99]/20 bg-white/50 px-7 text-base font-semibold text-[#003D99] transition hover:bg-white"
            >
              See features
            </a>
          </div>
        </div>

        <div id="map" className="relative min-h-[560px]">
          <div className="absolute left-[8%] top-[10%] hidden w-[360px] md:block">
            <WeatherCard />
          </div>
          <div className="absolute bottom-[4%] right-0 hidden w-[420px] rounded-[30px] border border-[#E6E1D9] bg-white/64 p-4 shadow-[0_22px_70px_rgba(46,41,97,0.08)] backdrop-blur md:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#003D99]">Map view</p>
            <MiniMap className="h-[210px]" />
          </div>
          <div className="relative z-10 mx-auto pt-8 md:pt-0">
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* Feature strip: four short, factual product benefits */}
      <section id="features" className="border-y border-[#E6E1D9] bg-white/54 px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          {features.map((feature, index) => (
            <div key={feature.title} className={`${index ? "md:border-l md:border-[#E6E1D9] md:pl-8" : ""}`}>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FBF8F2] text-3xl text-[#FF8A65] shadow-[0_16px_40px_rgba(46,41,97,0.06)]">
                {feature.icon}
              </div>
              <h2 className="text-xl font-semibold text-[#003D99]">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#2E2961]/70">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer: brand reminder and utility links */}
      <footer id="download" className="px-6 py-12 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-[#F4B65E]" />
              <p className="text-2xl font-semibold text-[#003D99]">Weather Atlas</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#2E2961]/66">A small, private weather map for iPhone, iPad, and Mac.</p>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[#003D99]">
            <a href={publicAsset("/contact/")} className="transition hover:text-[#FF8A65]">Contact</a>
            <a href={publicAsset("/privacy/")} className="transition hover:text-[#FF8A65]">Privacy Policy</a>
            <a href="#" className="transition hover:text-[#FF8A65]">Download</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
