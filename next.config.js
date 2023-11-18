/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,

  images: {
    remotePatterns: [{ hostname: "localhost" }],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/pictures",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
