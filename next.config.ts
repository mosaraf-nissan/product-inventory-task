/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["v0.blob.com", "scottishgrocer.co.uk"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v0.blob.com",
      },
      {
        protocol: "https",
        hostname: "scottishgrocer.co.uk",
      },
    ],
  },
};

module.exports = nextConfig;
