'use strict'
import { Text, View } from '../../component/index'
import style from './css.css'
class Index extends React.Component {
  render () {
    return (
      <View className={ style.container } >
        <Text>Hello world</Text>
      </View>
    )
  }
}
export default Index
