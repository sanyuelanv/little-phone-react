'use strict'
import React from 'react'
import style from './css.css'
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={style.all} >
        <div className={style.box}></div>
      </div>
    )
  }
}

export default App
