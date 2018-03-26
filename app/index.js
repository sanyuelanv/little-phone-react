'use strict'
import App from './router/scroll'
// import App from './router/index'
const main = function () {
  ReactDom.render(<App />, document.getElementById('main'))
}
window.onload = function () {
  main()
}
