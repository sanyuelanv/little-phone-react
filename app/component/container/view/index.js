'use strict'
import React from 'react'
import css from '../../css.css'
import PropTypes from 'prop-types'
import changeStyle from '../../config/style'
class View extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object
  }
  render () {
    const content = this.props.children || null
    const className = this.props.className || ''
    let style = this.props.style || {}
    style = changeStyle(style)
    return (
      <div
        className={`${className} ${css.view}`}
        style={style}
      >{ content }</div>
    )
  }
}

export default View
