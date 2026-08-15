import "./globals.css";

// -----------------------------------------------------------------------------
// Site metadata
// -----------------------------------------------------------------------------
// Used by Next.js to populate browser and search preview metadata.
export const metadata = {
  title: "Weather Atlas",
  description: "A simple sun-seeker weather app for comparing conditions across places."
};

// -----------------------------------------------------------------------------
// Root document shell
// -----------------------------------------------------------------------------
// All pages are rendered inside this shared HTML/body wrapper.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
