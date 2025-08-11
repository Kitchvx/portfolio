// next.config.mjs
/** @type {import('next').NextConfig} */
const isExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_BASE_PATH || ""; // e.g. '/v2' when previewing in a subfolder

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // only apply these when doing a static export
  ...(isExport && {
    output: "export",
    images: { unoptimized: true },
  }),
  ...(basePath && { basePath }),
  experimental: { typedRoutes: false },
};

export default nextConfig;
