const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
  entry: ['whatwg-fetch', './src/index.js'],
  devtool: 'cheap-module-source-map',
  devServer: {
    port: process.env.PORT,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        pathRewrite: { '^/api': '' }
      }
    }
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
        test: /\.svg$/,
        use: ['url-loader']
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
    new ErrorOverlayPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
