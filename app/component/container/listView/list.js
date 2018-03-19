'use strict'
import React from 'react'
import style from '../../css.css'
import View from '../view'
class List extends React.Component {
  static propTypes = {
    itemArr: PropTypes.array,
    bottomRefresh: PropTypes.func,
    getRef: PropTypes.func,
    bottomRefreshTextColor: PropTypes.string,
    bottomRefreshText: PropTypes.string,
    bottomRefreshTextSize: PropTypes.number,
    REM: PropTypes.number,
    layout: PropTypes.number,
    layoutClassName: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
    this._setShow = this._setShow.bind(this)
    const REM = this.props.REM
    this.bottomRefreshTextColor = this.props.bottomRefreshTextColor || '#ccc'
    this.bottomRefreshText = this.props.bottomRefreshText || '加载中...'
    this.bottomRefreshTextSize = (this.props.bottomRefreshTextSize / REM) || (26 / REM)
  }
  componentDidMount () {
    this.props.getRef(this)
  }
  _setShow (cb) {
    this.setState({ show: !this.state.show })
    if (cb) { cb() }
  }
  render () {
    return (
      <View className={ this.props.layoutClassName }>
        {this.props.itemArr}
        <div
          className={ this.state.show ? style.bottomRefreshControl : style.bottomRefreshControlHide }
          style={{ color: this.bottomRefreshTextColor, fontSize: `${this.bottomRefreshTextSize}rem` }}
        >
          {this.bottomRefreshText}
        </div>
      </View>
    )
  }
}

export default List
