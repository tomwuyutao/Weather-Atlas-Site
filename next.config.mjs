/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves the project below this repository name, not at `/`.
  basePath: '/Weather-Atlas-Site',
  output: 'export',
  trailingSlash: true,
  images: {
    // The GitHub Pages export is static and has no image optimisation server.
    unoptimized: true,
  },
};

export default nextConfig;
