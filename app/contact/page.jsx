import SiteFooter from "../SiteFooter";

export const metadata = {
  title: "Contact | Weather Atlas",
  description: "Contact Weather Atlas support."
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FBF8F2] text-[#003D99]">
      <div className="mx-auto flex min-h-[68vh] max-w-4xl flex-col justify-center px-5 py-20 md:px-10 lg:px-16">
        <section className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-[#FF8A65]">Contact</p>
          <h1 className="text-5xl font-semibold leading-none tracking-normal md:text-7xl">Say hello.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#2E2961]/72">
            If you run into issues, want to suggest a feature, or just want to say hi, email:
          </p>
          <a
            href="mailto:yutao5726@gmail.com"
            className="mt-8 inline-flex rounded-full bg-[#F4B65E] px-7 py-4 text-base font-semibold text-[#2E2961] shadow-[0_18px_45px_rgba(244,182,94,0.28)] transition hover:bg-[#FFD071]"
          >
            yutao5726@gmail.com
          </a>
        </section>
      </div>
      <div className="mt-auto">
        <SiteFooter />
      </div>
    </main>
  );
}
