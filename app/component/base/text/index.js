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
  static defaultProps = {
    children: null,
    className: ''
  }
  render () {
    const children = this.props.children
    const className = this.props.className
    return (
      <View className={`${className} ${style.text}`}>{ children }</View>
    )
  }
}

export default Text
