'use strict'
import style from '../../css.css'
import View from '../../container/view'
class LoadIcon extends React.Component {
  static propTypes = {
    className: PropTypes.string
  }
  static defaultProps = { className: null }
  render () {
    return (
      <View className={`${this.props.className} ${style.loadIcon}`}>
        <View className={style.loadIconItem1 }></View>
        <View className={style.loadIconItem2 }></View>
        <View className={style.loadIconItem3 }></View>
        <View className={style.loadIconItem4 }></View>
        <View className={style.loadIconItem5 }></View>
        <View className={style.loadIconItem6 }></View>
        <View className={style.loadIconItem7 }></View>
        <View className={style.loadIconItem8 }></View>
        <View className={style.loadIconItem9 }></View>
        <View className={style.loadIconItem10 }></View>
        <View className={style.loadIconItem11 }></View>
        <View className={style.loadIconItem12 }></View>
      </View>
    )
  }
}

export default LoadIcon
