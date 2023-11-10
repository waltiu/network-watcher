
# network-watcher   <a href="https://www.npmjs.com/package/network-watcher"><img src="https://badgen.net/npm/v/network-watcher" alt="Version"></a>

<p align="center">

 </p>

通过一个小图片，实现网络自动检测


## Install

```
npm i network-watcher 
```

or

```
yarn add network-watcher  
```

## Usage


```js
// 在调用时直接引用（建议不要全局，具体哪个模块需要再在哪个模块取调用）
// 具体用法可以看test中的demo
import checkNetwork from 'network-watcher '
 const timer= checkNetwork(
     // 图片url建议找个小的图片，防止阻塞正常流程
    'https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png', 
    (currentStatus) => {
        console.log(currentStatus?"网络恢复":"网络断开")   // true | false 
    },
    {
      interval:3000, // 循环间隔时间
      timeout: 1000, // 图片响应超时时间，自动设置为网络终端
    },
  );
// clearInterval(timer)  可以自己根据需求，初始化或销毁   
```

