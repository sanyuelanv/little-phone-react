'use strict'
import React from 'react'
import ScrollView from '../scrollView'
import RefreshControl from './refreshControl'
import List from './list'
import PropTypes from 'prop-types'
const REM = 75
const HEIGHT = (60 / REM)
const shadowSize = [2 / REM, 12 / REM, 8 / REM]
const MaxDist = HEIGHT + (20 / REM)
const defaultTexts = ['下拉刷新', '刷新中', '释放刷新']
class ListView extends React.Component {
  static propTypes = {
    Item: PropTypes.any.isRequired,
    dataSource: PropTypes.any.isRequired,
    topRefreshControlBgColor: PropTypes.string,
    topRefreshControlshadowColor: PropTypes.string,
    topRefreshControlTextColor: PropTypes.string,
    topRefreshControlTexts: PropTypes.array,
    topRefresh: PropTypes.func,
    bottomRefresh: PropTypes.func,
    bottomRefreshTextColor: PropTypes.string,
    bottomRefreshText: PropTypes.string,
    bottomRefreshTextSize: PropTypes.number,
    bottomRefreshPos: PropTypes.number,
    layoutClassName: PropTypes.string,
    Header: PropTypes.any,
    headerProp: PropTypes.object,
    ItemKey: PropTypes.any,
    itemProp: PropTypes.object
  }
  bottomRefreshFlag = 0
  topRefreshControl = null
  bottomRefreshControl = null
  getTextRef = null
  scrollView = null
  iScroll = null
  needBottomRefresh = !!this.props.bottomRefresh
  topRefreshControlState = 0
  _scroll = this._scroll.bind(this)
  _renderTopRefreshControl = this._renderTopRefreshControl.bind(this)
  _onTouchEnd = this._onTouchEnd.bind(this)
  _getRef = this._getRef.bind(this)
  _overTopRefresh = this._overTopRefresh.bind(this)
  _refreshScroll = this._refreshScroll.bind(this)
  _checkBottomRefresh = this._checkBottomRefresh.bind(this)
  config = {
    bgColor: this.props.topRefreshControlBgColor || 'rgb(0, 188, 212)',
    shadowColor: this.props.topRefreshControlshadowColor || 'rgba(0, 0, 0, 0.12)',
    icons: [],
    texts: this.props.topRefreshControlTexts || defaultTexts,
    textColor: this.props.topRefreshControlTextColor || '#fff'
  }
  _renderList () {
    const { Item, dataSource, ItemKey, itemProp } = this.props
    const itemArr = []
    dataSource.map((item, index) => {
      itemArr.push(<Item item={item} key={item[ItemKey]} {...itemProp} />)
    })
    return <List
      getRef={(res) => { this.bottomRefreshControl = res }}
      REM={REM}
      layoutClassName={this.props.layoutClassName }
      itemArr={itemArr}
      bottomRefreshTextColor={this.props.bottomRefreshTextColor}
      bottomRefreshText={this.props.bottomRefreshText}
      bottomRefreshTextSize = {this.props.bottomRefreshTextSize}
    />
  }
  _refreshScroll () { if (this.iScroll) { this.iScroll.refresh() } }
  _overTopRefresh () {
    this.topRefreshControlState = 0
    this._setRefreshControlPos(0)
    this.getTextRef._setState(0)
  }
  _onTouchEnd (e) {
    if (this.props.topRefresh && this.topRefreshControl) {
      if (this.topRefreshControlState === 1) {
        this.topRefreshControlState = 2
        this.getTextRef._setState(1)
        this._setRefreshControlPos(-1, true)
        if (this.props.topRefresh) {
          this.props.topRefresh(this._overTopRefresh)
        }
      }
      if (this.topRefreshControlState === 0) {
        this._setRefreshControlPos(0)
      }
    }
    this._checkBottomRefresh(e)
  }
  _setRefreshControlPos (dist, flag) {
    if (flag) {
      this.topRefreshControl.style.transition = 'all 300ms'
      this.topRefreshControl.style.webkitTransition = 'all 300ms'
      this.topRefreshControl.style.mozTransition = 'all 300ms'
      this.topRefreshControl.style.transform = `translate3d(0,${MaxDist}rem,0)`
      this.topRefreshControl.style.webkitTransform = `translate3d(0,${MaxDist}rem,0)`
      this.topRefreshControl.style.mozTransform = `translate3d(0,${MaxDist}rem,0)`
      return
    }
    if (dist !== 0) {
      this.topRefreshControl.style.transition = 'all 0ms'
      this.topRefreshControl.style.webkitTransition = 'all 0ms'
      this.topRefreshControl.style.mozTransition = 'all 0ms'
      this.topRefreshControl.style.transform = `translate3d(0,${dist}rem,0)`
      this.topRefreshControl.style.webkitTransform = `translate3d(0,${dist}rem,0)`
      this.topRefreshControl.style.mozTransform = `translate3d(0,${dist}rem,0)`
    }
    else if (dist === 0) {
      this.topRefreshControl.style.transition = 'all 300ms'
      this.topRefreshControl.style.webkitTransition = 'all 300ms'
      this.topRefreshControl.style.mozTransition = 'all 300ms'
      this.topRefreshControl.style.transform = 'translate3d(0,0,0)'
      this.topRefreshControl.style.webkitTransform = 'translate3d(0,0,0)'
      this.topRefreshControl.style.mozTransform = 'translate3d(0,0,0)'
    }
  }
  _getRef (scrollView) { this.scrollView = scrollView }
  _checkBottomRefresh (e) {
    const { y, maxScrollY } = e
    const bottomRefreshPos = this.props.bottomRefreshPos || 0
    if (y <= maxScrollY - bottomRefreshPos && maxScrollY < 0 && this.bottomRefreshFlag === 0 && this.needBottomRefresh) {
      if (this.props.bottomRefresh) {
        this.bottomRefreshFlag = 1
        if (this.bottomRefreshControl) { this.bottomRefreshControl._setShow(this._refreshScroll) }
        this.props.bottomRefresh((need) => {
          this.bottomRefreshFlag = 0
          this.bottomRefreshControl._setShow(this._refreshScroll)
          this.needBottomRefresh = need
        })
      }
    }
  }
  _scroll (e) {
    const { y } = e
    // 上拉加载更多
    this._checkBottomRefresh(e)
    // 下拉加载刷新
    if (this.props.topRefresh && this.topRefreshControl && this.topRefreshControlState !== 2) {
      const dist = y / REM
      this._setRefreshControlPos(dist)
      if (dist <= MaxDist && dist >= 0) {
        this.topRefreshControlState = 0
        if (this.getTextRef._getState !== this.config.texts[0]) {
          this.getTextRef._setState(0)
        }
      }
      if (dist > MaxDist) {
        this.topRefreshControlState = 1
        if (this.getTextRef._getState !== this.config.texts[2]) {
          this.getTextRef._setState(2)
        }
      }
    }
  }
  _renderTopRefreshControl () {
    if (this.props.topRefresh) {
      return (
        <RefreshControl
          config={this.config}
          shadowSize={shadowSize}
          height={HEIGHT}
          getRef={(res) => { this.topRefreshControl = res }}
          getTextRef={(res) => { this.getTextRef = res }}
        />
      )
    }
  }
  _renderHeader () {
    const { Header, headerProp } = this.props
    if (Header) { return <Header {...headerProp} /> }
  }
  render () {
    return (
      <ScrollView
        bounce={true}
        {...this.props}
        scroll={this._scroll}
        scrollCancel={this._scrollEnd}
        onTouchEnd = {this._onTouchEnd}
        renderTopRefreshControl = {this._renderTopRefreshControl}
        getIScroll= {(res) => { this.iScroll = res }}
        scrollEnd = {this._checkBottomRefresh}
      >
        {this._renderHeader()}
        {this._renderList()}
      </ScrollView>
    )
  }
}

export default ListView
