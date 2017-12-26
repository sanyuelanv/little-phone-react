var autoprefixer = require('autoprefixer')
var adaptive = require('postcss-adaptive')
module.exports = {
    plugins: [
      autoprefixer({ browsers: ['last 2 versions'] }),
      adaptive({ remUnit: 75 })
    ]
}
