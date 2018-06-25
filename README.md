# image-player
描述：序列帧动画，图片帧动画，把一组图片做成类似动画的效果。把图片像视频一样播放

适用于：在拥有大量图片素材的情况下实现动画。

也适用于：不是专业的动画/效攻城狮，但是却接到了动画需求，同时，设计同学肯为你出一系列动画素材。

### 开始(Start)
    
    let imagePlayer = new ImagePlayer(selector, options);

### 参数(Options)

|参数    |类型   |默认值      |描述          |
|:-------|:-----|:------------|:------------|
|width   |Number|0         |canvas画布的默认宽度(若不传，则为selector的宽度)|
|height  |Number|0         |canvas画布的默认宽度(若不传，则为selector的高度)|
|images  |Array |[]        |播放动画的图片系列|
|loop    |Boolean|false    |开启循环播放|
|loopDirection |Number|1   |开启循环播放的方向(1:正序播放;-1,倒序播放;2:正序倒序交替播放)|
|loopStart|Number|0    |开启循环播放的起始位置|
|loopEnd|Number|0    |开启循环播放的结束位置(若不传，则为images.length-1)|
|sequence|Number|20  |频次，一秒播放多少张图片|
|autoPlay|Boolean|false  |自动播放|
|bgColor|color|#fff  |canvas的背景颜色|
|logLevel|Number|4  |日志级别(0:无任何日志;1:输出错误日志;2:输出错误和警告日志;3:输出错误，警告和程序运行日志;4:输出开发日志在内的所有日志，开发此库的时候用)|

### 方法(Api)
|方法    |描述          |
|:-------|:------------|
|ready(cb) |实例准备好时调用|
|play(direction) |播放(direction,1:正序播放，-1,倒序播放,默认正序)|
|pause |暂停|
|reset |重置|
|openLoop |开启循环|
|closeLoop |关闭循环|
|loopEnd(cb) |播放/循环结束时调用|
|registeredFilter(next) |图片默认拉伸居中显示，若想改变位置，可通过注入过滤去实现|
|removeFilter |删除过滤器，恢复默认显示|
|destroy |销毁实例|

### 效果(Effect)
![effect](./demo/effect.gif)

### 例子(demo)
获取项目后，进入项目，执行 npm run demo-server或者双击demo-server.sh，执行成功后，访问http://localhost:3865/demo/index.html 即可
