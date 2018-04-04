'use strict'
import React from 'react'
import style from '../../css.css'
import PropTypes from 'prop-types'
import View from '../../container/view'
import Text from '../../base/text'
import Button from '../../base/button'
class Alert extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    time: PropTypes.number,
    showToast: PropTypes.func,
    state: PropTypes.number
  }
  state = {
    alertState: 1,
    maskColor: 'rgba(0, 0, 0, 0.3)'
  }
  render () {
    const { alertState, maskColor } = this.state
    const cn = alertState > 0 ? style.mask : style.maskHide
    return (
      <View
        className={cn}
        style={{
          backgroundColor: maskColor,
          opacity: alertState === 1 ? 1 : 0
        }}
      >
        <View className={style.alertBox}>
          <View className={style.alertContentBox}>
            <Text className={style.alertBoxTitle}>标题</Text>
            <Text className={style.alertBoxText}>提示内容：这里的内容仅仅用于用户提示，不应该过长。</Text>
          </View>
          <View className={style.alertBtnArr}>
            <Button tapClassName={style.alertBoxRightBtnPress} className={style.alertBoxRightBtn}>取消</Button>
            <Button tapClassName={style.alertBoxBtnPress} className={style.alertBoxBtn}>确定</Button>
          </View>

        </View>
      </View>
    )
  }
}

export default Alert
