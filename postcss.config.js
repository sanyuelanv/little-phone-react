const autoprefixer = require('autoprefixer')
const adaptive = require('postcss-adaptive-rpx')
module.exports = {
  plugins: [
    autoprefixer({ browsers: ['last 2 versions'] }),
    adaptive({ remUnit: 75 })
  ]
}
