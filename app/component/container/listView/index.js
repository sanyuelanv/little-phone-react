'use strict'
import React from 'react'
import style from '../../css.css'
import ScrollView from '..//scrollView'
import PropTypes from 'prop-types'
class ListView extends React.Component {
  static propTypes = {
    Item: PropTypes.any.isRequired,
    dataSource: PropTypes.array.isRequired
  }
  constructor (props) {
    super(props)
    this._scroll = this._scroll.bind(this)
  }
  _renderList () {
    const { Item, dataSource, itemClassName } = this.props
    const itemArr = []
    dataSource.map((item, index) => {
      itemArr.push(<Item item={item} key={item.id} />)
    })
    return itemArr
  }
  _scroll (e) {
    const { y, maxScrollY } = e
    if (y === maxScrollY) { console.log('到底了') }
    if (y === 0) { console.log('到顶部') }
  }
  render () {
    return (
      <ScrollView
        {...this.props}
        scroll={this._scroll}
      >
        {this._renderList()}
      </ScrollView>
    )
  }
}

export default ListView
