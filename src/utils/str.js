/*
 * @Description: 字符串工具函数
 * @Author: eddie
 * @Date: 2020-01-16 10:33:33
 */
import { belongType } from './index'

/**
 * @description: 对象序列化为字符串参数（不支持多维对象） { a: 1, b: 2 } >> 'a=1&b=2'
 * @param {object} strObj 需要序列化的对象（必填）
 * @param {object} options 配置选项
 * @param {Boolean} options.encode 是否对参数值编码
 * @return: 
 */
export const objStringify = (strObj, options = {}) => {
  if (belongType(strObj) !== 'object') {
    console.error('序列化参数为必填，且必须为object对象')
    return false
  }
}