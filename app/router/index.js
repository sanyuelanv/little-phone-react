'use strict'
import React from 'react'
import { App, View, ScrollView } from '../component/index'
import style from './css.css'
class Index extends React.Component {
  render () {
    return (
      <App>
        <View className={ style.view }></View>
        <View className={ style.view2 } tapClassName={style.viewPress}></View>
        <ScrollView direction={'column'} className={style.scrollView}>
          <View className={ style.view2 } tapClassName={style.viewPress}></View>
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
          <View className={ style.view }></View>
          <View className={ style.view }></View>
          <View className={ style.view }></View>
        </ScrollView>
        <ScrollView direction={'row'} className={style.scrollView2}>
          <View className={ style.view3 }></View>
        </ScrollView>
      </App>
    )
  }
}
export default Index
