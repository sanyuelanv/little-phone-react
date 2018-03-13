'use strict'
import React from 'react'
import style from '../css.css'
import View from '../container/view'
import scrollSetting from '../config/scrollOut'
class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
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
      </View>
    )
  }
}

export default App
