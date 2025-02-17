const webpack = require('webpack');
const enhancedResolve = require('enhanced-resolve');

module.exports = function override(config, env) {
  // Create custom resolver
  const resolveNodePrefixImports = {
    apply: (resolver) => {
      const target = resolver.ensureHook('resolve');
      resolver.getHook('resolve').tapAsync(
        'ResolveNodePrefixPlugin',
        (request, resolveContext, callback) => {
          if (request.request && request.request.startsWith('node:')) {
            const moduleName = request.request.slice(5); // Remove 'node:' prefix
            const newRequest = {
              ...request,
              request: moduleName,
            };
            resolver.doResolve(
              target,
              newRequest,
              null,
              resolveContext,
              callback,
            );
            return;
          }
          callback();
        },
      );
    },
  };

  // Add the custom resolver plugin
  config.resolve.plugins = [...(config.resolve.plugins || []), resolveNodePrefixImports];

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