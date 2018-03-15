'use strict'
import React from 'react'
import style from '../../css.css'
import View from '../view'
import PropTypes from 'prop-types'
class RefreshControl extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    getRef: PropTypes.func,
    height: PropTypes.number,
    shadowSize: PropTypes.array,
    getTextRef: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      topRefreshControlText: this.props.config.texts[0]
    }
  }
  componentDidMount () {
    this.props.getTextRef(this)
  }
  _setState (index) {
    this.setState({ topRefreshControlText: this.props.config.texts[index] })
  }
  _getState () {
    return this.state.topRefreshControlText
  }
  render () {
    const { getRef, height, config, shadowSize } = this.props
    return (
      <View
        className={style.topRefreshControl}
        style={{ height: `${height}rem`, top: `-${height}rem` }}
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
          {/* <View className={style.topRefreshControlBoxIcon}></View> */}
          <View className={style.topRefreshControlBoxText}>{this.state.topRefreshControlText}</View>
        </View>
      </View>
    )
  }
}

export default RefreshControl
