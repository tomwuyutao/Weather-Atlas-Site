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
    <footer className="px-6 py-12 text-[#0F4A9C] md:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
        {/* Brand link back to the homepage */}
        <div>
          <a href={`${publicBasePath}/`} className="flex w-fit items-center gap-3 transition hover:text-[#FF8A65]">
            <span className="h-8 w-8 rounded-full bg-[#F7AB3E]" />
            <p className="text-2xl font-semibold tracking-normal">Weather Atlas</p>
          </a>
        </div>

        {/* Subpage utility navigation */}
        <div className="md:pt-2">
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium text-[#0F4A9C]">
            {links.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-[#FF8A65]">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
