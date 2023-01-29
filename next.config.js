// const withTM = require('next-transpile-modules')([
//   'react-winbox',
// ]);
// module.exports = withTM({
//   // additional webpack configurations
// });


const nextConfig = {
  transpilePackages: [ 'lodash-es','next-transpile-modules'],
};

module.exports = nextConfig;