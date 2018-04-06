'use strict'
import React from 'react'
import style from '../css.css'
import View from '../container/view'
import Load from '../mask/load'
import Toast from '../mask/toast'
import Alert from '../mask/alert'
import scrollSetting from '../config/scrollOut'
class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    noSysScroll: PropTypes.bool
  }
  componentWillMount () {
    // APP 初始化就禁止document的默认事件
    if (this.props.noSysScroll) { scrollSetting() }
    window.Qapp = {
      showLoad: null,
      hideLoad: null,
      showToast: null,
      showAlert: null,
      hideAlert: null
    }
  }
  render () {
    const children = this.props.children || ''
    return (
      <View className={style.main} >
        <View className={style.app}>{ children }</View>
        <Load />
        <Toast />
        <Alert />
      </View>
    )
  }
}

export default App
