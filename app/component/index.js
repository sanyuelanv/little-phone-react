'use strict'
import React from 'react'
import style from './css.css'
import icon from '../image/icon.svg'
import PropTypes from 'prop-types'
class App extends React.Component {
  static propTypes = {
    nav: PropTypes.string.isRequired
  }
  render () {
    const { nav } = this.props
    return (
      <div className={style.all} >
        <div className={style.box}>
          <img className={style.image} src={icon} />
          <div className={style.image2}>{ nav }</div>
        </div>
      </div>
    )
  }
}

export default App
