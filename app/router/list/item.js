'use strict'
import React from 'react'
import style from './css.css'
import { View } from '../../component/index'
class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object
  }
  render () {
    return (
      <View
        className={ style.listItem }
        tap={() => {
          window.Qapp.showAlert({
            content: '操作失败，请重试',
            title: '警告'
          })
        }}
      >
        {this.props.item.id} | {this.props.item.text}
      </View>
    )
  }
}
export default Item
