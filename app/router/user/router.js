'use strict'
import { Text, View } from '../../component/index'
import style from './css.css'
class User extends React.Component {
  render () {
    return (
      <View className={ style.container } >
        <Text>User</Text>
      </View>
    )
  }
}
export default User
