/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true, // by default, if you customize webpack config, they switch back to version 4.
  // Looks like backward compatibility approach.
  webpack(config) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
