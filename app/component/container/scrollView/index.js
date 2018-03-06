'use strict'
import React from 'react'
import style from './css.css'
import View from '../view'
class ScrollView extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }
  render () {
    const content = this.props.children || ''
    const className = this.props.className || ''
    return (
      <View className={`${style.view} ${className}`}>{ content }</View>
    )
  }
}

export default ScrollView
