'use strict'
import React from 'react'
// import style from '../../css.css'
import ScrollView from '../scrollView'
import RefreshControl from './refreshControl'
import List from './list'
import PropTypes from 'prop-types'
import { View } from '../..'
const REM = 75
const HEIGHT = (60 / REM)
const shadowSize = [2 / REM, 12 / REM, 8 / REM]
const MaxDist = HEIGHT + (20 / REM)
const defaultTexts = ['下拉刷新', '刷新中', '释放刷新']
class ListView extends React.Component {
  static propTypes = {
    Item: PropTypes.any.isRequired,
    dataSource: PropTypes.array.isRequired,
    needTopRefreshControl: PropTypes.bool,
    topRefreshControlBgColor: PropTypes.string,
    topRefreshControlshadowColor: PropTypes.string,
    topRefreshControlTextColor: PropTypes.string,
    topRefreshControlTexts: PropTypes.array,
    topRefresh: PropTypes.func,
    bottomRefresh: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      topRefreshControlText: this.props.topRefreshControlTexts ? this.props.topRefreshControlTexts[0] : defaultTexts[0]
    }
    this.bottomRefreshFlag = 0
    this.topRefreshControl = null
    this.bottomRefreshControl = null
    this.getTextRef = null
    this.scrollView = null
    this.topRefreshControlState = 0
    this._scroll = this._scroll.bind(this)
    this._renderTopRefreshControl = this._renderTopRefreshControl.bind(this)
    this._onTouchEnd = this._onTouchEnd.bind(this)
    this._getRef = this._getRef.bind(this)
    this._overTopRefresh = this._overTopRefresh.bind(this)
    this.config = {
      bgColor: this.props.topRefreshControlBgColor || 'rgb(0, 188, 212)',
      shadowColor: this.props.topRefreshControlshadowColor || 'rgba(0, 0, 0, 0.12)',
      icons: [],
      texts: this.props.topRefreshControlTexts || defaultTexts,
      textColor: this.props.topRefreshControlTextColor || '#fff'
    }
  }
  _renderList () {
    const { Item, dataSource } = this.props
    const itemArr = []
    dataSource.map((item, index) => {
      itemArr.push(<Item item={item} key={item.id} />)
    })
    return <List getRef={(res) => { this.bottomRefreshControl = res }} itemArr={itemArr} />
  }
  _overTopRefresh () {
    this.topRefreshControlState = 0
    this._setRefreshControlPos(0)
    this.getTextRef._setState(0)
  }
  _onTouchEnd (e) {
    if (this.props.needTopRefreshControl && this.topRefreshControl) {
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
  _scroll (e) {
    const { y, maxScrollY } = e
    console.log(y)
    if (y <= maxScrollY && maxScrollY < 0 && this.bottomRefreshFlag === 0) {
      if (this.props.bottomRefresh) {
        this.bottomRefreshFlag = 1
        this.props.bottomRefresh(() => {
          this.bottomRefreshFlag = 0
        })
      }
    }
    if (this.props.needTopRefreshControl && this.topRefreshControl && this.topRefreshControlState !== 2) {
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
      // if (dist < 0) {

      // }
    }
  }
  _renderTopRefreshControl () {
    if (this.props.needTopRefreshControl) {
      return (
        <RefreshControl
          config={this.config}
          text={this.state.topRefreshControlText}
          shadowSize={shadowSize}
          height={HEIGHT}
          getRef={(res) => { this.topRefreshControl = res }}
          getTextRef={(res) => { this.getTextRef = res }}
        />
      )
    }
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
      >

        {this._renderList()}
      </ScrollView>
    )
  }
}

export default ListView
