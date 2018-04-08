'use strict'
import style from '../../css.css'
import View from '../view'
class RefreshControl extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    getRef: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    shadowSize: PropTypes.array.isRequired,
    getTextRef: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = { topRefreshControlText: this.props.config.texts[0] }
  }
  componentDidMount () { this.props.getTextRef(this) }
  _setState (index) { this.setState({ topRefreshControlText: this.props.config.texts[index] }) }
  _getState () { return this.state.topRefreshControlText }
  render () {
    const { getRef, height, config, shadowSize } = this.props
    return (
      <View
        className={style.topRefreshControl}
        style={{ height: `${height}rem`, top: `-${height + 0.1}rem` }}
        getRef={getRef}
      >
        <View
          className={style.topRefreshControlBox}
          style={{
            backgroundColor: config.bgColor,
            boxShadow: `${config.shadowColor} 0px ${shadowSize[0]}rem ${shadowSize[1]}rem, ${config.shadowColor} 0rem ${shadowSize[0]}rem ${shadowSize[2]}rem`,
            color: config.textColor
          }}
        >
          <View className={style.topRefreshControlBoxText}>{this.state.topRefreshControlText}</View>
        </View>
      </View>
    )
  }
}

export default RefreshControl
