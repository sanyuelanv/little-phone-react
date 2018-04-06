'use strict'
import React from 'react'
import css from '../../css.css'
import View from '../view'
import PropTypes from 'prop-types'
import IScroll from '../../config/iscroll-probe'
import device from '../../config/device'
const TYPE = [IScroll.utils.ease.elastic, IScroll.utils.ease.quadratic, IScroll.utils.ease.circular, IScroll.utils.ease.back, IScroll.utils.ease.bounce]
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
    bounce: PropTypes.bool,
    renderTopRefreshControl: PropTypes.func,
    onTouchEnd: PropTypes.func,
    getRef: PropTypes.func,
    getScrollControl: PropTypes.func,
    getIScroll: PropTypes.func
  }
  scrollView = null
  iScroll = null
  _renderTopRefreshControl = this._renderTopRefreshControl.bind(this)
  _onTouchEnd = this.props.onTouchEnd ? this._onTouchEnd.bind(this) : null
  _getRef = this._getRef.bind(this)
  _setScrollControl = this._setScrollControl.bind(this)
  constructor (props) {
    super(props)
    if (!this.props.onTouchEnd) { this._onTouchEnd = null }
  }
  _onTouchEnd () { this.props.onTouchEnd(this.iScroll) }
  _setScrollControl (dist, time = 500, type) {
    // quadratic, circular, back, bounce, elastic
    const direction = this.props.direction || 'column'
    if (type > 4) { type = 0 }
    let x, y
    if (direction === 'column') {
      x = 0
      y = -dist
    }
    else {
      x = -dist
      y = 0
    }
    this.iScroll.scrollTo(x, y, time, TYPE[type], true)
  }
  _renderTopRefreshControl () { if (this.props.renderTopRefreshControl) { return this.props.renderTopRefreshControl() } }
  _getRef (scrollView) {
    this.scrollView = scrollView
    if (this.props.getRef) { this.props.getRef(scrollView) }
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
    const config = {
      useTransition: true,
      click: false,
      tap: true,
      fadeScrollbars: true,
      mouseWheel: true,
      scrollbars,
      scrollX,
      scrollY,
      bounce,
      disableMouse: true,
      probeType: 2
    }
    if (device === 'android') {
      config.useTransition = true
      // config.bounce = bounce
      // config.disableMouse = true
      // config.disablePointer = true
      // config.disableTouch = true
    }
    this.iScroll = new IScroll(this.scrollView, config)
    if (this.props.getIScroll) { this.props.getIScroll(this.iScroll) }
    if (this.props.getScrollControl) { this.props.getScrollControl(this._setScrollControl) }
    if (self.props.beforeScrollStart) { this.iScroll.on('beforeScrollStart', function () { self.props.beforeScrollStart(this) }) }
    if (self.props.scrollStart) { this.iScroll.on('scrollStart', function () { self.props.scrollStart(this) }) }
    if (self.props.scroll) { this.iScroll.on('scroll', function () { self.props.scroll(this) }) }
    if (self.props.scrollEnd) { this.iScroll.on('scrollEnd', function () { self.props.scrollEnd(this) }) }
    if (self.props.scrollCancel) { this.iScroll.on('scrollCancel', function () { self.props.scrollCancel(this) }) }
  }
  componentDidUpdate () {
    if (this.iScroll) {
      setTimeout(() => { this.iScroll.refresh() }, 0)
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
      <View
        className={`${className} ${css.scrollView}`}
        getRef={this._getRef}
        style={style}
        touchEnd={this._onTouchEnd}
      >
        <View
          className={`${directionClassName}`}
        >
          { content }
        </View>
        { this._renderTopRefreshControl() }
      </View>
    )
  }
}

export default ScrollView
