'use strict'
import css from '../../css.css'
class View extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    touchStart: PropTypes.func,
    tap: PropTypes.func,
    touchMove: PropTypes.func,
    touchEnd: PropTypes.func,
    touchCancel: PropTypes.func,
    transitionEnd: PropTypes.func,
    animationStart: PropTypes.func,
    animationIteration: PropTypes.func,
    animationEnd: PropTypes.func,
    contextMenu: PropTypes.func,
    getRef: PropTypes.func,
    id: PropTypes.string
  }
  static defaultProps = {
    children: null,
    className: '',
    style: null,
    touchStart: null,
    tap: null,
    touchMove: null,
    touchEnd: null,
    touchCancel: null,
    transitionEnd: null,
    animationStart: null,
    animationIteration: null,
    animationEnd: null,
    contextMenu: null,
    getRef: null,
    id: null
  }
  tapFlag = false // 用于记录是否tap了（出现touchmove 行为则不为tap）
  tapTouchPos = { x: 0, y: 0 }
  _touchStart = this._touchStart.bind(this)
  _touchMove = this._touchMove.bind(this)
  _touchEnd = this._touchEnd.bind(this)
  _touchCancel = this._touchCancel.bind(this)
  _transitionEnd = this._transitionEnd.bind(this)
  _animationStart = this._animationStart.bind(this)
  _animationIteration = this._animationIteration.bind(this)
  _animationEnd = this._animationEnd.bind(this)
  _contextMenu = this._contextMenu.bind(this)
  constructor (props) {
    super(props)
    this._setPropFunc()
  }
  _setPropFunc () {
    if (!this.props.touchStart && !this.props.tap) { this._touchStart = null }
    if (!this.props.touchMove && !this.props.tap) { this._touchMove = null }
    if (!this.props.touchEnd && !this.props.tap) { this._touchEnd = null }
    if (!this.props.touchCancel && !this.props.tap) { this._touchCancel = null }
    if (!this.props.transitionEnd) { this._transitionEnd = null }
    if (!this.props.animationStart) { this._animationStart = null }
    if (!this.props.animationIteration) { this._animationIteration = null }
    if (!this.props.animationEnd) { this._animationEnd = null }
    if (!this.props.contextMenu) { this._contextMenu = null }
  }
  _touchStart (e) {
    if (this.props.tap) {
      this.tapFlag = true
      const { screenX, screenY } = e.nativeEvent.touches[0]
      this.tapTouchPos = { x: screenX, y: screenY }
    }
    if (this.props.touchStart) { this.props.touchStart(e.nativeEvent) }
  }
  _touchMove (e) {
    if (this.props.tap) {
      const { screenX, screenY } = e.nativeEvent.touches[0]
      if (screenX !== this.tapTouchPos.x || screenY !== this.tapTouchPos.y) { this.tapFlag = false }
    }
    if (this.props.touchMove) { this.props.touchMove(e.nativeEvent) }
  }
  _touchEnd (e) {
    if (this.props.tap && this.tapFlag) { this.props.tap() }
    if (this.props.touchEnd) { this.props.touchEnd(e.nativeEvent) }
  }
  _touchCancel (e) {
    if (this.props.tap && this.tapFlag) { this.tapFlag = false }
    if (this.props.touchCancel) { this.props.touchCancel(e.nativeEvent) }
  }
  _transitionEnd (e) { if (this.props.transitionEnd) { this.props.transitionEnd(e) } }
  _animationStart (e) { if (this.props.animationStart) { this.props.animationStart(e) } }
  _animationIteration (e) { if (this.props.animationIteration) { this.props.animationIteration(e) } }
  _animationEnd (e) { if (this.props.animationEnd) { this.props.animationEnd(e) } }
  _contextMenu (e) { if (this.props.contextMenu) { this.props.contextMenu(e) } }
  render () {
    return (
      <div
        className={`${this.props.className} ${css.view}`}
        style={this.props.style}
        id={ this.props.id }
        onTouchStart={this._touchStart}
        onTouchMove={this._touchMove}
        onTouchEnd={this._touchEnd}
        onTouchCancel={this._touchCancel}
        onTransitionEnd = {this._transitionEnd}
        onAnimationStart = {this._animationStart}
        onAnimationIteration = {this._animationIteration}
        onAnimationEnd = {this._animationEnd}
        onContextMenu = {this._contextMenu}
        ref={this.props.getRef}
      >{ this.props.children }</div>
    )
  }
}

export default View
