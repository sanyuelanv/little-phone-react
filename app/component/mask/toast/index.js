'use strict'
import React from 'react'
import style from '../../css.css'
import PropTypes from 'prop-types'
import View from '../../container/view'
const THEME = [style.toastDark, style.toastLight]
class Toast extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    theme: PropTypes.number,
    time: PropTypes.number,
    showToast: PropTypes.func,
    state: PropTypes.number
  }
  _onTransitionEnd = this._onTransitionEnd.bind(this)
  _timeFlag = null
  _onTransitionEnd () {
    if (this._timeFlag === null) {
      this._timeFlag = setTimeout(() => {
        this.props.showToast('')
        this._timeFlag = null
      }, this.props.time)
    }
  }
  render () {
    const cn = this.props.state === 0 ? style.toastBox : `${style.toastBox} ${style.toastShow}`
    return (
      <View className={cn} transitionEnd={this._onTransitionEnd}>
        <View className={THEME[this.props.theme]} >
          {this.props.text}
        </View>
      </View>
    )
  }
}

export default Toast
