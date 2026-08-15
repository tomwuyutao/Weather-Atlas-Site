import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-8 text-sm text-[var(--muted)] sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span>PLACEHOLDER</span>
        <div className="flex gap-5"><Link href="/support/">Support</Link><Link href="/privacy/">Privacy</Link><a href="#placeholder-action">Action</a></div>
      </div>
    </footer>
  );
}
