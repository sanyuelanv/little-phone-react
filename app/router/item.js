'use strict'

import style from './css.css'
import { View } from '../component/index'
class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object
  }
  render () {
    return (
      <View
        className={ style.listItem }
        tap={() => {
          window.prApp.showLoad()
          setTimeout(() => { window.prApp.hideLoad() }, 2000)
        }}
      >
        {this.props.item.id} | {this.props.item.text}
      </View>
    )
  }
}
export default Item
