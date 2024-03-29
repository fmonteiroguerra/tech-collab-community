const webpack = require('webpack');

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }

  // Ajuste o limite do aviso de tamanho do chunk para 500 KiB
  config.plugins.push(
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    })
  );

  return config;
};