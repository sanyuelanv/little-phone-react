'use strict'
const { Text, View } = window.QUI
import style from './css.css'
class @className extends React.Component {
  render () {
    return (
      <View className={ style.container } >
        <Text>Hello world</Text>
      </View>
    )
  }
}
export default @className
