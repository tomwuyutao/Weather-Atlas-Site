import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

const appStoreUrl = 'https://apps.apple.com/gb/app/weather-atlas/id6759912603';

/** Fixed but restrained navigation: the product identity stays visible throughout the story. */
export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[76px]">
      {/* The persistent product identity remains genuinely top-left on every page. */}
      <Link href="/" className="pointer-events-auto absolute left-5 top-5 flex items-center gap-2.5 text-foreground sm:left-8 lg:left-12" aria-label="Weather Atlas home">
          <Image
            // Public assets must include the GitHub Pages project prefix when
            // referenced directly from a statically exported deployment.
            src="/Weather-Atlas-Site/images/weather-atlas-app-icon.png"
            width={34}
            height={34}
            alt=""
            className="rounded-[10px] border border-rule"
            priority
          />
          <span className="font-display text-[20px] font-bold tracking-[-0.045em]">Weather Atlas</span>
      </Link>

      {/* A compact floating control bar nods to the reference's pacing without cloning its header. */}
      <nav className="pointer-events-auto absolute right-5 top-4 flex items-center gap-1.5 rounded-2xl border border-rule bg-panel p-1.5 sm:right-8 sm:gap-2 lg:right-12" aria-label="Main navigation">
          <a href="#how-it-works" className="hidden rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-canvas hover:text-foreground lg:block">How it works</a>
          <Link href="/support/" className="hidden rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-canvas hover:text-foreground md:block">Support</Link>
          <ThemeToggle />
          <a
            href={appStoreUrl}
            className="rounded-xl border border-[var(--foreground)] bg-[var(--sun-pale)] px-3.5 py-2.5 text-xs font-semibold text-foreground transition-transform hover:-translate-y-px sm:px-4 sm:text-sm"
          >
            <span className="hidden sm:inline">Download for iOS</span>
            <span className="sm:hidden">Download</span>
          </a>
      </nav>
    </header>
  );
}

export { appStoreUrl };
