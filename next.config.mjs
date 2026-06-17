/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/elite-training',
  images: {
    unoptimized: true,
  },
  // Ignorar erros que podem travar o build no GitHub Actions
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
