/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", //comment out when in dev
  trailingSlash: true,
  assetPrefix: "./", //comment out when in dev
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
