/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  headers: () => [
    {
      source: "/cached/:path*",
      headers: [
        {
          key: "cache-control",
          value: "public, max-age=31531000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
