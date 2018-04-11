'use strict'
import ScrollView from '../scrollView'
import RefreshControl from './refreshControl'
import List from './list'
import REM from '../../config/rem'
const HEIGHT = (60 / REM)
const shadowSize = [2 / REM, 12 / REM, 8 / REM]
const MaxDist = HEIGHT + (20 / REM)
const defaultTexts = ['下拉刷新', '刷新中', '释放刷新']
class ListView extends React.Component {
  static propTypes = {
    Item: PropTypes.any.isRequired,
    itemKey: PropTypes.any.isRequired,
    dataSource: PropTypes.any.isRequired,
    topRefreshControl: PropTypes.object,
    topRefresh: PropTypes.func,
    bottomRefresh: PropTypes.func,
    bottomRefreshControl: PropTypes.object,
    bottomRefreshPos: PropTypes.number,
    layoutClassName: PropTypes.string,
    Header: PropTypes.any,
    headerProp: PropTypes.object,
    itemProp: PropTypes.object
  }
  static defaultProps = {
    topRefreshControl: {
      bgColor: 'rgb(0, 188, 212)',
      shadowColor: 'rgba(0, 0, 0, 0.12)',
      textColor: '#fff',
      texts: defaultTexts
    },
    topRefresh: null,
    bottomRefresh: null,
    bottomRefreshControl: { color: '#ccc', size: 26, content: '加载中...' },
    bottomRefreshPos: 0,
    layoutClassName: '',
    Header: null,
    headerProp: null,
    itemProp: null
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
    bgColor: this.props.topRefreshControl.bgColor,
    shadowColor: this.props.topRefreshControl.shadowColor,
    icons: [],
    texts: this.props.topRefreshControl.texts,
    textColor: this.props.topRefreshControl.textColor
  }
  _renderList () {
    const { Item, dataSource, itemKey, itemProp } = this.props
    const itemArr = []
    dataSource.map((item, index) => {
      itemArr.push(<Item item={item} key={item[itemKey]} {...itemProp} />)
    })
    return <List
      getRef={(res) => { this.bottomRefreshControl = res }}
      REM={REM}
      layoutClassName={this.props.layoutClassName }
      itemArr={itemArr}
      bottomRefresh = {this.props.bottomRefresh}
      bottomRefreshControl={this.props.bottomRefreshControl}
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
    const bottomRefreshPos = this.props.bottomRefreshPos
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
        {...this.props}
        mustScroll = {true}
        bounce={true}
        direction={'column'}
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
