/*
 * @Description: 数字工具函数
 * @Author: eddie
 * @Date: 2020-08-23 10:33:33
 */

/**
 * @description: 保留小数字位数
 * @param {number} num 需要被保留的数字
 * @param {number} keepNum 保留位数
 * @param {boolean} isRound 是否四舍五入
 * @return {string}
 */
// 保留小数字位数
export const toFixed = (num, keepNum = 2, isRound = false) => {
  if (!/^-?[0-9]+\.?[0-9]*$/.test(num)) return ''
  let nums = String(num).split('.')
  if (nums[1]) {
    let num1 = nums[1].split('')
    if (num1.length > keepNum && isRound && num1[keepNum] > 4) {
      let val = num1[keepNum - 1] * 1 + 1
      if (val > 9) {
        if (keepNum - 2 >= 0) {
          num1[keepNum - 2] = num1[keepNum - 2] * 1 + 1
        } else {
          num[0][num[0].length - 1] = num[0][num[0].length - 1] * 1 + 1
        }
        num1[keepNum - 1] = '0'
      } else {
        num1[keepNum - 1] = val
      }
    }
    nums[1] = num1.slice(0, keepNum).join('')
  } else {
    nums[1] = ''
  }
  let addZeroTotal = keepNum - String(nums[1]).length
  nums[1] += '0'.repeat(addZeroTotal > 0 ? addZeroTotal : 0)
  return nums[1] === '' ? nums[0] : nums.join('.')
}

/**
 * @description: 加减乘除法计算 获取精确无误差的结果
 * @param {string} computeType 计算类型：加法'add' | 减法'subtr' | 乘法'mul' | 除法'div'
 * @param {number|string} num1 加数 | 被减数 | 乘数 | 被除数
 * @param {number|string} num2 加数 | 减数  | 乘数 | 除数
 * @return {number} 计算结果值
 */
export const computeNum = (computeType, num1, num2) => {
  if (!['add', 'subtr', 'mul', 'div'].includes(computeType)) {
    console.error('computeNum函数参数错误，“computeType”计算类型！', computeType)
    return
  } else if (
    !/^-?[0-9]+\.?[0-9]*$/.test(num1) ||
    !/^-?[0-9]+\.?[0-9]*$/.test(num2)
  ) {
    console.error('computeNum函数参数错误，第二参数或第三参数非数字！', num1, num2)
    return
  }
  var r1, r2, m, res;
  try { r1 = num1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = num2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  let _num1 = Number(num1.toString().replace('.', ''))
  let _num2 = Number(num2.toString().replace('.', ''))
  if (r1 > r2) {
    _num2 = _num2 * Math.pow(10, r1 - r2)
  } else if (r1 < r2) {
    _num1 = _num1 * Math.pow(10, r2 - r1)
  }
  switch(computeType) {
    case 'add':
      res = (_num1 + _num2) / m
      break
    case 'subtr':
      res = (_num1 - _num2) / m
      break
    case 'mul':
      res = _num1 * _num2 / Math.pow(m, 2)
      break
    case 'div':
      res = _num1 / _num2
      break
  }
  return res
}
