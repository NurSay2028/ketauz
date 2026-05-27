import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  // Cloudflare Pages compatibility
  // output: 'export', // Uncomment for static export
};

export default withNextIntl(nextConfig);
