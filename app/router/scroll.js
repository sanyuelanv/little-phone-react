'use strict'

import { Text, App, View, Button, ScrollView } from '../component/index'
import style from './css.css'
class Index extends React.Component {
  _handleLoad = this._handleLoad.bind(this)
  _handleToast = this._handleToast.bind(this)
  setScrollControl = null
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
        <ScrollView direction={'column'} className={style.scrollView} getScrollControl={(res) => { this.setScrollControl = res }}>
          <View
            className={ style.scrollViewItem }
            tapClassName={style.scrollViewItemPress}
            tap ={() => { this.setScrollControl(300, 500, 1) }}
          ></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
        </ScrollView>
      </App>
    )
  }
}
export default Index

/*
<ScrollView direction={'column'} className={style.scrollView} getScrollControl={(res) => { this.setScrollControl = res }}>
          <View id={'dsa'} className={ style.scrollViewItem }></View>
          <View id={'2'} className={ style.scrollViewItem }></View>
          <View id={'das'} className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View className={ style.scrollViewItem }></View>
          <View
            className={ style.scrollViewItem2 }
            tapClassName={style.scrollViewItemPress}
            tap ={() => {
              this.setScrollControl(100, 500, 1)
            }}
          ></View>
        </ScrollView>
        <ScrollView direction={'row'} className={style.scrollView2}>
          <View className={ style.scrollViewItem3 }></View>
        </ScrollView>
*/
