'use strict'
import { Text, View, ScrollView } from '../../component/index'
import style from './css.css'
class Index extends React.Component {
  render () {
    return (
      <View className={ style.container } >
        <ScrollView className= {style.scrollView} bounce={true}>
          <View className= {style.item}></View>
          <View className= {style.item}></View>
          <ScrollView className= {style.itemScroll}>
            <View className= {style.item} tap={() => { console.log(111) }}></View>
            <View className= {style.item}></View>
            <View className= {style.item}></View>
            <View className= {style.item}></View>
            <View className= {style.item}></View>
          </ScrollView>
          <View className= {style.item}></View>
          <View className= {style.item}></View>
          <View className= {style.item}></View>
          <View className= {style.item}></View>
          <View className= {style.item}></View>
        </ScrollView>
      </View>
    )
  }
}
export default Index
