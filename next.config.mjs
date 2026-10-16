/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1536, 1920, 2560],
    qualities: [75, 82, 90],
  },
  poweredByHeader: false,
}

export default nextConfig
