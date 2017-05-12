const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = function () {
  return {
    context: __dirname,
    entry: {
      vendor: ['react', 'react-dom', 'react-router-dom'],
      app: './client/components/BrowserEntry.js'
    },
    output: {
      path: path.join(__dirname, 'public'),
      publicPath: '/public/',
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    node: {
      net: 'empty',
      dns: 'empty'
    },
    stats: 'minimal',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          exclude: [/node_modules/, /production/]
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader?sourceMap',
          exclude: [/node_modules/]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'postcss-loader'
            ]
          })
        }
      ]
    },
    devtool: 'cheap-module-source-map',
    performance: {
      hints: 'warning',
      maxEntrypointSize: 400000,
      maxAssetSize: 300000
    },
    plugins: [
      new ExtractTextPlugin('/css/style.css'),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Tether: 'tether'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: Infinity
      }) // ,
      // new BundleAnalyzerPlugin()
    ]
  }
}
