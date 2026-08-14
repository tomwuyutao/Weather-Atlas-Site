import Link from 'next/link';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

export const metadata = { title: 'Privacy Policy — Weather Atlas' };

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12">
        <article className="mx-auto max-w-[760px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Weather Atlas</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-foreground sm:text-6xl">Privacy Policy</h1>
          <p className="mt-6 text-sm text-muted">Last updated: 14 August 2026</p>
          <div className="mt-12 space-y-10 text-[17px] leading-relaxed text-muted">
            <section>
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground">A simple overview</h2>
              <p className="mt-3">Weather Atlas is designed to help you compare weather across your location and the places you save. The app uses the information needed to provide those features and does not make your saved places public.</p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground">Location</h2>
              <p className="mt-3">If you choose to allow location access, Weather Atlas uses your device location to show local conditions and identify nearby brighter places. You can turn location access off at any time in iOS Settings.</p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground">Saved places and preferences</h2>
              <p className="mt-3">Places you save, along with app preferences such as appearance and units, are kept on your device for the app to work as expected. Deleting a saved place removes it from your Weather Atlas library.</p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground">Weather information</h2>
              <p className="mt-3">Forecast information is requested from Apple WeatherKit so Weather Atlas can present current conditions, sunny hours, comparisons, and map results. Weather availability and accuracy can vary by place and time.</p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground">This website</h2>
              <p className="mt-3">This static website does not include an account system, contact form, or analytics scripts. If you use the App Store link, Apple handles that visit under its own privacy policy.</p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground">Questions</h2>
              <p className="mt-3">For help with Weather Atlas or this policy, visit the <Link href="/support/" className="text-foreground underline decoration-[var(--sun)] decoration-2 underline-offset-4">support page</Link>.</p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
