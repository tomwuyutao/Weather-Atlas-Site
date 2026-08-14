import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

const appStoreUrl = 'https://apps.apple.com/gb/app/weather-atlas/id6759912603';

/** Fixed but restrained navigation: the product identity stays visible throughout the story. */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-canvas">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-2.5 text-foreground" aria-label="Weather Atlas home">
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

        <nav className="flex items-center gap-2 sm:gap-3" aria-label="Main navigation">
          <Link href="/support/" className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block">Support</Link>
          <Link href="/privacy/" className="hidden text-sm text-muted transition-colors hover:text-foreground sm:block">Privacy</Link>
          <ThemeToggle />
          <a
            href={appStoreUrl}
            className="rounded-full bg-[var(--foreground)] px-3.5 py-2.5 text-xs font-semibold text-[var(--canvas)] transition-transform hover:-translate-y-px sm:px-4 sm:text-sm"
          >
            <span className="hidden sm:inline">Download for iOS</span>
            <span className="sm:hidden">Download</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export { appStoreUrl };
