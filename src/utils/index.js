/*
 * @Description: 工具函数
 * @Author: eddie
 * @Date: 2020-01-13 15:34:12
 */

/**
 * @description 生成随机数
 * @param {number} min 最小值
 * @param {number} max 最大值（不包含）
 * @return {number} 随机数
 */
export const createRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * @description 生成随机英文字母
 * @param {number} num 生成位数
 * @param {string} options.type  'upperCase'大写字母 、'lowerCase'小写字母
 */
export const getRandomLetter = (num, options = {}) => {
  if (typeof num !== 'number' || num === 0) return ''
  let { type = 'upperCase' } = options
  const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let letters = type === 'upperCase' ? upperCase : lowerCase
  let randomLetters = []
  for (let x = 0; x < num; x++) {
    randomLetters.push(letters[createRandomNum(0, 26)])
  }
  return randomLetters.join('')
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