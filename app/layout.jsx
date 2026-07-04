import "./globals.css";

export const metadata = {
  title: "Weather Atlas",
  description: "A simple private weather map app for comparing conditions across places."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
