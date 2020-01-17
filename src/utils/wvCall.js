/*
 * @Description: App webview内调用协议链接
 * @Author: eddie
 * @Date: 2020-01-16 10:19:58
 */
import { objStringify } from './str';

// App协议配置列表
const agreementList = {}
// 全局回调对象名
let callbackObjName = 'Jsbridge'

/**
 * @description: 配置App协议列表
 * @param {object} list        App协议列表
 *  无默认参数：
 *    { example: 'example://path' }   // 协议链接
 *  有默认参数：
 *    {
 *      example: {
 *        url: 'example://path',      // 协议链接
 *        params: {
 *          type: 1                   // 协议参数
 *        },
 *        callback: () => {}          // 默认回调函数（会被.call()的cb参数覆盖）
 *      }
 *    }
 * @param {string} cbObjName   全局回调对象名
 * @return {object} 覆盖配置后的数据
 */
const config = (list = {}, cbObjName) => {
  Object.assign(agreementList, list)
  if (cbObjName) {
    if (typeof cbObjName !== 'string') {
      console.error('“cbObjName” 全局回调对象名 类型需为字符串');
      return false;
    } else {
      callbackObjName = cbObjName
      window[cbObjName] = window[cbObjName] || {}
    }
  }
  return {
    callbackObjName: callbackObjName,
    agreementList: {...agreementList}
  }
}

/**
 * @description: 调用App协议链接
 * @param {string} type     App协议配置列表的key名（必填）
 * @param {object} params   协议参数（会覆盖默认参数）
 * @param {function} cb     协议执行回调函数（会覆盖默认回调，需要App支持）
 * @return {string}         拼接后的App协议链接
 */
const call = (type, params = {}, cb) => {
  if (typeof type !== 'string') {
    console.error('“type” 参数为必填，并且类型需为字符串')
    return false
  }
  if (
    !agreementList[type] ||
    (JSON.stringify(agreementList[type]) === '{}' && !agreementList[type].url)
  ) {
    console.error('协议链接 错误或不存在')
    return false
  }
  let ag
  // 兼容字符串和对象两种写法
  if (typeof agreementList[type] === 'string') {
    ag = {
      url: agreementList[type],
      params: {},
    }
  } else {
    ag = {...agreementList[type]}
  }
  let url = ag.url
  // 拼接参数
  let paramsStr = objStringify(Object.assign({}, ag.params, params), {
    encode: true,
  })
  paramsStr = paramsStr ? `?${paramsStr}` : ''
  // 配置回调函数
  let cbName = ''
  if ((cb && typeof cb === 'function') || ag.callback) {
    cbName = `${type}CB`
    url += `/${cbName}`
    if (cb && typeof cb === 'function') {
      window[callbackObjName][cbName] = () => {
        cb()
        delete window[callbackObjName][cbName]
      }
    } else {
      window[callbackObjName][cbName] = ag.callback
    }
  }
  // iframe加载协议链接
  const ifr = document.createElement('iframe')
  ifr.style.display = 'none'
  ifr.src = url + paramsStr
  document.documentElement.appendChild(ifr)
  setTimeout(() => {
    document.documentElement.removeChild(ifr)
  }, 0)
  return url + paramsStr
}

export default { config, call }
