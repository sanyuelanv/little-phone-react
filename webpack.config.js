const path = require('path')
const os = require('os')
const webpack = require('webpack')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { consoleConfig, netWork } = require('./config.json')
// 根据开发配置来判断是否引入 console.js
const scriptArray = ['babel-polyfill', 'whatwg-fetch', path.resolve(__dirname, 'app/config/resize.js')]
if (consoleConfig) { scriptArray.push(path.resolve(__dirname, 'app/config/console.js')) }
scriptArray.push(path.resolve(__dirname, 'app/index.js'))
// 判断本机IP
const ifaces = os.networkInterfaces()
const ips = []
let IP = 'localhost'
for (const key in ifaces) {
  if (ifaces.hasOwnProperty(key)) {
    const arr = ifaces[key]
    arr.map((item, index) => {
      if (item.address !== '127.0.0.1' && item.family === 'IPv4' && item.mac !== '00:00:00:00:00:00') {
        ips.push(item.address)
      }
    })
  }
}
if (ips.length === 1) { IP = ips[0] }
const webpackConfig = {
  entry: { app: scriptArray },
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
    host: IP,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 把React,ReactDom,PropTypes 定义为全局变量
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
  },
  mode: 'development'
}

module.exports = webpackConfig
