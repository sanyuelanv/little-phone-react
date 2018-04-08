'use strict'
import style from '../../css.css'
import View from '../../container/view'
import Text from '../../base/text'
import Button from '../../base/button'
const alertBoxStyle = [style.alertBox, style.alertBoxShow, style.alertBoxHide]
class Alert extends React.Component {
  state = {
    alertState: 0,
    maskColor: 'rgba(0, 0, 0, 0.3)',
    title: '',
    content: '',
    rightButton: {
      event: null,
      name: '确认',
      color: '#09BB07'
    },
    leftButton: null
  }
  show = this.show.bind(this)
  hide = this.hide.bind(this)
  _rightBtnEvent = this._rightBtnEvent.bind(this)
  _leftBtnEvent = this._leftBtnEvent.bind(this)
  _onAnimationEnd = this._onAnimationEnd.bind(this)
  constructor (props) {
    super(props)
    // 载入全局变量中
    const { show } = this
    window.Qapp.showAlert = show
  }
  show (obj) {
    const content = obj.content || ''
    const title = obj.title || ''
    const rightButton = obj.rightButton || this.state.rightButton
    const leftButton = obj.leftButton || null
    const maskColor = obj.maskColor || 'rgba(0, 0, 0, 0.3)'
    this.setState({ alertState: 1, maskColor, title, content, rightButton, leftButton })
  }
  hide (alertState) { this.setState({ alertState: 2 }) }
  _onAnimationEnd () { if (this.state.alertState === 2) { this.setState({ alertState: 0 }) } }
  _rightBtnEvent () {
    const { rightButton } = this.state
    this.hide()
    if (rightButton.event) { rightButton.event() }
  }
  _leftBtnEvent () {
    const { leftButton } = this.state
    this.hide()
    if (leftButton.event) { leftButton.event() }
  }
  _renderLeftBtn () {
    const { leftButton } = this.state
    if (leftButton) {
      return (
        <Button
          tap={this._leftBtnEvent}
          tapClassName={style.alertBoxRightBtnPress}
          className={style.alertBoxRightBtn}
        >
          { leftButton.name }
        </Button>
      )
    }
  }
  render () {
    const { alertState, maskColor, title, content, rightButton } = this.state
    const cn = alertState > 0 ? style.mask : style.maskHide
    return (
      <View
        className={cn}
        style={{ backgroundColor: maskColor }}
      >
        <View
          className={alertBoxStyle[alertState]}
          animationEnd = {this._onAnimationEnd}
        >
          <View className={style.alertContentBox}>
            <Text className={title === '' ? style.hide : style.alertBoxTitle}>{ title }</Text>
            <Text className={style.alertBoxText}>{ content }</Text>
          </View>
          <View className={style.alertBtnArr}>
            { this._renderLeftBtn() }
            <Button
              tap={this._rightBtnEvent}
              tapClassName={style.alertBoxBtnPress}
              style={{ color: rightButton.color }}
              className={style.alertBoxBtn}>{rightButton.name}</Button>
          </View>

        </View>
      </View>
    )
  }
}

export default Alert
