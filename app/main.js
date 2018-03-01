'use strict'
import React from 'react'
import { render } from 'react-dom'
import App from './component'
import './config/resize'
import 'babel-polyfill'

const main = function () {
  render(<App />, document.getElementById('main'))
}
window.onload = function () {
  main()
}
