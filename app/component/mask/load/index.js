'use strict'
import React from 'react'
import View from '../../container/view'
import style from '../../css.css'
import LoadIcon from '../../base/icon/loadIcon'
class Load extends React.Component {
  _onTransitionEnd = this._onTransitionEnd.bind(this)
  showLoad = this.showLoad.bind(this)
  hideLoad = this.hideLoad.bind(this)
  constructor (props) {
    super(props)
    this.state = {
      loadState: 0,
      loadText: '',
      maskColor: 'rgba(0, 0, 0, 0)'
    }
    // 载入全局变量中
    const { showLoad, hideLoad } = this
    window.Qapp.showLoad = showLoad
    window.Qapp.hideLoad = hideLoad
  }
  showLoad (loadText, maskColor) {
    loadText = loadText || '加载中'
    maskColor = maskColor || 'rgba(0, 0, 0, 0)'
    this.setState({ loadState: 1, loadText, maskColor })
  }
  hideLoad (loadState) {
    loadState = loadState === 0 ? 0 : 2
    this.setState({ loadState })
  }
  _onTransitionEnd () { this.hideLoad(0) }
  render () {
    const { loadState, loadText, maskColor } = this.state
    const cn = loadState > 0 ? style.mask : style.maskHide
    return (
      <View
        className={cn}
        style={{
          backgroundColor: maskColor,
          opacity: loadState === 1 ? 1 : 0
        }}
        transitionEnd = {this._onTransitionEnd}
      >
        <View className={style.load}>
          <LoadIcon className={style.loadIconPageSize} />
          <View className={style.loadText}>{loadText}</View>
        </View>
      </View>
    )
  }
}

export default Load
