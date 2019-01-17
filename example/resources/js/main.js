;(function(win, doc, $) {
  const PAGE_SIZE = 5;
  const page = {
    init() {
      this.initData();
      this.onLoadMore();
    },
    initData() {
      loadMore.init({pageSize: PAGE_SIZE, pageIndex: 1});
      this.xhrGetList(1);
    },
    list: [],
    isXhrGetListComplete: true,
    xhrGetList(pageIndex) {
      const self = this;
      const url = `https://easy-mock.com/mock/5ba05fc2dadd12214f1f47c3/api/online-test/home/ajax/newspage?pageindex=${pageIndex}&pagesize=${PAGE_SIZE}`;

      this.isXhrGetListComplete = false;
      request(url, 'GET').then(res => {
        const { status } = res;
        if (status) {
          const { count, list } = res;
          
          
          if (list.length === 0) return;

          self.isXhrGetListComplete = true;

          const oldList = JSON.parse(JSON.stringify(self.list));
          const lists = oldList.concat(list);

          loadMore.pageIndex = pageIndex;
          loadMore.pageCount = count;
          const isCanLoadMore = loadMore.isCanLoadMore();
          if (!isCanLoadMore) {
            this.hideLoadMore();
          }
        
          this.renderList(lists);

          
        } else {
          const { msg } = res;
          console.log('请求失败:' + msg);
        }
      }).catch(err => {
        console.log('err', err);
      });
    },
    renderList(list) {
      const oList = document.querySelector('.list_bd');
      if (list.length === 0) return;
      let listStr = '';

      this.list = list;
      list.forEach((item) => {
        const title = item.title;
        const subTitle = item.subTitle;
        listStr += `<div class="item_bd">
                    <div class="media">
                      <img class="mr-3" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_168599af7e6%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_168599af7e6%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2213.5546875%22%20y%3D%2236.5%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Generic placeholder image">
                      <div class="media-body">
                        <h5 class="mt-0">${title}</h5>
                        ${subTitle}
                      </div>
                    </div>
        </div>`;
      });
      oList.innerHTML = listStr;
    },
    onLoadMore() {
      const self = this;
      const oLoadMore = doc.querySelector('.loadmore_btn');
      
      oLoadMore.addEventListener('click', () => {
        isCanHandleLoadmore = this.isXhrGetListComplete;
        if (!isCanHandleLoadmore) return;
        
        let pageIndex = loadMore.pageIndex;
        const isCanLoadMore = loadMore.isCanLoadMore(pageIndex);
        
        if (isCanLoadMore) {
          pageIndex++;
          self.xhrGetList(pageIndex);
        } else {
          console.log('不能加载更多');
        }

      });
    },
    hideLoadMore() {
      const oLoadMore = doc.querySelector('.loadmore_btn');
      oLoadMore.style.display = 'none';
    }
  }

  const loadMore = win.loadMore;
  
  /** 
   * 接口请求.
   * 将 jQuery ajax Promise化.
   */
  const request = function(url, type, params = {}) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: type,
        data: params,
        success: function(res) {
          resolve(res);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }

  page.init();

})(window, document, jQuery);