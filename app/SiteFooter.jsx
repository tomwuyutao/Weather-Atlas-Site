// -----------------------------------------------------------------------------
// Shared footer path helper
// -----------------------------------------------------------------------------
// The footer is used by subpages, so links include the GitHub Pages base path.
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// -----------------------------------------------------------------------------
// Shared site footer
// -----------------------------------------------------------------------------
// Keeps Contact and Privacy pages visually connected to the homepage.
export default function SiteFooter() {
  // Utility links shown on support/legal pages.
  const links = [
    ["Contact", `${publicBasePath}/contact/`],
    ["Privacy Policy", `${publicBasePath}/privacy/`]
  ];

  return (
    <footer className="px-6 py-12 text-[#1B3F73] md:px-10">
      <div className="mx-auto flex w-full max-w-7xl justify-end">
        {/* Utility navigation for support/legal pages */}
        <nav className="flex flex-wrap items-center justify-end gap-x-8 gap-y-3 text-sm font-medium text-[#516071]">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-[#1B3F73]">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
