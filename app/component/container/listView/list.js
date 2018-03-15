'use strict'
import React from 'react'
import style from '../../css.css'
import View from '../view'
class List extends React.Component {
  static propTypes = {
    itemArr: PropTypes.array,
    bottomRefresh: PropTypes.func,
    getRef: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }
  componentDidMount () {
    this.props.getRef(this)
  }
  _setShow () {
    this.setState({ show: !this.state.show })
  }
  render () {
    return (
      <View>
        {this.props.itemArr}
        <View className={ this.state.show ? style.bottomRefreshControl : style.bottomRefreshControlHide } >加载中...</View>
      </View>
    )
  }
}

export default List
