'use strict'
import React from 'react'
import style from './css.css'
import View from '../view'
class App extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    state: PropTypes.bool
  }
  render () {
    // const content = this.props.content || ''
    // const state = this.props.state || false
    return (
      <View className={style.toast} >
      </View>
    )
  }
}

export default App
