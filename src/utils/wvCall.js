/*
 * @Description: App webview 内调用协议链接
 * @Author: eddie
 * @Date: 2020-01-16 10:19:58
 */
import { objStringify } from './str';
window.Jsbridge = window.Jsbridge || {};

/**
 * App协议配置列表
 *  无默认参数：
 *    example: 'example://path'     // 协议链接
 *  有默认参数：
 *    example: {
 *      url: 'example://path',      // 协议链接
 *      params: {
 *        type: 1                   // 协议参数
 *      },
 *      callback: () => {}          // 默认回调函数（会被cb参数覆盖）
 *    }
 */
const agreementList = {
  // 关闭WebView
  closewebview: 'example://closewebview',
  /**
   * 分享
   * params:
   *  title: 标题
   */
  share: {
    url: 'example://share',
    params: {
      title: '标题',
    },
    callback: () => {},
  } 
};

/**
 * 调用App协议链接
 *
 * @param {string} type     App协议配置列表的key名
 * @param {object} params   协议参数（会覆盖默认参数）
 * @param {function} cb     协议执行回调函数（会覆盖默认回调，大部分协议App都没支持）
 *
 */
export default (type, params = {}, cb) => {
  if (typeof type !== 'string') {
    console.error('“type” 参数为必填，并且类型需为字符串');
    return false;
  }
  if (
    !agreementList[type] ||
    (JSON.stringify(agreementList[type]) === '{}' && !agreementList[type].url)
  ) {
    console.error('协议链接 错误或不存在');
    return false;
  }
  let ag;
  // 兼容字符串和对象两种写法
  if (typeof agreementList[type] === 'string') {
    ag = {
      url: agreementList[type],
      params: {},
    };
  } else {
    ag = agreementList[type];
  }
  // 拼接参数和回调
  let paramsStr = objStringify(Object.assign({}, ag.params, params), {
    encode: true,
  });
  paramsStr = paramsStr ? `?${paramsStr}` : '';
  let cbName = '';
  if ((cb && typeof cb === 'function') || ag.callback) {
    cbName = `${type}CB`;
    window.Jsbridge[cbName] = cb || ag.callback;
    cbName = `/${cbName}`;
  }
  // iframe加载协议链接
  const ifr = document.createElement('iframe');
  ifr.style.display = 'none';
  console.log(ag.url + cbName + paramsStr);
  ifr.src = ag.url + cbName + paramsStr;
  document.documentElement.appendChild(ifr);
  setTimeout(() => {
    document.documentElement.removeChild(ifr);
  }, 0);
};
