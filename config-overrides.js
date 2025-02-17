const webpack = require('webpack');

module.exports = function override(config, env) {
  // Handle node: scheme imports
  config.resolve.alias = {
    ...config.resolve.alias,
    'node:events': 'events',
  };

  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    child_process: false,
    net: false,
    tls: false,
    http2: false,
    stream: require.resolve('stream-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    zlib: require.resolve('browserify-zlib'),
    path: require.resolve('path-browserify'),
    crypto: require.resolve('crypto-browserify'),
    util: require.resolve('util/'),
    url: require.resolve('url/'),
    assert: require.resolve('assert/'),
    buffer: require.resolve('buffer/'),
    os: require.resolve('os-browserify/browser'),
    querystring: require.resolve('querystring-es3'),
    events: require.resolve('events/')
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ];

  return config;
}; 