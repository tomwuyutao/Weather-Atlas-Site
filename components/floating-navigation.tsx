'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const themeKey = 'placeholder-layout-theme';

/** Generic fixed navigation structure; all visible labels intentionally remain placeholders. */
export function FloatingNavigation() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const nextIsDark = window.localStorage.getItem(themeKey) === 'dark';
    document.documentElement.classList.toggle('dark', nextIsDark);
    setIsDark(nextIsDark);
  }, []);

  function toggleAppearance() {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle('dark', nextIsDark);
    window.localStorage.setItem(themeKey, nextIsDark ? 'dark' : 'light');
    setIsDark(nextIsDark);
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="pointer-events-auto mx-auto flex min-h-[58px] max-w-[930px] items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--page)] p-1.5 text-sm" aria-label="Placeholder navigation">
        <Link href="/" className="flex items-center gap-2 px-3 py-2 text-[var(--ink)]">
          <span className="h-4 w-4 rounded-[4px] border border-[var(--ink)]" aria-hidden="true" />
          <span className="font-semibold">PLACEHOLDER</span>
        </Link>
        <div className="hidden rounded-xl bg-[var(--panel)] p-1 sm:flex">
          <a href="#stage-one" className="rounded-[9px] bg-[var(--page)] px-3 py-2 text-[var(--ink)]">Item one</a>
          <a href="#stage-two" className="px-3 py-2 text-[var(--muted)]">Item two</a>
        </div>
        <div className="ml-auto hidden items-center gap-1 md:flex">
          <a href="#stage-three" className="px-3 py-2 text-[var(--muted)]">Link one</a>
          <Link href="/support/" className="px-3 py-2 text-[var(--muted)]">Link two</Link>
        </div>
        <button type="button" onClick={toggleAppearance} className="rounded-xl border border-[var(--line)] px-3 py-2 text-[var(--muted)]" aria-label="Toggle placeholder appearance">Mode</button>
        <a href="#placeholder-action" className="rounded-xl border-2 border-[var(--ink)] bg-[var(--accent)] px-3.5 py-2 font-semibold text-[var(--ink)]">Action</a>
      </nav>
    </header>
  );
}
