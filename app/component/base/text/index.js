'use strict'
import View from '../../container/view'
import style from '../../css.css'
class Text extends React.Component {
  static propTypes = {
    children: PropTypes.string,
    className: PropTypes.string
  }
  static defaultProps = {
    children: null,
    className: ''
  }
  render () {
    const children = this.props.children
    const className = this.props.className
    return (
      <View className={`${className} ${style.text}`}>{ children }</View>
    )
  }
}

export default Text
