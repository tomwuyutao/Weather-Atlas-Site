import Link from 'next/link';
import { appStoreUrl } from './site-header';

export function SiteFooter() {
  return (
    <footer className="border-t border-rule px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Weather Atlas</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={appStoreUrl} className="transition-colors hover:text-foreground">Download for iOS</a>
          <Link href="/support/" className="transition-colors hover:text-foreground">Support</Link>
          <Link href="/privacy/" className="transition-colors hover:text-foreground">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
