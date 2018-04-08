'use strict'
import style from '../../css.css'
import View from '../view'
import REM from '../../config/rem'
class List extends React.Component {
  static propTypes = {
    bottomRefresh: PropTypes.func,
    itemArr: PropTypes.array.isRequired,
    getRef: PropTypes.func.isRequired,
    bottomRefreshControl: PropTypes.object.isRequired,
    layoutClassName: PropTypes.string.isRequired
  }
  static defaultProps = {
    bottomRefresh: null,
    getRef: null,
    bottomRefreshControl: null,
    layoutClassName: ''
  }
  _setShow = this._setShow.bind(this)
  constructor (props) {
    super(props)
    this.state = { show: false }
  }
  componentDidMount () { this.props.getRef(this) }
  _setShow (cb) {
    this.setState({ show: !this.state.show })
    if (cb) { cb() }
  }
  _renderBottom () {
    if (this.props.bottomRefresh) {
      return (
        <div
          className={ this.state.show ? style.bottomRefreshControl : style.bottomRefreshControlHide }
          style={{ color: this.props.bottomRefreshControl.color, fontSize: `${this.props.bottomRefreshControl.size / REM}rem` }}
        >
          {this.props.bottomRefreshControl.content}
        </div>
      )
    }
  }
  render () {
    return (
      <View className={ this.props.layoutClassName }>
        {this.props.itemArr}
        {this._renderBottom()}
      </View>
    )
  }
}

export default List
