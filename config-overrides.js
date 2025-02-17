const webpack = require('webpack');

// HTTP2 Constants that need to be polyfilled
const http2Constants = {
  HTTP2_HEADER_CONTENT_ENCODING: 'content-encoding',
  HTTP2_HEADER_CONTENT_TYPE: 'content-type',
  HTTP2_HEADER_STATUS: ':status',
  HTTP2_HEADER_METHOD: ':method',
  HTTP2_HEADER_PATH: ':path',
  HTTP2_HEADER_AUTHORITY: ':authority'
};

module.exports = function override(config, env) {
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
    }),
    new webpack.NormalModuleReplacementPlugin(
      /^node:/,
      (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }
    ),
    new webpack.DefinePlugin({
      'process.stdout': JSON.stringify({ isTTY: false, write: () => {} }),
      'process.stderr': JSON.stringify({ isTTY: false, write: () => {} }),
      'require("http2").constants': JSON.stringify(http2Constants),
      'require("node:http2").constants': JSON.stringify(http2Constants)
    })
  ];

  return config;
}; 