# `加载更多` 插件

> 这是一款 `js`的 `加载更多` 插件. 支持 `CommonJS` 和 `浏览器` 环境.

## 使用方式

### 方式1: 浏览器环境
```html
<script src="./loadMore.js">
```

```js
// 初始化
// pageSize: 每页最多显示的数量.
// pageIndex: 初始请求的页码数.
loadMore.init({pageSize: 5, pageIndex: 1});

```
使用 `window.loadMore` 实现加载更多功能

### 方式2：Nodejs(CommonJS) 环境
```js
const loadMore = require('./loadMore.js');
```

### 说明

### 属性
|名称|类型|说明|默认值|可选值|
|--|--|--|--|--|
