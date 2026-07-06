// -----------------------------------------------------------------------------
// Shared download capsule
// -----------------------------------------------------------------------------
// A custom iOS download CTA used instead of the official App Store badge. It
// keeps the site visually closer to the rounded capsule style in the references.
export default function DownloadButton({ href, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`download-pill inline-flex items-center justify-center gap-3 rounded-full px-9 py-4 text-lg font-semibold transition ${className}`}
      aria-label="Download Weather Atlas for iOS"
    >
      <span>Download for iOS</span>
      <span aria-hidden="true" className="text-xl leading-none"></span>
    </a>
  );
}
