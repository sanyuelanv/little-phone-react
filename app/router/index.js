'use strict'
import React from 'react'
import { Text, App, View, Button } from '../component/index'
import style from './css.css'
// import Item from './item'
const dataSource = [
  { id: 1, text: '12123213' },
  { id: 2, text: '12123213' },
  { id: 3, text: '12123213' },
  { text: '12123213', id: 4 },
  { text: '12123213', id: 5 },
  { text: '12123213', id: 6 },
  { text: '12123213', id: 7 },
  { text: '12123213', id: 8 },
  { text: '12123213', id: 9 },
  { text: '12123213', id: 10 },
  { text: '12123213', id: 11 },
  { text: '12123213', id: 12 },
  { text: '12123213', id: 13 }
]
class Index extends React.Component {
  _handleLoad = this._handleLoad.bind(this)
  _handleToast = this._handleToast.bind(this)
  _handleLoad () {
    window.Qapp.showLoad()
    setTimeout(() => { window.Qapp.hideLoad() }, 2000)
  }
  _handleToast () {
    window.Qapp.showToast('哈哈哈')
  }
  render () {
    return (
      <App>
        <View className={ style.viewTitle } >View组件</View>
        <View className={ style.viewSecTitle } >横向布局</View>
        <View className={ style.viewBoxRow }>
          <View className={ style.view1 }></View>
          <View className={ style.view2 }></View>
          <View className={ style.view3 }></View>
          <View className={ style.view4 }></View>
        </View>
        <View className={ style.viewSecTitle } >纵向布局</View>
        <View className={ style.viewBoxCol }>
          <View className={ style.view1 }></View>
          <View className={ style.view2 }></View>
          <View className={ style.view3 }></View>
          <View className={ style.view4 }></View>
        </View>
        <View className={ style.viewTitle } >button组件</View>
        <View className={ style.viewBoxRow }>
          <Button className={ style.button } tapClassName={ style.buttonTap } tap={this._handleLoad}>加载</Button>
          <Button className={ style.button } tapClassName={ style.buttonTap } tap={this._handleToast}>提示</Button>
          <Button className={ style.button } tapClassName={ style.buttonTap } tap={this._handleLoad}>弹窗</Button>
          <Button className={ style.button } tapClassName={ style.buttonTap } tap={this._handleLoad}>新页面</Button>
        </View>
      </App>
    )
  }
}
export default Index

/*
<ScrollView direction={'column'} className={style.scrollView} getScrollControl={(res) => { this.setScrollControl = res }}>
          <View id={'dsa'} className={ style.view }></View>
          <View id={'2'} className={ style.view }></View>
          <View id={'das'} className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View
            className={ style.view2 }
            tapClassName={style.viewPress}
            tap ={() => {
              this.setScrollControl(100, 500, 1)
            }}
          ></View>
        </ScrollView>
        <ScrollView direction={'row'} className={style.scrollView2}>
          <View className={ style.view3 }></View>
        </ScrollView>
*/
