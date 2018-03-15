'use strict'
import React from 'react'
import style from '../../css.css'
import ScrollView from '../scrollView'
import View from '../view'
import PropTypes from 'prop-types'
class ListView extends React.Component {
  static propTypes = {
    Item: PropTypes.any.isRequired,
    dataSource: PropTypes.array.isRequired,
    needTopRefreshControl: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.topRefreshControl = null
    this._scroll = this._scroll.bind(this)
    this._renderTopRefreshControl = this._renderTopRefreshControl.bind(this)
  }
  _renderList () {
    const { Item, dataSource } = this.props
    const itemArr = []
    dataSource.map((item, index) => {
      itemArr.push(<Item item={item} key={item.id} />)
    })
    return itemArr
  }
  _scroll (e) {
    const { y, maxScrollY } = e
    if (y === maxScrollY) {
      // console.log('到底了')
    }
    if (y === 0) {
      // console.log('到顶部')
    }
    if (this.props.needTopRefreshControl && this.topRefreshControl) {
      this.topRefreshControl.style.transform = `translate3d(0,${y - 60}px,0)`
      // transform: translate3d(0,0,0)
    }
  }
  _renderTopRefreshControl () {
    if (this.props.needTopRefreshControl) {
      return (
        <View
          className={style.topRefreshControl}
          getRef={(ref) => { this.topRefreshControl = ref }}
        ></View>
      )
    }
  }
  componentDidMount () {
  }
  render () {
    return (
      <ScrollView
        bounce={true}
        {...this.props}
        scroll={this._scroll}
        renderTopRefreshControl = {this._renderTopRefreshControl}
      >

        {this._renderList()}
      </ScrollView>
    )
  }
}

export default ListView
