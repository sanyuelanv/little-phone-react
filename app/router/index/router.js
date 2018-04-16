'use strict'
const { Text, View } = window.QUI
import style from './css.css'
import asyncFetch from '../../utils/asyncFetch'
class Index extends React.Component {
  async componentDidMount () {
    const res = await asyncFetch({
      url: '/api/v1/topic/5433d5e4e737cbe96dcef312'
    })
    console.log(res)
  }
  render () {
    return (
      <View className={ style.container } >
        <Text>Hello world</Text>
      </View>
    )
  }
}
export default Index
