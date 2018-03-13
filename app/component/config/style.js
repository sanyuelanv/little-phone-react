import postcssJs from 'postcss-js'
import autoprefixer from 'autoprefixer'
// import adaptive from 'postcss-adaptive-rpx'
export default postcssJs.sync([autoprefixer({ browsers: ['last 2 versions'] })])
