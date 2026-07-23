module.exports = function override(config, env) {
  // Fix for "fully specified" ESM module error in Webpack 5
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};
