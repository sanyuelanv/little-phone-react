'use strict'
import React from 'react'
import css from '../../css.css'
import PropTypes from 'prop-types'
import IScroll from 'iscroll'
import device from '../../config/device'
class ScrollView extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    scrollbars: PropTypes.bool,
    direction: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.scrollView = null
  }
  componentDidMount () {
    const scrollbars = this.props.scrollbars === undefined ? true : this.props.scrollbars
    const direction = this.props.direction || 'column'
    let scrollX = false
    let scrollY = true
    if (direction === 'row') {
      scrollX = true
      scrollY = false
    }

    let config = {}
    if (device === 'ios') {
      config = {
        click: true,
        tap: true,
        mouseWheel: true,
        scrollbars,
        scrollX,
        scrollY
      }
    }
    else {
      config = {
        click: true,
        tap: true,
        disablePointer: true,
        disableTouch: false,
        disableMouse: false,
        bounce: false,
        mouseWheel: true,
        scrollbars,
        scrollX,
        scrollY
      }
    }
    new IScroll(this.scrollView, config)
  }
  render () {
    const content = this.props.children || null
    const className = this.props.className || ''
    const style = this.props.style || {}
    const direction = this.props.direction || 'column'
    const directionClassName = direction === 'column' ? css.scrollViewWrap : css.scrollViewWrapRow
    return (
      <div
        className={`${className} ${css.scrollView}`}
        ref={(scrollView) => { this.scrollView = scrollView }}
        style={style}
      >
        <div
          className={`${directionClassName}`}
        >
          { content }
        </div>
      </div>
    )
  }
}

export default ScrollView
