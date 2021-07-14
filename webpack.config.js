
const path= require('path')
const webpack = require('webpack');
const { name } = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const obj={name:'dev'}
module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    main: './src/index.js'
    },
  output:{
    path: path.resolve(__dirname,`./dist`),
    filename: '[name].[hash].js',
  },
  module:{
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            },
          },
      },
      {
        test: /\.(css||less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ]
    },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: name,
      template: path.resolve('public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // SERVER: JSON.stringify(serverConfig),
      SERVER: JSON.stringify(obj),
    }),
  ]
}