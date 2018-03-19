'use strict'
import React from 'react'
import style from '../../css.css'
import View from '../../container/view'
import LoadIcon from '../../base/icon/loadIcon'
import PropTypes from 'prop-types'
class Load extends React.Component {
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
        <LoadIcon className={style.loadIconPageSize} />
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

export default Load
