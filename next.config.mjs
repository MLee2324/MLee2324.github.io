/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves static files only, so build to ./out with no server.
  output: "export",
  // Pages has no image optimization server.
  images: { unoptimized: true },
  // /resume -> /resume/index.html, which Pages serves without extra config.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
