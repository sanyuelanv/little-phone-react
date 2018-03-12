'use strict'
import React from 'react'
import style from '../css.css'
import View from '../container/view'
class App extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }
  render () {
    const content = this.props.children || ''
    return (
      <View className={style.main} >
        <View className={style.app}>{ content }</View>
      </View>
    )
  }
}

export default App
