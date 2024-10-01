/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*.google.com" }],
  },
}

export default nextConfig
