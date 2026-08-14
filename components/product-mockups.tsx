type ProductView = 'location' | 'saved' | 'map';

/**
 * Accurate, code-built product illustrations based on the native app's real
 * screen structure: a report, a saved-place comparison dashboard, and Map.
 * They remain illustrative rather than pretending to be live weather data.
 */
export function ProductMockup({ view, compact = false }: { view: ProductView; compact?: boolean }) {
  return (
    <div className={compact ? 'w-full' : 'mx-auto w-full max-w-[650px]'} aria-label="Illustrative Weather Atlas interface">
      <div className={`app-frame p-2.5 sm:p-3 ${compact ? '' : 'md:p-4'}`}>
        <div className="flex items-center justify-between px-3 pb-2 pt-1.5 text-[10px] font-semibold text-foreground sm:text-xs">
          <span>9:41</span>
          <div className="h-4 w-[76px] rounded-full bg-[var(--foreground)] sm:h-5 sm:w-[102px]" />
          <span className="tracking-[0.08em]">● ● ●</span>
        </div>
        {view === 'location' && <LocationScreen compact={compact} />}
        {view === 'saved' && <SavedPlacesScreen compact={compact} />}
        {view === 'map' && <MapScreen compact={compact} />}
      </div>
    </div>
  );
}

function AppBar({ title, date = 'Thu, 14 Aug', map = false }: { title: string; date?: string; map?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 pb-3 pt-2 sm:px-4">
      <span className="text-[13px] font-semibold tracking-[-0.02em] text-foreground sm:text-[15px]">{title}</span>
      {map ? (
        <div className="rounded-full border border-rule bg-panel px-2.5 py-1.5 text-[9px] font-medium text-foreground sm:px-3 sm:text-[10px]">{date} <span className="ml-1 text-muted">›</span></div>
      ) : (
        <div className="flex items-center gap-1.5 rounded-full border border-rule bg-panel px-2.5 py-1.5 text-[9px] font-medium text-foreground sm:px-3 sm:text-[10px]">
          <span className="text-muted">‹</span>{date}<span className="text-muted">›</span>
        </div>
      )}
    </div>
  );
}

function LocationScreen({ compact }: { compact: boolean }) {
  return (
    <div className="px-2 pb-3 sm:px-3 sm:pb-4">
      <AppBar title="Your Location" />
      <div className="px-2 pb-3 text-center sm:pb-4">
        <p className="font-display text-[25px] font-bold leading-none tracking-[-0.055em] text-foreground sm:text-[34px]">Bristol</p>
        <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-muted sm:text-xs">
          <SunGlyph size="small" /> <span>Sun out now</span>
        </div>
      </div>

      <div className="grid gap-2.5 sm:gap-3">
        <section className="app-surface p-3 sm:p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Today</p>
              <p className="mt-1 text-[23px] font-medium leading-none tracking-[-0.05em] text-foreground sm:text-[30px]">18°</p>
            </div>
            <div className="text-right">
              <SunGlyph />
              <p className="mt-1 text-[10px] text-muted">Mostly sunny</p>
            </div>
          </div>
          <div className="mt-4 flex items-end gap-1.5" aria-hidden="true">
            {[18, 24, 31, 34, 36, 31, 24, 17].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-full bg-[var(--sun)]" style={{ height: `${height}px`, opacity: 0.35 + index / 13 }} />
                <span className="text-[7px] text-muted">{8 + index * 2}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="app-surface p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <LocationIcon />
            <div>
              <p className="text-[11px] font-semibold text-foreground">Nearby Sunny Places</p>
              <p className="text-[9px] text-muted">Brighter options, ranked by distance</p>
            </div>
          </div>
          <div className="mt-3 divide-y divide-[var(--rule)]">
            <PlaceRow name="Bath" distance="18 km away" temperature="20°" />
            <PlaceRow name="Cheltenham" distance="56 km away" temperature="19°" />
          </div>
        </section>
      </div>
      {!compact && <TabBar selected="location" />}
    </div>
  );
}

function SavedPlacesScreen({ compact }: { compact: boolean }) {
  const days = [0.26, 0.58, 0.76, 0.41, 0.84, 0.67, 0.35, 0.48, 0.91, 0.63];
  return (
    <div className="px-2 pb-3 sm:px-3 sm:pb-4">
      <AppBar title="Saved Places" />
      <div className="grid gap-2.5 sm:gap-3">
        <section className="app-surface p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <CalendarIcon />
            <p className="text-[11px] font-semibold text-foreground">Best Sunny Dates</p>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5 sm:grid-cols-10">
            {days.map((strength, index) => (
              <div key={index} className="grid aspect-square place-items-center rounded-[9px] border border-[var(--rule)] text-[9px] font-medium text-foreground" style={{ background: `rgba(251, 192, 86, ${strength})` }}>
                {14 + index}
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[8px] text-muted"><span>More cloud</span><span>More sun</span></div>
        </section>
        <section className="app-surface p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <BookmarkIcon />
            <p className="text-[11px] font-semibold text-foreground">Longest Sunny Hours</p>
          </div>
          <div className="mt-2 divide-y divide-[var(--rule)]">
            <SavedPlaceRow name="Bristol" hours="8 hrs" tone="sun" />
            <SavedPlaceRow name="Berlin" hours="7 hrs" tone="partly" />
            <SavedPlaceRow name="Lisbon" hours="6 hrs" tone="sun" />
          </div>
        </section>
      </div>
      {!compact && <TabBar selected="saved" />}
    </div>
  );
}

function MapScreen({ compact }: { compact: boolean }) {
  return (
    <div className="px-2 pb-3 sm:px-3 sm:pb-4">
      <AppBar title="Map" date="Thu, 14 Aug" map />
      <div className="relative overflow-hidden rounded-[1.3rem] border border-rule bg-[var(--map)]">
        <div className="weather-grid absolute inset-0 opacity-70" />
        <svg viewBox="0 0 600 340" className="relative block h-[264px] w-full sm:h-[330px]" role="img" aria-label="A weather map showing nearby sunny places">
          <path d="M-10 246C76 202 132 224 199 191c62-31 105-100 191-91 70 7 80 57 137 42 32-8 58-36 91-31v245H-10Z" fill="var(--rain)" opacity=".2" />
          <path d="M-10 73c61 16 73 61 130 52 41-6 65-46 111-31 47 15 39 63 93 77 56 14 82-30 122-19 38 11 34 57 78 60 29 2 52-16 94-3" fill="none" stroke="var(--sun)" strokeWidth="25" opacity=".28" strokeLinecap="round" />
          <path d="M25 121c54-12 74 25 125 13 48-11 77-55 134-34 35 13 51 46 87 39 56-10 77-53 124-35 43 16 31 59 92 70" fill="none" stroke="var(--foreground)" strokeWidth="1.2" opacity=".24" />
          <path d="M-4 174c62-1 83 45 144 28 48-13 62-66 126-62 56 3 79 55 132 40 45-13 64-53 114-41 42 10 65 46 108 39" fill="none" stroke="var(--foreground)" strokeWidth="1.2" opacity=".24" />
          <path d="M29 253c56-22 100 18 157 1 57-17 77-71 144-61 60 9 70 52 130 48 47-4 67-37 119-22" fill="none" stroke="var(--foreground)" strokeWidth="1.2" opacity=".24" />
        </svg>
        <MapMarker x="30%" y="35%" label="Bristol" selected />
        <MapMarker x="57%" y="50%" label="Oxford" />
        <MapMarker x="72%" y="28%" label="Norwich" />
        <div className="absolute bottom-3 left-3 right-3 rounded-full border border-rule bg-[var(--canvas)] px-3 py-2.5 sm:left-4 sm:right-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SunGlyph size="small" />
              <span className="text-[10px] font-medium text-foreground">4 sunny places nearby</span>
            </div>
            <span className="text-[9px] text-muted">Find Sun ›</span>
          </div>
        </div>
      </div>
      {!compact && <TabBar selected="map" />}
    </div>
  );
}

function PlaceRow({ name, distance, temperature }: { name: string; distance: string; temperature: string }) {
  return (
    <div className="flex items-center gap-2 py-2">
      <SunGlyph size="small" />
      <div className="min-w-0 flex-1"><p className="text-[10px] font-medium text-foreground">{name}</p><p className="text-[8px] text-muted">{distance}</p></div>
      <span className="text-[11px] font-medium text-foreground">{temperature}</span>
    </div>
  );
}

function SavedPlaceRow({ name, hours, tone }: { name: string; hours: string; tone: 'sun' | 'partly' }) {
  return (
    <div className="flex items-center gap-2 py-2">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: tone === 'sun' ? 'var(--sun)' : 'var(--sun-pale)' }} />
      <span className="flex-1 text-[10px] font-medium text-foreground">{name}</span>
      <span className="text-[10px] text-foreground">{hours}</span>
    </div>
  );
}

function MapMarker({ x, y, label, selected = false }: { x: string; y: string; label: string; selected?: boolean }) {
  return (
    <div className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5" style={{ left: x, top: y }}>
      <span className={`h-3.5 w-3.5 rounded-full border-2 border-[var(--canvas)] ${selected ? 'bg-[var(--sun)]' : 'bg-[var(--sun-pale)]'}`} />
      <span className="rounded-full border border-rule bg-[var(--canvas)] px-1.5 py-1 text-[8px] font-medium text-foreground">{label}</span>
    </div>
  );
}

function TabBar({ selected }: { selected: ProductView }) {
  const tabs: Array<[ProductView, string]> = [['location', '⌁'], ['saved', '▯'], ['map', '⌖']];
  return (
    <div className="mx-auto mt-3 flex max-w-[260px] items-center justify-around rounded-full border border-rule bg-panel p-1.5 text-[9px] text-muted">
      {tabs.map(([id, symbol]) => <span key={id} className={`grid h-7 w-14 place-items-center rounded-full ${selected === id ? 'bg-[var(--canvas)] text-foreground' : ''}`}>{symbol}</span>)}
    </div>
  );
}

function SunGlyph({ size = 'regular' }: { size?: 'small' | 'regular' }) {
  const classes = size === 'small' ? 'h-3.5 w-3.5' : 'h-7 w-7';
  return <span className={`${classes} inline-block rounded-full bg-[var(--sun)] ring-2 ring-[color:rgba(251,192,86,0.25)]`} aria-hidden="true" />;
}

function LocationIcon() { return <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--panel-strong)] text-[11px] text-foreground">⌖</span>; }
function CalendarIcon() { return <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-[var(--panel-strong)] text-[11px] text-foreground">□</span>; }
function BookmarkIcon() { return <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-[var(--panel-strong)] text-[10px] text-foreground">▮</span>; }
