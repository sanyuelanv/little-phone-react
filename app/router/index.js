'use strict'
import React from 'react'
import style from './css.css'
import App from '../component/app'
import View from '../component/container/view'
class Index extends React.Component {
  render () {
    return (
      <App>
        <View
          className={ style.view }
          style = {{ width: '20rpx' }}
        ></View>
      </App>
    )
  }
}
export default Index
