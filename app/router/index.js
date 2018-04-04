'use strict'
import React from 'react'
import { Text, App, View, Button, ScrollView } from '../component/index'
import style from './css.css'
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
      <App noSysScroll={true}>
        <ScrollView className={ style.scrollViewBox }>
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
          <View className={ style.viewTitle } >Text组件</View>
          <Text className={ style.text }>Text和View很像，但是它不会响应任何事件，只是用于文字的展示，而且也不能嵌套使用。但如果需要长按复制的文字，就使用Text标签。（注：部分安卓浏览器无法禁止长按复制文字）</Text>
        </ScrollView>
      </App>
    )
  }
}
export default Index
