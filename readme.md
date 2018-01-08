## 2018-1-8 新增
1. 兼容```windows```端打包
2. 新增图片文件运用例子：参考```component/index.js```
## 简单的一个移动端react程序
使用react作为开发框架，使用postcss，css-modules，REM布局 来兼容编译CSS。  
在JS的方面使用```babel-preset-env``` & ```transform-runtime``` & ```whatwg-fetch```来做语法上面兼容处理  
## 关于REM布局使用
1. 因为在```postcss.config.js```中使用了：```adaptive({ remUnit: 75 })``` 。 这样意味着：```75 * 10 = 750``` 。每 75px = 1 rem = 一个屏幕宽度  
2. 需要转换成rem的元素后面加上 ```/* rem */```, 不需要的则写上```/* no */```。 而不写上这两个的都会根据```devicePixelRatio```来转换  
## 关于babel-preset-env的使用
1. 在babel新推出的```babel-preset-env```，兼容性还没定。仅用于尝试使用  