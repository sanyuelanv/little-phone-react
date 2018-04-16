'use strict'
const { Text, View } = window.QUI
import style from './css.css'
class Index extends React.Component {
  render () {
    return (
      <View className={ style.container } >
        <View tap={() => { console.log(1) }} >
          Hello world
          <View tap={() => { console.log(2) }} tapStopPropagation={ true }>点击</View>
        </View>
      </View>
    )
  }
}
export default Index
