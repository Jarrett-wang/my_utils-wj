const config = require('./webpack.config');
const {merge} = require('webpack-merge');
const webpack = require('webpack');
// const serverConfig = require(`./config/servers/${process.env.SERVER_ENV}.config`);

module.exports = merge(config, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins:[
    new webpack.DefinePlugin({
      // SERVER: JSON.stringify(serverConfig),
      SERVER: "wj",
    }),
  ]
})
