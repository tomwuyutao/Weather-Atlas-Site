import { FloatingNavigation } from '../../components/floating-navigation';
import { SiteFooter } from '../../components/site-footer';

export const metadata = { title: 'Placeholder Privacy' };

export default function PrivacyPage() {
  return <><FloatingNavigation /><main className="snap-page min-h-[100svh] px-5 pb-20 pt-40 sm:px-8"><article className="mx-auto max-w-[720px]"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[var(--muted)]">Placeholder label</p><h1 className="mt-5 font-editorial text-6xl leading-[.9] tracking-[-.06em]">Privacy placeholder.</h1><p className="mt-8 text-lg leading-relaxed text-[var(--muted)]">Placeholder content for a standalone privacy page.</p></article></main><SiteFooter /></>;
}
