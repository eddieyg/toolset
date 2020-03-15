/*
 * @Description: 工具函数
 * @Author: eddie
 * @Date: 2020-01-13 15:34:12
 */

/**
 * @description: 生成随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number} 随机数
 */
export const createRandomNum = (min, max) => {
  return Math.floor(Math.random() * max) + min
}

/**
 * @description: 获取数据归属类型
 * @param {*} d 需要判断类型的任何值
 * @return {string} 值的类型（全小写）
 */
export const belongType = d => {
  return Object.prototype.toString.call(d).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description: 深拷贝对象或数组
 * @param {*} data 拷贝的原数据
 * @return {object|array} 深拷贝后的对象或数组
 */
export const deepClone = (data, hash = new WeakMap()) => {
  if (hash.has(data)) return hash.get(data)
  let res
  switch (belongType(data)) {
    case 'object':
      res = {}
      break
    case 'array':
      res = []
      break
    default:
      return data
  }
  hash.set(data, res)
  for (let key in data) {
    if (['object', 'array'].includes(belongType(data[key]))) {
      res[key] = deepClone(data[key], hash)
    } else {
      res[key] = data[key]
    }
  }
  return res
}