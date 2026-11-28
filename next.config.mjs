/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves static files only, so build to ./out with no server.
  output: "export",
  // Pages has no image optimization server.
  images: { unoptimized: true },
  // /resume -> /resume/index.html, which Pages serves without extra config.
  trailingSlash: true,
  reactStrictMode: true,
  // Fixed at build time, so the footer's "Last updated" is the deploy date
  // in the browser too (not the visitor's clock).
  env: { BUILD_DATE: new Date().toISOString() },
};

export default nextConfig;
