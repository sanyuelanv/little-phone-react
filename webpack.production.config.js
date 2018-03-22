const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { publicPath } = require('./config.json')
module.exports = {
  entry: {
    app: ['babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, 'app/config/resize.js'), 'react', 'react-dom', path.resolve(__dirname, 'app/index.js')]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].[chunkhash:5].js',
    publicPath: publicPath,
    // 这里需要根据服务器来更改，
    filename: 'app.[chunkhash:5].js'
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
      use: ExtractTextPlugin.extract({
        use: ['css-loader?minimize&modules&localIdentName=_[local]_[hash:base64:5]', 'postcss-loader']
      }),
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: 'file-loader?name=[name].[ext]&outputPath=/',
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    }

    ]
  },
  node: { Buffer: false },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath(path.join('[name].[chunkhash:5].css'))
      },
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      // 把你用到的，存在在node_modules里面的都打包出来
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      },
      filename: 'common.[chunkhash:5].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.[chunkhash:5].js'
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'build/index.html'),
      template: path.join(__dirname, 'app/index.html'),
      inject: true,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true
      },
      chunks: ['manifest', 'common', 'app']
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom',
      PropTypes: 'prop-types'
    })
  ]
}
