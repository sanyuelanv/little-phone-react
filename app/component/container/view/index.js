'use strict'
import React from 'react'
import css from '../../css.css'
import PropTypes from 'prop-types'
class View extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
  }
  render () {
    const content = this.props.children || ''
    const className = this.props.className || ''
    return (
      <div
        className={`${className} ${css.view}`}
      >{ content }</div>
    )
  }
}

export default View
