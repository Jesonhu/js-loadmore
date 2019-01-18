//===================================
// `加载更多`功能工具.
// @update 2019/1/17
// @author Jesonhu(github)
// @email jesonhu_web@163.com
// @example
// ```js
// step1: 初始化
// const loadMore = new LoadMore({pageSize: 5, pageIndex: 1});
// 
// step2: 检测是否可以加载更多
// const isCanLoadMore = loadMore.isCanLoadMore();
// if (isCanLoadMore) {
//   // => 可以加载更多, 执行加载更多接口
//   const pageIndex = loadMore.pageIndex; 
//   pageIndex++;
// } else {
//   // => 不能加载更多 
// }
//
// step3: 加载更多接口执行完成后更新数据 
// // => 省略加载更多接口代码，这里加载成功了
// // 更新数据
// loadMore.pageIndex = pageIndex;
// loadMore.pageCount = count;
// // 检测是否还可以加载更多
// const isCanLoadMore = loadMore.isCanLoadMore();
// ```
//===================================
const moduleName = 'LoadMore';

// @see https://github.com/umdjs/umd/blob/master/templates/commonjsStrictGlobal.js
(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    // module.exports = factory(require('b'));
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['b'], function (b) {
      // return (root.returnExportsGlobal = factory(b));
      return (root[moduleName] = factory(b));
    });
  } else {
    // 浏览器全局变量，root即window
    // root.returnExportsGlobal = factory(root.b);
    root[moduleName] = factory(root.b);
  }
}(this, function (b) {
  const INIT_PAGE_INDEX = 1;
  const INIT_PAGE_SIZE = 5;

  class LoadMore {
    constructor(config = {pageSize: INIT_PAGE_SIZE, pageIndex: INIT_PAGE_INDEX}) {
      this.init(config);
    }
    
    init(config) {
      this.initData(config);
    }
    initData(config) {
      const { pageSize, pageIndex } = config;
      /** 列表总长度 */
      this._pageCount = 0;
      /** 每页最多显示的数量 */
      this._pageSize = Number(pageSize);
      /** 当前请求的页码 */
      this._pageIndex = Number(pageIndex);
    }
    get pageCount() {
      return this._pageCount;
    }
    set pageCount(value) {
      return this._pageCount = value;
    }
    get pageIndex() {
      return this._pageIndex;
    }
    set pageIndex(value) {
      this._pageIndex = value;
    }
    get pageSize() {
      return this._pageSize;
    }
    set pageSize(value) {
      if (Number(value) <= 0) {
        throw Error('loadmore pageSize value is unexpected.');
        return;
      }
      this._pageSize = value;
    }
    get maxPageIndex() {
      return Math.ceil(this._pageCount / this._pageSize);
    }
    isCanLoadMore() {
      if (this._pageIndex >= INIT_PAGE_INDEX) {
        if (this._pageIndex < this.maxPageIndex) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return LoadMore;
}));