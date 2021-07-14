const config = require('./webpack.config');
const {merge} = require('webpack-merge');
const devServer = {
  hot: true,
  open:true,
  compress: true,
  port: 8080,
}
module.exports = merge(config, {
  mode: 'development',
  devServer
})
