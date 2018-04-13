const path = require('path')
const webpack = require('webpack')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { routers, consoleConfig } = require('../config.json')
// 根据开发配置来判断是否引入 console.js
// 开发内置  console ／ hotMiddle
const scriptArray = [
  path.resolve(__dirname, '../app/component/config/console.js'),
  'webpack-hot-middleware/client?reload=true'
]

const webpackConfig = {
  entry: {},
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // PropTypes 定义为全局变量
    new webpack.ProvidePlugin({
      PropTypes: 'prop-types'
    })
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: [path.resolve(__dirname, '../app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?modules&localIdentName=_[local]_[hash:base64:5]',
        { loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            config: { path: path.resolve(__dirname, 'postcss.config.js') }
          }
        }
      ],
      include: [path.resolve(__dirname, '../app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: { limit: 2500 }
      }],
      include: [path.resolve(__dirname, '../app')],
      exclude: [nodeModuleDir]
    }
    ]
  }
}
// webpack entry&plugins 配置
routers.map((item, index) => {
  const {
    name,
    template
  } = item
  // 每个页面使用一个entry配置
  const routerScript = []
  scriptArray.map((js, i) => {
    // 倒数第一个之前加入当前页面的JS
    if (i === scriptArray.length - 1) {
      const script = path.resolve(__dirname, `../app/router/${template}/index.js`)
      routerScript.push(script)
    }
    // 开启了console才把他加进去
    if (!consoleConfig && i === 0) { return }
    routerScript.push(js)
  })
  const tempSrc = path.resolve(__dirname, `../app/router/${template}/index.html`)
  const plugin = new HtmlWebpackPlugin({
    filename: `${template}.html`,
    title: name,
    template: tempSrc,
    inject: true,
    chunks: [template]
  })
  webpackConfig.entry[template] = routerScript
  webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig
