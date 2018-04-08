'use strict'
import style from '../../css.css'
import View from '../../container/view'
const THEME = [style.toastDark, style.toastLight]
class Toast extends React.Component {
  state = {
    toastText: '',
    toastState: 0,
    toastTheme: 0
  }
  constructor (props) {
    super(props)
    // 载入全局变量中
    const { showToast } = this
    window.Qapp.showToast = showToast
  }
  _onTransitionEnd = this._onTransitionEnd.bind(this)
  showToast = this.showToast.bind(this)
  _isShow = false
  _timeFlag = null
  _toastTime = 2000
  showToast (obj) {
    if (!obj) { this.setState({ toastState: 0 }) }
    else {
      const toastText = obj.content
      const toastTheme = obj.theme || 0
      const toastTime = obj.time || 2000
      this.setState({ toastState: 1, toastText, toastTheme })
      this._toastTime = toastTime
      if (this._timeFlag) {
        clearTimeout(this._timeFlag)
        this.hideToast()
      }
    }
  }
  hideToast () {
    this._timeFlag = setTimeout(() => {
      this.showToast('')
      this._timeFlag = null
    }, this._toastTime)
  }
  // 动画结束之后指定事件隐藏toast
  _onTransitionEnd () {
    if (this._isShow) { this._isShow = false }
    else {
      this._isShow = true
      this.hideToast()
    }
  }
  render () {
    const { toastState, toastTheme, toastText } = this.state
    const cn = toastState === 0 ? style.toastBox : `${style.toastBox} ${style.toastShow}`
    return (
      <View className={cn} transitionEnd={this._onTransitionEnd}>
        <View className={THEME[toastTheme]} > {toastText} </View>
      </View>
    )
  }
}

export default Toast
