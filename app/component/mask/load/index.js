'use strict'
import React from 'react'
import View from '../../container/view'
import style from '../../css.css'
import LoadIcon from '../../base/icon/loadIcon'
import PropTypes from 'prop-types'
class Load extends React.Component {
  static propTypes = {
    maskColor: PropTypes.object,
    loadState: PropTypes.number,
    hideLoad: PropTypes.func,
    loadText: PropTypes.string
  }
  _onTransitionEnd = this._onTransitionEnd.bind(this)
  _onTransitionEnd () { this.props.hideLoad(0) }
  render () {
    const maskColor = this.props.maskColor || 'rgba(0, 0, 0, 0)'
    const cn = this.props.loadState > 0 ? style.mask : style.maskHide
    return (
      <View
        className={cn}
        style={{
          backgroundColor: maskColor,
          opacity: this.props.loadState === 1 ? 1 : 0
        }}
        transitionEnd = {this._onTransitionEnd}
      >
        <View className={style.load}>
          <LoadIcon className={style.loadIconPageSize} />
          <View className={style.loadText}>{this.props.loadText}</View>
        </View>
      </View>
    )
  }
}

export default Load
