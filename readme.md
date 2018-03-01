## 2018-3-1 新增
1. 使用```babel-polyfill``` 代替 ```transform-runtime```
2. 加入```eslint```规则，以及使用```prop-types```做类型判断
## 2018-2-24 新增
1. `windows` 下打包使用 ```npm run w-dep```
2. 加入```eslint```规则
## 2018-2-8 新增
1. 新增图片文件运用例子：参考```component/index.js```
## 简单的一个移动端react程序
使用react作为开发框架，使用postcss，css-modules，REM布局 来兼容编译CSS。  
在JS的方面使用```babel-preset-env``` & ```transform-runtime``` & ```whatwg-fetch```来做语法上面兼容处理  
## 关于REM布局使用
1. 因为在```postcss.config.js```中使用了：```adaptive({ remUnit: 75 })``` 。 这样意味着：```75 * 10 = 750``` 。每 75px = 1 rem = 一个屏幕宽度  
2. `rpx` 则转换成 `rem` ，`px` 则不转换
3. 代码中需导入```resize.js``` 来对页面进行调整
## 关于babel-preset-env的使用
1. 在babel新推出的```babel-preset-env```