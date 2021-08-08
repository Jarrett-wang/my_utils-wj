const config = require('./webpack.config');
const {merge} = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(config, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins:[
    new webpack.DefinePlugin({
      // SERVER: "wj",
    }),
  ]
})
