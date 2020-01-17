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
 * @param {*} 需要判断类型的任何值
 * @return {string} 值的类型（全小写）
 */
export const belongType = d => {
  const type = Object.prototype.toString.call(d)
  return type.replace(/\[object\s|\]/g, '').toLocaleLowerCase()
}
