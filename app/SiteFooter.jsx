const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function SiteFooter() {
  const links = [
    ["Contact", `${publicBasePath}/contact/`],
    ["Privacy Policy", `${publicBasePath}/privacy/`]
  ];

  return (
    <footer className="px-5 py-16 text-weather-text md:px-10 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
        <div>
          <div className="flex items-center gap-4">
            <span className="h-10 w-10 rounded-full border border-white/20 bg-[#F4B65E] shadow-[0_0_28px_rgba(244,182,94,0.45)]" />
            <p className="text-4xl font-semibold tracking-normal">Weather Atlas</p>
          </div>
        </div>

        <div className="md:pt-2">
          <nav className="flex flex-wrap items-center gap-x-10 gap-y-4 text-lg text-weather-muted/70">
            {links.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-weather-text">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
