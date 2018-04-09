const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { publicPath } = require('./config.json')
module.exports = {
  performance: { maxEntrypointSize: 400000 },
  entry: { app: [path.resolve(__dirname, 'app/config/resize.js'), path.resolve(__dirname, 'app/index.js')] },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].[chunkhash:5].js',
    publicPath: publicPath,
    filename: '[name].[chunkhash:5].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader?modules&localIdentName=_[local]_[hash:base64:5]', 'postcss-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: 'file-loader?name=[name].[ext]&outputPath=/images',
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    }
    ]
  },
  // 4.0 之后分代码
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    runtimeChunk: { name: () => { return 'manifest' } },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'build/index.html'),
      template: path.join(__dirname, 'app/index.html'),
      inject: true,
      chunks: ['manifest', 'common', 'app']
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom',
      PropTypes: 'prop-types'
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new CleanWebpackPlugin(['build'])
  ],
  mode: 'production'
}
