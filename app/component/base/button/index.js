'use strict'
import React from 'react'
import View from '../../container/view'
import PropTypes from 'prop-types'
class Button extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    tapClassName: PropTypes.string,
    touchStart: PropTypes.func,
    tap: PropTypes.func,
    touchMove: PropTypes.func,
    touchEnd: PropTypes.func,
    touchCancel: PropTypes.func
  }
  _touchStart = this._touchStart.bind(this)
  _touchEnd = this._touchEnd.bind(this)
  _touchCancel = this._touchCancel.bind(this)
  _setClassName = this._setClassName.bind(this)
  constructor (props) {
    super(props)
    this.state = { className: this.props.className || '' }
  }
  _touchStart (e) {
    this._setClassName(0)
    if (this.props.touchStart) { this.props.touchStart() }
  }
  _touchEnd (e) {
    this._setClassName(1)
    if (this.props.touchEnd) { this.props.touchEnd() }
  }
  _touchCancel (e) {
    this._setClassName(1)
    if (this.props.touchCancel) { this.props.touchCancel() }
  }
  _setClassName (type) {
    if (this.props.tapClassName && this.props.className) {
      let className = null
      if (type === 0) { className = this.props.tapClassName }
      else { className = this.props.className }
      this.setState({ className })
    }
  }
  render () {
    const children = this.props.children || ''
    return (
      <View
        {...this.props}
        tap={this.props.tap}
        touchStart={this._touchStart}
        touchEnd={this._touchEnd}
        touchCancel={this._touchCancel}
        className={this.state.className}
      >
        { children }
      </View>
    )
  }
}

export default Button
