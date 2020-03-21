/*
 * @Description: 字符串工具函数
 * @Author: eddie
 * @Date: 2020-01-16 10:33:33
 */
import { belongType } from './index'

/**
 * @description: 过滤字符串的html标签和转义字符
 * @param {string} 需要过滤的字符串
 * @return {string} 过滤后的字符串
 */
export const filterHTMLTags = str => {
  if (typeof str !== 'string') return '';
  return str.replace(/<\/?.+?>/g, '').replace(/&[#0-9a-zA-Z]+;/g, '');
};

/**
 * @description: 去除字符串左右两侧的空格
 * @param {*} 需要处理的字符串
 * @return {string} 处理后的字符串
 */
export const trim = str => {
  if (typeof str !== 'string') return '';
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * @description: '-'分隔字符串转为驼峰字符串
 * @param {*} 需要处理的字符串
 * @return {string} 处理后的字符串
 */
export const convertToHump = str => {
  if (typeof str !== 'string') return '';
  if (/[a-zA-Z]-[a-zA-Z]/.test(str)) {
    let strs = str.split('').map((e, i, arr) => {
      if (e === '-') return ''
      if (i === 0) return e
      if (arr[i - 1] === '-') {
        return e.toLocaleUpperCase()
      }
      return e
    })
    return strs.join('')
  }
  return str;
}

/**
 * @description: 对象序列化为字符串参数（不支持多维对象） { a: 1, b: [] } >> 'a=1&b="[]"'
 * @param {object} strObj 需要序列化的对象（必填，支持对象的值为string、number、array、object）
 * @param {object} options 配置选项
 * @param {boolean} options.encode 是否对参数值编码
 * @return {string} 序列化拼接后的字符串
 */
export const objStringify = (strObj, options = {}) => {
  if (belongType(strObj) !== 'object') {
    console.error('objStringify：序列化参数为必填，且必须为object对象')
    return ''
  }
  let res = []
  Object.keys(strObj).forEach((key, index, arr) => {
    let paramVal
    if (/string|number/.test(belongType(strObj[key]))) {
      paramVal = strObj[key]
    } else if (/array|object/.test(belongType(strObj[key]))) {
      paramVal = JSON.stringify(strObj[key])
    } else {
      paramVal = ''
    }
    if (options.encode) paramVal = encodeURIComponent(paramVal)
    res.push(`${key}=${paramVal}`)
  })
  return res.join('&')
}

/**
 * @description: 参数字符串解析为对象  'a=1&b="[]"' >> { a: 1, b: [] }
 * @param {string} str 需要解析的参数字符串（必填，支持参数值为string、number、array、object）
 * @param {object} options 配置选项
 * @param {boolean} options.noDecode 是否不对参数值解码
 * @param {boolean} options.noJSON 是否不对参数值'[]'和'{}'解析为数组和对象
 * @return {object} 解析后的对象
 */
export const strParse = (str, options = {}) => {
  if (belongType(str) !== 'string') {
    console.error('strParse：参数字符串为必填，且必须为string字符串')
    return {}
  }
  str = str.replace(/^\?/, '')
  let strs = str.split('&')
  let res = {}
  if (strs[0] === '') strs.pop()
  strs.forEach(item => {
    let items = item.split('=') 
    if (!items[0]) return
    let paramVal
    if (items[1]) {
      paramVal = items[1]
      if (!options.noDecode) paramVal = decodeURIComponent(paramVal)
      if (!options.noJSON && /^\[.*\]$|^\{.*\}$/.test(paramVal)) {
        paramVal = JSON.parse(paramVal)
      }
    } else {
      paramVal = ''
    }
    res[items[0]] = paramVal
  })
  return res
}
