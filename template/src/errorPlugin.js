
import store from './store/index';

const errCode = new Map([
    ['E1001', '系統未知錯誤'],
    ['E1002', 'Vue邏輯錯誤'],
    ['E1003', 'JavaScript錯誤'],
    ['E1004', '靜態資源載入錯誤'],
    ['E1005', '請求錯誤'],
    ['E1006', 'Promise錯誤']
])
// 判斷是否為Promise
function isPromise(ret) {
    return ret && typeof ret.then === 'function' && typeof ret.catch === 'function'
}

// 錯誤處理
function errorHandler( code = 'E1001', err, vm, info) {
    console.log('errorHandler', code, err, vm, info);
    let message = err || '系統未知錯誤';
    let errorCode = code;

    if (err && err.response && err.response.status) {
        errorCode = 'E1005';
        message = `【status: ${err.response.status}】 ${err.message}`;
    } else if (err instanceof Error) {
        errorCode = 'E1006'; // Promise錯誤
    } else if (typeof err === 'string') {
        message = err;
    }
    const log = {
        errorCode,
        type: errCode.get(errorCode),
        msg: message,
        info, // 額外的錯誤訊息，如Vue錯誤還是全域錯誤
        router: vm && vm.$route ? vm.$route.fullPath : '未知', // 如果是Vue錯誤，則獲取當前路由
        file: err.filename || '',
        createTime: new Date().getTime()
    };
    console.log('捕獲錯誤: ', log);
    store.dispatch('errorLog/addErrorLog', log);
}


const GlobalError = {
    install: (Vue) => {
  
      // Vue錯誤
      Vue.config.errorHandler = (err, vm, info) => {
        errorHandler('E1002', err, vm, info)
      };
  
        // 靜態資源載入錯誤 or JavaScript錯誤
      window.addEventListener('error', (error) => {
        if (error.message) {
            errorHandler('E1003', error.message, error.filename)
        } else {
            errorHandler('E1004', error.target.currentSrc, error.filename)
        }
    }, true)
  
      // 未處理的Promise異常
      window.addEventListener('unhandledrejection', event => {
        console.log('unhandledrejection', event);
        const reason = event.reason instanceof Error ? event.reason : new Error(`Promise rejection: ${event.reason}`);
        errorHandler('E1006', reason, null);
    });
  
        // 監聽Vue實例的methods
      Vue.mixin({
        beforeCreate() {
          const methods = this.$options.methods || {};
          for (const key in methods) {
            if (Object.hasOwnProperty.call(methods, key)) {
              const fn = methods[key];
              methods[key] = function (...args) {
                const ret = fn.apply(this, args);
                if (isPromise(ret) && !ret._handled) {
                  ret._handled = true;
                  ret.catch((e) => errorHandler('E1006', e.reason, null));
                }
                return ret;
              };
            }
          }
        },
      });
    },
  };

export default GlobalError
