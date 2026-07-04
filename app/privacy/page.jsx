import SiteFooter from "../SiteFooter";

// -----------------------------------------------------------------------------
// Privacy page metadata
// -----------------------------------------------------------------------------
// Gives the browser/search result a specific title for the legal page.
export const metadata = {
  title: "Privacy Policy | Weather Atlas",
  description: "Weather Atlas privacy policy."
};

// -----------------------------------------------------------------------------
// Privacy policy content
// -----------------------------------------------------------------------------
// Stored as structured data so the rendered page stays easy to scan and update.
const sections = [
  {
    title: "Overview",
    body: [
      "Weather Atlas is designed to be a small, private weather map app. The app does not collect personal information, does not create user accounts, does not show ads, and does not use tracking technologies.",
      "Your saved places, custom lists, map preferences, theme preferences, and other app settings are stored on your device."
    ]
  },
  {
    title: "Data Weather Atlas Stores",
    body: [
      "Weather Atlas stores app data locally on your device so the app can remember your saved places and preferences. This may include saved cities, custom city lists, the selected list, map overlay mode, display settings, and theme settings.",
      "This information is not sent to servers operated by Weather Atlas. If you delete the app or clear its data, locally stored app data may be removed. Depending on your Apple device settings, local app data may also be included in device backups managed by Apple."
    ]
  },
  {
    title: "Weather And Map Services",
    body: [
      "To show weather forecasts, Weather Atlas requests weather information for the places you view or save. The app uses Apple WeatherKit for weather data.",
      "To display the map, the app may request map style, map tile, or related map resources from map service providers. These requests are used to render the map and are not used by Weather Atlas to identify you, track you, or build a profile about you."
    ]
  },
  {
    title: "No Tracking Or Analytics",
    body: [
      "Weather Atlas does not use advertising SDKs, third-party analytics SDKs, cross-app tracking, or data brokers.",
      "Weather Atlas does not sell personal information and does not share personal information for advertising or marketing."
    ]
  },
  {
    title: "Location",
    body: [
      "Weather Atlas is built around places you choose on the map or save in lists. The app does not need to collect your identity to provide weather for those places.",
      "If a future version adds device-location features, this policy will be updated before that change is released."
    ]
  },
  {
    title: "Children",
    body: [
      "Weather Atlas does not knowingly collect personal information from children."
    ]
  },
  {
    title: "Changes",
    body: [
      "If Weather Atlas's privacy practices change, this policy will be updated. The date at the top of the page shows when it was last revised."
    ]
  },
  {
    title: "Contact",
    body: [
      "For privacy questions, contact the developer through the support or contact link provided with the app."
    ]
  }
];

// -----------------------------------------------------------------------------
// Privacy policy page
// -----------------------------------------------------------------------------
// Explains that Weather Atlas stores app data locally and does not collect
// personal information.
export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FBF8F2] text-[#003D99]">
      <div className="mx-auto max-w-4xl px-5 py-20 md:px-10 lg:px-16">
        {/* Page title and revision date */}
        <header className="mb-16">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-[#FF8A65]">Privacy Policy</p>
          <h1 className="text-5xl font-semibold leading-none tracking-normal md:text-7xl">Weather Atlas Privacy Policy</h1>
          <p className="mt-6 text-base leading-8 text-[#2E2961]/62">Last updated: May 20, 2026</p>
        </header>

        {/* Plain-language summary before the detailed policy sections */}
        <section className="mb-14 rounded-[28px] border border-[#E6E1D9] bg-white/72 p-6 shadow-[0_22px_70px_rgba(46,41,97,0.08)] md:p-8">
          <h2 className="text-2xl font-semibold tracking-normal">Short version</h2>
          <p className="mt-4 text-lg leading-8 text-[#2E2961]/72">
            Weather Atlas does not collect your personal data. The app stores your saved places and preferences on your device, and uses weather and map services only to show the weather map.
          </p>
        </section>

        {/* Detailed privacy sections generated from the structured content above */}
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-[#E6E1D9] pt-8">
              <h2 className="text-2xl font-semibold tracking-normal">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-[#2E2961]/72">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      {/* Shared footer keeps subpage navigation consistent */}
      <div className="mt-auto">
        <SiteFooter />
      </div>
    </main>
  );
}
