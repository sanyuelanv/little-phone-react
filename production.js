const path = require('path')
// const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkManifestHtmlWebpackPlugin = require('./dev/inline/index')
const { routers, publicPath } = require('./config.json')
const webpackConfig = {
  performance: { maxEntrypointSize: 400000 },
  entry: {},
  output: {
    path: path.resolve(__dirname, 'build/assets'),
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
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader?modules&localIdentName=_[local]_[hash:base64:5]',
        { loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            config: { path: path.resolve(__dirname, 'dev/postcss.config.js') }
          }
        }],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{ loader: 'url-loader?limit=25000&name=[name].[ext]&outputPath=/images&publicPath=./images' }],
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
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    runtimeChunk: { name: () => { return 'manifest' } },
    splitChunks: {
      cacheGroups: {
        globals: {
          minChunks: 2,
          name: 'globals',
          priority: -20,
          chunks: 'all'
        }
        // commons: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'common',
        //   chunks: 'all'
        // }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new CleanWebpackPlugin(['build'])
  ],
  mode: 'production'
}
routers.map((item, index) => {
  const {
    name,
    template
  } = item
  // 每个页面使用一个entry配置
  const routerScript = [path.resolve(__dirname, `app/router/${template}/index.js`)]
  const plugin = new HtmlWebpackPlugin({
    filename: `../${template}.html`,
    title: name,
    template: path.resolve(__dirname, `app/router/${template}/index.html`),
    inject: true,
    minify: {
      collapseWhitespace: true,
      conservativeCollapse: true
    },
    chunks: ['manifest', 'globals', template]
  })
  webpackConfig.entry[template] = routerScript
  webpackConfig.plugins.push(plugin)
})
webpackConfig.plugins.push(new InlineChunkManifestHtmlWebpackPlugin({ inlineChunks: ['manifest'] }))

module.exports = webpackConfig
