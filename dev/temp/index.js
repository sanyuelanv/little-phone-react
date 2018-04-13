'use strict'
import '../../config/resize'
import Router from './router'
const { App } = window.QUI
class Main extends React.Component { render () { return (<App > <Router /> </App>) } }
const enter = function () { ReactDOM.render(<Main />, document.getElementById('main')) }
window.onload = function () { enter() }
