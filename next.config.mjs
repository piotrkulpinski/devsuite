/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*.google.com" }, { hostname: "*.amazonaws.com" }],
  },
}

export default nextConfig
