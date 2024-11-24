module.exports = {
  reactStrictMode: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn-icons-png.flaticon.com', 'gavi-nextjs.vercel.app'], // List each domain separately
  },
};

module.exports = nextConfig;


