# `加载更多` 插件

> 这是一款 `js`的 `加载更多` 插件. 支持 `CommonJS` 和 `浏览器` 环境.

## 引入方式

### 方式1: 浏览器环境引入
```html
<script src="./loadMore.js">
```

### 方式2：Nodejs(CommonJS) 环境
```js
const loadMore = require('./loadMore.js');
```

## 使用说明

### step1: 初始化(initialize)
```js
const loadMore = new LoadMore({pageIndex: 1, pageSize: 5});
```

### step2: 第一次接口请求后 `更新数据`(first request and then update loadMore data)

```js
const pageIndex = '当前请求的页码/request pageIndex';
const count = '当前请求返回的列表总数/request list total count';
loadMore.pageIndex = pageIndex;
loadMore.pageCount = count;
const isCanLoadMore = loadMore.isCanLoadMore();
if (!isCanLoadMore) {
  // 无法再进行加载更多操作了(can't loadMore)
}
```

### step3: 检查当前是否可以加载更多(check if can loadMore)
```js
const isCanLoadMore = loadMore.isCanLoadMore();
// can
if (isCanLoadMore) {
  const pageIndex = loadMore.pageIndex;
  pageIndex++;
  // => 可以加载更多, 执行加载更多接口
} else { // can't
  // => 不能加载更多 
}
```

### step4: 接口请求后 `更新数据`(after request should update loadMore data)
```js
const pageIndex = '当前请求的页码';
const count = '当前请求返回的列表总数';
loadMore.pageIndex = pageIndex;
loadMore.pageCount = count;
const isCanLoadMore = loadMore.isCanLoadMore();
if (!isCanLoadMore) {
  // 无法再进行加载更多操作了
}
```

## 在线 Demo
+ [一页单个加载更多](https://weixin.easysolves.com/sites/loadmore/single/)
+ [一页多个加载更多](https://weixin.easysolves.com/sites/loadmore/multiple/)

## 属性(property)
|名称|类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
|pageIndex|Number|get: 返回当前请求的页码, set: 当前请求的页码|1|-|
|pageSize|Number|get: 返回每页最多显示的数量, set: 每页最多显示的数量, 一般在初始化的时候设置，其他时候不需要设置，一般是个固定的值。|5|-|
|pageCount|Number|get: 返回请求返回的列表总数, set: 请求返回的列表总数|0|-|
|maxPageIndex|Number|get: 返回请求的最大页码数|-|-|

## 方法(method)
|名称|返回类型|说明|默认值|可选值|
|--|--|--|:--:|:--:|
|isCanLoadMore|布尔值|如果可以加载更多返回 `true`,否则返回 `false`|-|-|