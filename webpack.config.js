const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devServer: {
    port: process.env.PORT,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['react-hot-loader/babel']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      base: '/'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
