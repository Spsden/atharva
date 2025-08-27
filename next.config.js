// const withTM = require('next-transpile-modules')([
//   'react-winbox',
// ]);
// module.exports = withTM({
//   // additional webpack configurations
// });


const nextConfig = {
  transpilePackages: [ 'lodash-es','next-transpile-modules'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
    ],
  }
};

module.exports = nextConfig;