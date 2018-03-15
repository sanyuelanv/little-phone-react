'use strict'
import React from 'react'
import style from '../../css.css'
class LoadIcon extends React.Component {
  static propTypes = {
    className: PropTypes.string
  }
  render () {
    const className = this.props.className || ''
    return (
      <div className={`${className} ${style.loadIcon}`}>
        <div className={style.loadIconItem1 }></div>
        <div className={style.loadIconItem2 }></div>
        <div className={style.loadIconItem3 }></div>
        <div className={style.loadIconItem4 }></div>
        <div className={style.loadIconItem5 }></div>
        <div className={style.loadIconItem6 }></div>
        <div className={style.loadIconItem7 }></div>
        <div className={style.loadIconItem8 }></div>
        <div className={style.loadIconItem9 }></div>
        <div className={style.loadIconItem10 }></div>
        <div className={style.loadIconItem11 }></div>
        <div className={style.loadIconItem12 }></div>
      </div>
    )
  }
}

export default LoadIcon
