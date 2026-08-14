import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

export const metadata = { title: 'Support — Weather Atlas' };

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12">
        <article className="mx-auto max-w-[760px]">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Weather Atlas</p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-[-0.06em] text-foreground sm:text-6xl">Support</h1>
          <p className="mt-6 max-w-[630px] text-lg leading-relaxed text-muted">A few useful places to start when Weather Atlas needs a hand.</p>
          <div className="mt-12 space-y-4">
            <SupportItem title="Current location is unavailable" text="Weather Atlas needs location permission to show local conditions and nearby sunny places. In iOS, open Settings → Privacy & Security → Location Services, then allow Weather Atlas to use your location." />
            <SupportItem title="Saved Places" text="Use Search to find a place, then save it. Saved Places lets you compare sunny dates and sunny hours across the next ten days." />
            <SupportItem title="Map" text="Open Map to inspect saved places and use Find Sun to look within the visible area, near you, or across a chosen country or continent." />
            <SupportItem title="Forecast data" text="Weather information depends on availability from Apple WeatherKit. Pull to refresh a view if a forecast looks out of date, and check your connection if the app cannot load weather data." />
          </div>
          <section className="mt-12 border-t border-rule pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Still need help?</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.045em] text-foreground">Say hello.</h2>
            <p className="mt-3 text-[17px] leading-relaxed text-muted">Include the city you were viewing, the date selected, and a screenshot if something did not behave as expected.</p>
            <a href="mailto:yutao5726@gmail.com" className="mt-5 inline-block text-sm font-semibold text-foreground underline decoration-[var(--sun)] decoration-2 underline-offset-4">yutao5726@gmail.com</a>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

function SupportItem({ title, text }: { title: string; text: string }) {
  return (
    <section className="border-t border-rule py-6 first:border-t-0 first:pt-0">
      <h2 className="font-display text-2xl font-bold tracking-[-0.04em] text-foreground">{title}</h2>
      <p className="mt-2 text-[17px] leading-relaxed text-muted">{text}</p>
    </section>
  );
}
