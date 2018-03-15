'use strict'
import React from 'react'
import css from '../../css.css'
import PropTypes from 'prop-types'
import IScroll from '../../config/iscroll-probe'
import device from '../../config/device'
class ScrollView extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    scrollbars: PropTypes.bool,
    direction: PropTypes.string,
    beforeScrollStart: PropTypes.func,
    scrollStart: PropTypes.func,
    scroll: PropTypes.func,
    scrollEnd: PropTypes.func,
    scrollCancel: PropTypes.func,
    refresh: PropTypes.func,
    refreshTime: PropTypes.number,
    bounce: PropTypes.bool,
    renderTopRefreshControl: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.scrollView = null
    this.iScroll = null
    this._refresh = this._refresh.bind(this)
    this._renderTopRefreshControl = this._renderTopRefreshControl.bind(this)
  }
  _refresh () {
    if (this.props.refresh && this.iScroll) {
      const time = this.props.refreshTime || 10
      setTimeout(() => { this.iScroll.refresh() }, time)
    }
  }
  _renderTopRefreshControl () {
    if (this.props.renderTopRefreshControl) {
      return this.props.renderTopRefreshControl()
    }
  }
  componentDidMount () {
    const scrollbars = this.props.scrollbars === undefined ? true : this.props.scrollbars
    const direction = this.props.direction || 'column'
    const bounce = this.props.bounce === undefined ? false : this.props.bounce
    const self = this
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
        fadeScrollbars: true,
        mouseWheel: true,
        scrollbars,
        scrollX,
        scrollY,
        bounce,
        probeType: 2
      }
    }
    else {
      config = {
        click: true,
        tap: true,
        fadeScrollbars: false,
        disablePointer: true,
        disableTouch: false,
        disableMouse: false,
        bounce,
        mouseWheel: true,
        scrollbars,
        scrollX,
        scrollY,
        probeType: 2
      }
    }
    this.iScroll = new IScroll(this.scrollView, config)
    this.iScroll.on('beforeScrollStart', function () { if (self.props.beforeScrollStart) { self.props.beforeScrollStart(this) } })
    this.iScroll.on('scrollStart', function () { if (self.props.scrollStart) { self.props.scrollStart(this) } })
    this.iScroll.on('scroll', function () { if (self.props.scroll) { self.props.scroll(this) } })
    this.iScroll.on('scrollEnd', function () { if (self.props.scrollEnd) { self.props.scrollEnd(this) } })
    this.iScroll.on('scrollCancel', function () { if (self.props.scrollCancel) { self.props.scrollCancel(this) } })
  }
  componentDidUpdate () {
    if (this.iScroll) {
      const time = this.props.refreshTime || 10
      setTimeout(() => { this.iScroll.refresh() }, time)
    }
  }
  componentWillUnmount () {
    this.iScroll.destroy()
    this.iScroll = null
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
        { this._renderTopRefreshControl() }
      </div>
    )
  }
}

export default ScrollView
