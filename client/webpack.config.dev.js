// webpack.config.dev.js
const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
  },
  plugins: [new ReactRefreshPlugin()],
});
