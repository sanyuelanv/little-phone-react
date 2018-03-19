'use strict'
import React from 'react'
import style from '../css.css'
import View from '../container/view'
import Load from '../mask/load'
import Toast from '../mask/toast'
import scrollSetting from '../config/scrollOut'
class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  constructor (props) {
    super(props)
    this.state = {
      loadState: 0
    }

    this.showLoad = this.showLoad.bind(this)
    this.hideLoad = this.hideLoad.bind(this)
    window.prApp = {
      showLoad: this.showLoad,
      hideLoad: this.hideLoad
    }
  }
  // showLoad调用后，需要手动调用hideLoad
  showLoad () {
    this.setState({ loadState: 1 })
  }
  hideLoad (i) {
    const loadState = i === 0 ? i : 2
    this.setState({ loadState })
  }
  componentDidMount () {
    // APP 初始化就禁止document的默认事件
    scrollSetting()
  }
  render () {
    const children = this.props.children || ''
    return (
      <View className={style.main} >
        <View className={style.app}>{ children }</View>
        <Load loadState={ this.state.loadState } hideLoad={this.hideLoad} />
        <Toast />
      </View>
    )
  }
}

export default App
