const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')

const commonConfig = require('./webpack.config.js')

module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
          screw_ie8: true
        },
        comments: false
      }),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  })
}
