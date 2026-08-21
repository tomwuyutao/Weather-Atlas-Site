import SiteFooter from "../SiteFooter";
import SiteBrand from "../SiteBrand";

// -----------------------------------------------------------------------------
// Contact page metadata
// -----------------------------------------------------------------------------
// Gives the browser/search result a specific title for the support page.
export const metadata = {
  title: "Contact | Weather Atlas",
  description: "Contact Weather Atlas support."
};

// -----------------------------------------------------------------------------
// Contact page
// -----------------------------------------------------------------------------
// A simple support page that points users to the developer email address.
export default function ContactPage() {
  return (
    <main className="site-shell flex min-h-screen flex-col text-[var(--ink)]" data-theme="light">
      {/* Shared floating brand keeps navigation back to the main site available. */}
      <SiteBrand />
      {/* Main support message */}
      <div className="site-container flex flex-1 items-center py-32 md:py-40">
        <section className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--sun)]">Support</p>
          <h1 className="app-serif mt-5 text-5xl font-semibold leading-[0.96] tracking-normal md:text-7xl">We’re here to help.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--body)]">
            If you run into issues, want to suggest a feature, or just want to say hi, email:
          </p>
          <a
            href="mailto:yutao5726@gmail.com"
            className="mt-9 inline-flex rounded-full bg-[var(--sun)] px-7 py-4 text-base font-semibold text-[var(--ink)] transition hover:bg-[var(--partly)]"
          >
            yutao5726@gmail.com
          </a>
        </section>
      </div>
      {/* Shared footer keeps subpage navigation consistent */}
      <div className="mt-auto">
        <SiteFooter />
      </div>
    </main>
  );
}
