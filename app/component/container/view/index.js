'use strict'
import React from 'react'
import css from '../../css.css'
import PropTypes from 'prop-types'
class View extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    tapClassName: PropTypes.string,
    style: PropTypes.object,
    touchstart: PropTypes.func,
    tap: PropTypes.func,
    touchMove: PropTypes.func,
    touchEnd: PropTypes.func,
    touchCancel: PropTypes.func,
    transitionEnd: PropTypes.func,
    animationStart: PropTypes.func,
    animationIteration: PropTypes.func,
    animationEnd: PropTypes.func,
    contextMenu: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      className: this.props.className || ''
    }
    this.tapFlag = false
    this._touchstart = this._touchstart.bind(this)
    this._touchMove = this._touchMove.bind(this)
    this._touchEnd = this._touchEnd.bind(this)
    this._touchCancel = this._touchCancel.bind(this)
    this._transitionEnd = this._transitionEnd.bind(this)
    this._animationStart = this._animationStart.bind(this)
    this._animationIteration = this._animationIteration.bind(this)
    this._animationEnd = this._animationEnd.bind(this)
    this._contextMenu = this._contextMenu.bind(this)
  }
  _touchstart (e) {
    this.tapFlag = true
    if (this.props.tapClassName && this.props.className) {
      const className = `${this.props.className} ${this.props.tapClassName}`
      this.setState({ className })
    }
    if (this.props.touchstart) { this.props.touchstart(e) }
  }
  _touchMove (e) {
    this.tapFlag = false
    if (this.props.touchMove) { this.props.touchMove(e) }
  }
  _touchEnd (e) {
    if (this.props.tapClassName && this.props.className) {
      const className = this.props.className
      this.setState({ className })
    }
    if (this.props.tap && this.tapFlag) {
      this.props.tap()
    }
    if (this.props.touchEnd) { this.props.touchEnd(e) }
  }
  _touchCancel (e) {
    if (this.tapFlag) { this.tapFlag = false }
    if (this.props.touchCancel) { this.props.touchCancel(e) }
  }
  _transitionEnd (e) {
    if (this.props.transitionEnd) { this.props.transitionEnd(e) }
  }
  _animationStart (e) {
    if (this.props.animationStart) { this.props.animationStart(e) }
  }
  _animationIteration (e) {
    if (this.props.animationIteration) { this.props.animationIteration(e) }
  }
  _animationEnd (e) {
    if (this.props.animationEnd) { this.props.animationEnd(e) }
  }
  _contextMenu (e) {
    // e.preventDefault()
    if (this.props.contextMenu) { this.props.contextMenu(e) }
  }
  render () {
    const content = this.props.children || null
    const style = this.props.style || {}
    return (
      <div
        className={`${this.state.className} ${css.view}`}
        style={style}
        onTouchStart={this._touchstart}
        onTouchMove={this._touchMove}
        onTouchEnd={this._touchEnd}
        onTouchCancel={this._touchCancel}
        onTransitionEnd = {this._transitionEnd}
        onAnimationStart = {this._animationStart}
        onAnimationIteration = {this._animationIteration}
        onAnimationEnd = {this._animationEnd}
        onContextMenu = {this._contextMenu}
      >{ content }</div>
    )
  }
}

export default View
