'use strict'
import React from 'react'
import App from '../component/app'
import style from './css.css'
import View from '../component/container/view'
class Index extends React.Component {
  render () {
    return (
      <App>
        <View
          className={ style.view }
          style = {{ width: '20px', display: 'flex' }}
        ></View>
      </App>
    )
  }
}
export default Index
