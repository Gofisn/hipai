# hi-toupe

#### 构建包注意事项

* 一、本地测试包
    * 1、打开native.js中注释
    ```
    if (!isProduction) { // 生产环境下用cdn资源
        // build生产包要注释下面5行，测试环境下打开
        var jsrsasign = require("jsrsasign")
        var RSAKey = jsrsasign.RSAKey
    }
    ```
    * 2、构建命令`npm run serve`

* 二、构建生产包
    * 1、注释native.js中5行代码
    ```
    if (!isProduction) { // 生产环境下用cdn资源
        // build生产包要注释下面5行，测试环境下打开
        // var jsrsasign = require("jsrsasign")
        // var RSAKey = jsrsasign.RSAKey
    }
    ```
    * 2、构建命令`npm run build`

#### 首屏加载优化

* 0、分析文件大小的插件：webpack-bundle-analyzer， 构建`npm run build --report`查看

* 1、使用tinypng无损压缩所有图片

* 2、关闭默认开启的prefetch
    ```
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
    ```

* 3、公用代码提取，使用cdn加载

    - cdn资源： https://www.bootcdn.cn/, 建议使用这个，因为即优化了cdn资源，还开启了gzip压缩传输

对于vue, vuex, vue-router，axios等我们可以利用wenpack的externals参数来配置，这里我们设定只需要在生产环境中才需要使用:

* 4、Nginx开启gzip，chrome控制台可以查看是否开启gzip


##### 代码有关的优化首屏

* 1、echarts不要放在vue原型链中，用到的页面需要，按需加载相对图形，如line折线图

```
// 加载echarts，注意引入文件的路径
import echarts from 'echarts/lib/echarts'
// 再引入你需要使用的图表类型
import 'echarts/lib/chart/line'

```

* 2、生产环境下`jsrsasign`也使用cdn资源替代

```
// native.js中
// 兼容生产环境下的cdn资源引入jsrsasign库
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) { // 生产环境下用cdn资源
    // build生产包要注释下面5行，测试环境下打开
    // var jsrsasign = require("jsrsasign")
    // var RSAKey = jsrsasign.RSAKey
    // var KEYUTIL = jsrsasign.KEYUTIL
    // var KJUR = jsrsasign.KJUR
    // var hextob64 = jsrsasign.hextob64
}
```


![查考链接《关于vue-cli 3配置打包优化要点》](https://www.jianshu.com/p/3043d474fb86)
![查考链接《vue项目首屏加载优化实战》](https://www.cnblogs.com/mianbaodaxia/p/10751453.html)

