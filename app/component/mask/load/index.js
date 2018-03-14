'use strict'
import React from 'react'
import style from '../../css.css'
import View from '../../container/view'
import PropTypes from 'prop-types'
class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    maskColor: PropTypes.object,
    loadState: PropTypes.number,
    hideLoad: PropTypes.func
  }
  constructor (props) {
    super(props)
    this._onTransitionEnd = this._onTransitionEnd.bind(this)
  }
  _onTransitionEnd () {
    this.props.hideLoad(0)
  }
  _renderLoad () {
    return (
      <View className={style.load}>
        <div className={style.loadIcon}>
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
        <View className={style.loadText}>加载中</View>
      </View>
    )
  }
  render () {
    const children = this.props.children || this._renderLoad()
    const maskColor = this.props.maskColor || 'rgba(0, 0, 0, 0)'
    const cn = this.props.loadState > 0 ? style.mask : style.maskHide

    return (
      <div
        className={cn}
        style={{
          backgroundColor: maskColor,
          opacity: this.props.loadState === 1 ? 1 : 0
        }}
        onTransitionEnd = {this._onTransitionEnd}
      >
        {children}
      </div>
    )
  }
}

export default App
