'use strict'
import React from 'react'
import style from './css.css'
import { View } from '../component/index'
class Item extends React.Component {
  render () {
    return (
      <View className={ style.listItem }></View>
    )
  }
}
export default Item
