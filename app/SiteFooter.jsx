// -----------------------------------------------------------------------------
// Shared footer path helper
// -----------------------------------------------------------------------------
// The footer is used by subpages, so links include the GitHub Pages base path.
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// -----------------------------------------------------------------------------
// Shared site footer
// -----------------------------------------------------------------------------
// Keeps Support and Privacy pages visually connected to the homepage.
export default function SiteFooter() {
  // Utility links shown on support/legal pages.
  const links = [
    ["Support", `${publicBasePath}/contact/`],
    ["Privacy Policy", `${publicBasePath}/privacy/`]
  ];

  return (
    <footer className="site-footer py-8 text-[var(--ink)] md:py-10">
      <div className="site-container flex justify-end pr-6 md:pr-8">
        {/* Utility navigation for support/legal pages */}
        <nav className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3 text-sm font-medium text-[var(--body)] md:text-base">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-[var(--ink)]">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
