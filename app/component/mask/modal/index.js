'use strict'
import React from 'react'
import View from '../../container/view'
import style from '../../css.css'
class Modal extends React.Component {
  // constructor (props) {
  //   super(props)
  // }
  render () {
    return (
      <View className={style.mask}>
      </View>
    )
  }
}

export default Modal
