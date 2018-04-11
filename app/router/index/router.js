'use strict'
import { Text, View, ScrollView } from '../../component/index'
import style from './css.css'
class Index extends React.Component {
  render () {
    return (
      <View className={ style.container } >
        <ScrollView className= {style.scrollView}>
        </ScrollView>
      </View>
    )
  }
}
export default Index
