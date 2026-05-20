const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = {
  title: "Contact | Weather Map",
  description: "Contact Weather Map support."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#17152F] px-5 py-8 text-weather-text md:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col">
        <nav className="mb-16">
          <a href={`${publicBasePath}/`} className="text-sm font-medium text-weather-cloud/68 transition hover:text-weather-text">
            Weather Map
          </a>
        </nav>

        <section className="my-auto max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-weather-cloud/58">Contact</p>
          <h1 className="text-5xl font-semibold leading-none tracking-normal md:text-7xl">Say hello.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-weather-muted/72">
            If you run into issues, want to suggest a feature, or just want to say hi, email:
          </p>
          <a
            href="mailto:yutao5726@gmail.com"
            className="mt-8 inline-flex rounded-full border border-white/10 bg-weather-light px-7 py-4 text-base font-semibold text-[#2E2961] shadow-bloom transition hover:scale-[1.01]"
          >
            yutao5726@gmail.com
          </a>
        </section>

        <footer className="mt-16 border-t border-white/10 py-8 text-sm leading-6 text-weather-cloud/52">
          <p>Weather, on a map.</p>
        </footer>
      </div>
    </main>
  );
}
