const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeModuleDir = path.resolve(__dirname, 'node_module')

module.exports = {
  entry: {
    app: ['whatwg-fetch', path.resolve(__dirname, 'app/main.js')]
  },
  output: {
    path: path.resolve(__dirname, 'build/js'),
    chunkFilename: '[name].[chunkhash:5].js',
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
      use: 'file-loader?name=[name].[ext]&outputPath=../image/',
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
        return getPath(path.join('..', 'css', '[name].[chunkhash:5].css')).replace('css/js', 'css')
      },
      allChunks: true
    })
  ]
}
