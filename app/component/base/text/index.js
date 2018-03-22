'use strict'
import React from 'react'
import View from '../../container/view'
import style from '../../css.css'
import PropTypes from 'prop-types'
class Text extends React.Component {
  static propTypes = {
    children: PropTypes.string,
    className: PropTypes.string
  }
  render () {
    const children = this.props.children || ''
    const className = this.props.className || ''
    return (
      <View {...this.props} className={`${className} ${style.text}`}>{ children }</View>
    )
  }
}

export default Text
