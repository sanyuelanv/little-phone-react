const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const nodeModuleDir = path.resolve(__dirname, 'node_module')

module.exports = {
  entry: path.resolve(__dirname, 'app/component/index.js'),
  output: {
    path: path.resolve(__dirname, 'dev/common'),
    filename: 'QUI.js',
    library: 'QUI',
    libraryTarget: 'window'
  },
  mode: 'production',
  // 4.0 之后分代码
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'app')],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?minimize=true&modules&localIdentName=_[local]_[hash:base64:5]',
          { loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: { path: path.resolve(__dirname, 'dev/postcss.config.js') }
            }
          }],
        include: [path.resolve(__dirname, 'app')],
        exclude: [nodeModuleDir]
      }
    ]
  }
}
