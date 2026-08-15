type Variant = 'flow' | 'compare' | 'map';

/** Abstract UI planes provide the visual rhythm of a product demo without reproducing a product or graphic. */
export function PlaceholderProduct({ variant }: { variant: Variant }) {
  return (
    <div className="surface overflow-hidden rounded-[28px] p-3 sm:p-4">
      <div className="flex h-7 items-center justify-between px-2 text-[10px] text-[var(--muted)]">
        <span>00:00</span>
        <span className="h-4 w-20 rounded-full bg-[var(--ink)]" />
        <span>•••</span>
      </div>
      {variant === 'flow' && <FlowPanel />}
      {variant === 'compare' && <ComparePanel />}
      {variant === 'map' && <MapPanel />}
      <div className="mx-auto mt-3 flex max-w-[260px] justify-around rounded-full border border-[var(--line)] bg-[var(--panel)] p-1.5">
        <i className="h-5 w-12 rounded-full bg-[var(--page)]" />
        <i className="h-5 w-12 rounded-full" />
        <i className="h-5 w-12 rounded-full" />
      </div>
    </div>
  );
}

function FlowPanel() {
  return (
    <div className="grid gap-3 p-2 sm:p-3">
      <div className="flex items-center justify-between"><Stub width="w-24" /><Stub width="w-16" /></div>
      <div className="py-3 text-center"><Stub width="mx-auto w-36" /><Stub width="mx-auto mt-3 w-20" /></div>
      <div className="surface rounded-2xl p-4"><Stub width="w-14" /><div className="mt-4 flex items-end gap-2">{[20, 30, 40, 35, 47, 40, 25].map((height, index) => <i key={index} className="flex-1 rounded-full bg-[var(--accent)]" style={{ height }} />)}</div></div>
      <div className="surface rounded-2xl p-4"><Stub width="w-32" /><div className="mt-4 space-y-3"><Line /><Line /><Line /></div></div>
    </div>
  );
}

function ComparePanel() {
  return (
    <div className="grid gap-3 p-2 sm:p-3">
      <div className="flex items-center justify-between"><Stub width="w-28" /><Stub width="w-16" /></div>
      <div className="surface rounded-2xl p-4"><Stub width="w-28" /><div className="mt-4 grid grid-cols-7 gap-1.5">{Array.from({ length: 14 }, (_, index) => <i key={index} className="aspect-square rounded-lg border border-[var(--line)] bg-[var(--accent)]" style={{ opacity: 0.35 + ((index % 6) / 10) }} />)}</div></div>
      <div className="surface rounded-2xl p-4"><Stub width="w-36" /><div className="mt-4 space-y-3"><Line /><Line /><Line /></div></div>
    </div>
  );
}

function MapPanel() {
  return (
    <div className="subtle-grid relative m-2 min-h-[290px] overflow-hidden rounded-2xl border border-[var(--line)] sm:m-3 sm:min-h-[340px]">
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[var(--accent)] opacity-35" />
      <svg viewBox="0 0 600 340" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M-20 120C70 70 112 150 188 108c76-43 92-95 175-58 66 30 91-2 135 30 46 35 50 76 122 53" fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity=".25" />
        <path d="M-20 218c67-54 113 2 173-28 78-38 112-89 181-57 54 25 79 81 145 37 48-32 90-20 141-6" fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity=".25" />
      </svg>
      {[['30%', '34%'], ['62%', '53%'], ['75%', '26%']].map(([left, top], index) => <span key={index} className="absolute h-4 w-4 rounded-full border-[3px] border-[var(--page)] bg-[var(--accent)]" style={{ left, top }} />)}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-full border border-[var(--line)] bg-[var(--page)] px-4 py-3"><Stub width="w-32" /><Stub width="w-16" /></div>
    </div>
  );
}

function Stub({ width }: { width: string }) { return <i className={`block h-2.5 rounded-full bg-[var(--ink)] opacity-70 ${width}`} />; }
function Line() { return <div className="flex items-center gap-3"><i className="h-3 w-3 rounded-full bg-[var(--accent)]" /><Stub width="w-3/5" /><Stub width="ml-auto w-9" /></div>; }
