### View
  整个框架的基础，所有元素都应该用它来替代。
  在CSS上对它进行了一些设置，这些设置都是移动端上不需要的。在盒子模型上使用了 ```border-box``` 使用起来更加方便。  
  在JS上也进行了一些封装。使用它的时候很简单只需要传入一下属性去使用即可：
  1. className: PropTypes.string: 样式类名 
  2. tapClassName: PropTypes.string: 点击时样式类名
  3. style: PropTypes.object: 样式对象
  4. touchstart: PropTypes.func: 触摸开始事件
  5. tap: PropTypes.func: 点击事件
  6. touchMove: PropTypes.func: 触摸移动事件
  7. touchEnd: PropTypes.func: 触摸结束事件
  8. touchCancel: PropTypes.func: 触摸取消事件
  9. transitionEnd: PropTypes.func: 过渡结束事件
  10. animationStart: PropTypes.func: 动画开始事件
  11. animationIteration: PropTypes.func: 动画重新开始事件
  12. animationEnd: PropTypes.func: 动画结束事件
  13. contextMenu: PropTypes.func: 右键（长按）菜单栏
  14. getRef: PropTypes.func: 获取真正dom节点
  15. id: PropTypes.string: ID
  
2. APP
  使用了该组件意味着对你的页面做了一些限制以及引入了一些全局函数。前者对你的性能有所影响，后者方便了你对项目的弹出层的调用。  
  在该组件，我们舍弃了浏览器原生的滚动，这意味着你需要引入我们提供的 ```ScrollView``` 。这看起来很笨，我们需要用一个极消耗性能的组件来取代原生的滚动。但这套方案其实是为了更好的滚动。总所周知，在 ```IOS``` 以及各家不同牌子的浏览器中，它们的 ```view``` 总是加入了让人厌烦的橡皮筋功能（即在最底部最顶部的时候，整个 ```webview``` 进行了滚动）。这是一个愚蠢的设计，为了让页面有更好的滚动，我们只能舍弃这个烦人的原生滚动。
  该组件必定使用在整个项目的最外层。
3. ScrollView
  该组件是为了更好的滚动而存在的，在使用它之前必需是在外层使用了```APP```组件。以确保原生的滚动已经被禁止掉。相关属性设置有以下
      children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    scrollbars: PropTypes.bool,
    direction: PropTypes.string,
    beforeScrollStart: PropTypes.func,
    scrollStart: PropTypes.func,
    scroll: PropTypes.func,
    scrollEnd: PropTypes.func,
    scrollCancel: PropTypes.func,
    bounce: PropTypes.bool,
    renderTopRefreshControl: PropTypes.func,
    onTouchEnd: PropTypes.func,
    getRef: PropTypes.func,
    getScrollControl: PropTypes.func,
    getIScroll: PropTypes.func
4. Load
5. toast
6. ListView


5. LoadIcon
7. Swiper
8. Modal
