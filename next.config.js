/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cyber-system-old.vercel.app",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
};

module.exports = nextConfig;
