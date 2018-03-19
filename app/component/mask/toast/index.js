'use strict'
import React from 'react'
import style from '../../css.css'
import PropTypes from 'prop-types'
class Toast extends React.Component {
  static propTypes = {
    text: PropTypes.string
  }
  constructor (props) {
    super(props)
    this._onTransitionEnd = this._onTransitionEnd.bind(this)
  }
  _onTransitionEnd () {
  }
  render () {
    return (
      <div
        className={style.toastBox}
      >
        {this.props.text}
      </div>
    )
  }
}

export default Toast
