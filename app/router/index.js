'use strict'
import React from 'react'
import { Text, App, View, ScrollView, ListView } from '../component/index'
import style from './css.css'
import Item from './item'
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
  render () {
    return (
      <App>
        <ListView className={ style.scrollView3 } Item={Item} dataSource={dataSource} />
      </App>
    )
  }
}
export default Index

/*
        <View className={ style.view }></View>
        <View className={ style.view2 } tapClassName={style.viewPress}
          tap={() => {
            window.prApp.showLoad()
            setTimeout(() => { window.prApp.hideLoad() }, 2000)
          }}
        >加载</View>
        <ScrollView direction={'column'} className={style.scrollView} >
          <View
            className={ style.view2 }
            tapClassName={style.viewPress}
          ></View>
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
        <ListView item={''} dataSource={dataSource}></ListView>
        <Text className={ style.text }>12321321</Text>
        <Text className={ style.text }>12321321</Text>
*/
