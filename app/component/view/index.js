'use strict'
import React from 'react'
import style from './css.css'
class View extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }
  render () {
    const content = this.props.children || ''
    const className = this.props.className || ''
    return (
      <div className={`${style.view} ${className}`} >{ content }</div>
    )
  }
}

export default View
