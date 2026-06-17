/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/elite-training',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
