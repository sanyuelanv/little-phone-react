# 开发说明
一般项目分成三种开发模式：  
第一种是单页面单路由开发，不涉及路由改变，前后端分离与否都没关系，常见于简单活动页开发  
第二种是多页面前后端不分离的，适用旧项目，常见于复杂的活动页开发  
第三种是多页面前后端分离的，建议引入 ```react-router``` , ```mobx``` 做管理，常见于APP内嵌的大型产品页  
该工具支持前两种模式开发。

# 组件说明
## View组件
----
整个框架的基础，所有元素都可以用它来替代。  
在CSS上对它进行了一些设置，这些设置都是移动端上不需要的：禁止了选择，使用合理的盒子模型以及取消了点击高亮的情况。  
```css
  user-select: none;
  box-sizing: border-box;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
```
在JS上也进行了一些封装。使用它的时候很简单只需要传入以下属性去使用即可  

### Prop
----
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |  
|---------|---------|--------- |---------|---------|
| className| string |  null | 该组件的样式类名 | 否 |
| id | string | null | 节点ID属性 | 否 |
| style| object |  null | 该组件的样式属性 | 否 |
| tap| func |  null | 点击事件 | 否 |
| touchStart| func |  null | 触摸开始事件 | 否 |
| touchMove| func |  null | 触摸移动事件 | 否 |
| touchEnd| func |  null | 触摸结束事件 | 否 |
| touchCancel| func |  null | 触摸取消事件 | 否 |
| transitionEnd| func |  null | 过渡动画结束事件 | 否 |
| animationStart| func |  null |  CSS 动画开始事件 |否 |
| animationIteration | func |  null | CSS 动画重复播放事件 |否 |
| animationEnd| func |  null |  CSS 动画结束事件 |否 |
| getRef | func | null | 获取DOM节点 | 否 |
| contextMenu | func | null | 上下文菜单事件 |否 |

  
## App组件
----
整个 ```App``` 组件是覆盖我们浏览器的可视窗口并且是不可滚动的，该组件是整个页面的 ```root``` ，使用这个组件会对浏览器作出一些限制和帮助。    
为了统一所有浏览器下的滚动以及避免一些浏览器下原生滚动的一些缺陷，我们舍弃了浏览器原生的滚动，这意味着你需要引入我们提供的  ```ScrollView``` ： 舍去原生的滚动功能，引入用一个相对耗费性能的组件来取代，这样我们能更好的滚动以及更好的控制滚动。  

### Prop
----
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| noSysScroll| bool | true | 是否禁止系统的滚动 | 否 | 

### 全局函数
----
引入了 ```App``` 组件之后，我们可以使用一些预设的提示样式，只要访问全局对象 ```window.Qapp``` 即可使用。（需要注意的是，这些预设函数涉及到 ```dom``` 节点的生成，所以必须在 ```componentDidMount``` 下使用）  

#### 1. 加载遮罩（load mask）
由 ```showLoad(object)``` 和 ```hideLoad()```来控制出现和消失。

```object``` 参数  

| 名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| content | string  | "加载中" | 加载遮罩提示文字 | 否 |
| maskColor | string | 'rgba(0, 0, 0, 0)' | 遮罩层背景颜色|否 |

#### 2. toast 遮罩（toast mask）
由 ``` window.Qapp.showToast(object)``` 来控制出现，在指定时间之后消失。

```object``` 参数  

| 名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| content | string  | null | 提示文字 | 是 |
| theme | number | 0 | 主体（黑底白字 0/白底黑字 1）| 否 |
| time | number | 2000 | 指定xx毫秒消失时间| 否 |

#### 3. alert 遮罩（alert mask）
由 ``` window.Qapp.showAlert(object)``` 来控制出现，在用户操作后消失。  

```object``` 参数  

| 名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| content | string  | null | 提示文字 | 是|
| title | string | null | 标题 |否|
| maskColor | string | 'rgba(0, 0, 0, 0)' | 遮罩层背景颜色 |否|
| rightButton | object | {event: null,name: '确认',color: '#09BB07'} | 右边按钮 |否|
| leftButton | object | null | 左边按钮 |否|

## ScrollView组件
----
该组件是为了更好的滚动而存在的，在使用它之前请确认根组件是 ```noSysScroll:true``` 的 ```App``` 组件。  
需要注意的是该组件，必须设定宽高（横向滚动需要设置宽度，纵向滚动需要设置高度）。  
由于 ```ScrollView``` 继承 ```View``` 所以```View```组件的属性，它都可以使用，以下列举的是它自身独有的属性。

### Prop
----
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |  
|---------|---------|--------- |---------|---------|
| scrollbars| bool |  true | 是否出现滚动条 | 否 |
| direction| string |  'column' | 滚动方向(row/column) | 否 |
| bounce| bool |  true | 滚动到边界回弹 | 否 |
| beforeScrollStart | func | null | 滚动开始前执行事件 | 否 | 
| scrollStart | func | null | 滚动开始执行事件 | 否 | 
| scroll | func | null | 滚动中执行事件 | 否 | 
| scrollEnd | func | null | 滚动结束执行事件 | 否 | 
| scrollCancel | func | null | 滚动取消执行事件 | 否 | 
| getScrollControl | func | null | 返回一个可控制滚动的函数 | 否
| mustScroll | bool | false | 和bounce配合使用，在子元素不满一页的情况下是否还能启用滚动 | 否

## ListView组件
-----
```ListView``` 为  ```ScrollView``` 的拓展。主要是为了需要使用下拉刷新，到底加载更多这些功能而存在的。目前只支持 ```column``` 方向。

### Prop
----
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| Item| node | null | 子节点组件 | 是 |
| itemProp | object | null | 子节点组件属性 | 否 | 
| itemKey| any | null | 子节点组件 key 属性 | 是 |
| dataSource| array | null | 数据源 | 是 |
| topRefreshControl| object | null | 下拉刷新组件样式 | 否 |
| topRefresh| func | null | 下拉刷新执行事件 | 否 |
| bottomRefresh| func | null | 上拉到底执行事件 | 否 |
| bottomRefreshControl| object | null | 上拉到底组件样式 | 否 |
| Header | node | null | 头部组件 | 否 | 
| headerProp | object | null | 头部组件属性 | 否 | 
| layoutClassName | string | null | 列表层样式类名 | 否 |
| className | string | null | 滚动层样式类名 | 否 |

### Text组件
----
Text和View很像，但是它不会响应任何事件，只是用于文字的展示，而且也不能嵌套使用。但如果需要长按复制的文字，就使用Text标签。（注：部分安卓浏览器无法禁止长按复制文字）

### Button组件
----
继承自 ```View```组件，为了方便点击时候样式切换而存在的。  

### Prop
----
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| tapClassName| string | null | 点击时候样式 | 否 |

#开发规范

# 例子
1. 每个组件的简单使用
3. ```ScrollView``` 的几种排列样式
4. 传统多页面开发
5. 单页面开发

# todo
1. Swiper
2. Image