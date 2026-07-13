// -----------------------------------------------------------------------------
// Shared floating brand
// -----------------------------------------------------------------------------
// Keeps Weather Atlas visible on every page. The homepage adds its theme control
// beside this same brand treatment, while support and legal pages use it alone.
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SiteBrand() {
  return (
    <header className="floating-header py-5">
      <div className="site-container">
        <a href={`${publicBasePath}/`} className="flex w-fit items-center gap-3" aria-label="Weather Atlas home">
          <span className="brand-dot h-10 w-10 rounded-full bg-[var(--sun)]" />
          <span className="block text-2xl font-semibold leading-none tracking-normal text-[var(--ink)]">Weather Atlas</span>
        </a>
      </div>
    </header>
  );
}
