'use strict'
import React from 'react'
import style from '../css.css'
import View from '../container/view'
import Load from '../mask/load'
import Toast from '../mask/toast'
import scrollSetting from '../config/scrollOut'
class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    noSysScroll: PropTypes.bool
  }
  showLoad = this.showLoad.bind(this)
  hideLoad = this.hideLoad.bind(this)
  showToast = this.showToast.bind(this)
  constructor (props) {
    super(props)
    this.state = {
      loadState: 0,
      toastText: '',
      toastState: 0,
      toastTheme: 0,
      toastTime: 2000
    }
    this.setGobleFunc()
  }
  setGobleFunc () {
    const { showLoad, hideLoad, showToast } = this
    window.Qapp = { showLoad, hideLoad, showToast }
  }
  // showLoad调用后，需要手动调用hideLoad
  showLoad (loadText) {
    loadText = loadText || '加载中'
    this.setState({ loadState: 1, loadText })
  }
  hideLoad (i) {
    const loadState = i === 0 ? i : 2
    this.setState({ loadState })
  }
  showToast (toastText, toastTheme = 0, toastTime = 2000) {
    if (toastText === '') {
      this.setState({ toastState: 0 })
    }
    else {
      this.setState({ toastState: 1, toastText, toastTheme, toastTime })
    }
  }
  componentDidMount () {
    // APP 初始化就禁止document的默认事件
    if (this.props.noSysScroll) { scrollSetting() }
  }
  render () {
    const children = this.props.children || ''
    return (
      <View className={style.main} >
        <View className={style.app}>{ children }</View>
        <Load loadText={this.state.loadText} loadState={ this.state.loadState } hideLoad={this.hideLoad} />
        <Toast state={this.state.toastState} theme={this.state.toastTheme} time={this.state.toastTime} text={this.state.toastText} showToast={this.showToast} />
      </View>
    )
  }
}

export default App
