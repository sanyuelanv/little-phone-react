'use strict'
import { Text, App, View, Button, ScrollView, ListView } from '../../component/index'
import style from './css.css'
import Item from './item'
const dataSource = [
  { id: 1, text: '哈哈哈哈哈' },
  { id: 2, text: '哈哈哈哈哈' },
  { id: 3, text: '哈哈哈哈哈' },
  { id: 4, text: '哈哈哈哈哈' },
  { id: 5, text: '哈哈哈哈哈' },
  { id: 6, text: '哈哈哈哈哈' },
  { id: 7, text: '哈哈哈哈哈' },
  { id: 8, text: '哈哈哈哈哈' },
  { id: 9, text: '哈哈哈哈哈' }

]
class Index extends React.Component {
  render () {
    return (
      <App noSysScroll={true}>
        <ListView
          Item={Item}
          itemKey='id'
          layoutClassName = {style.list}
          className={style.listBox}
          dataSource = {dataSource}
          topRefresh = {(cb) => {
            setTimeout(() => {
              if (cb) { cb() }
            }, 2000)
          }}
          // bottomRefresh = {(cb) => {
          //   setTimeout(() => {
          //     if (cb) { cb() }
          //   }, 2000)
          // }}
        />
      </App>
    )
  }
}
export default Index
