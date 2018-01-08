'use strict'
import React from 'react'
import style from './css.css'
import icon from "../image/icon.svg"
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className={style.all} >
        <div className={style.box}>
          <img className={style.image} src={icon} />
          <div className={style.image2}></div>
        </div>
      </div>
    )
  }
}

export default App
