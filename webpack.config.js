const path = require('path')
const webpack = require('webpack')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  consoleConfig,
  netWork
} = require('./config.json')
const scriptArray = ['babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, 'app/resize.js'), 'react', 'react-dom']
if (consoleConfig) {
  scriptArray.push(path.resolve(__dirname, 'app/console.js'))
}
scriptArray.push(path.resolve(__dirname, 'app/index.js'))
const webpackConfig = {
  entry: {
    app: scriptArray
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      '/api': {
        target: '',
        secure: false
      }
    },
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: netWork.proxy,
    host: netWork.host,
    historyApiFallback: true
  },
  plugins: [
    // 能在所有JS模块里面读取“__DEV__”这个值
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV || 'true'))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // 把React 定义为全局变量
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom',
      PropTypes: 'prop-types'
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'build/index.html'),
      template: path.join(__dirname, 'app/index.html'),
      inject: true,
      chunks: ['app']
    })
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader?modules&localIdentName=_[local]_[hash:base64:5]', 'postcss-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    }
    ]
  }
}

module.exports = webpackConfig
