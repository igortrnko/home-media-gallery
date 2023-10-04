/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,

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
