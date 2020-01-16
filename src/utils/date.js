/*
 * @Description: 日期工具函数
 * @Author: eddie
 * @Date: 2020-01-16 10:26:24
 */


/**
 * @description: 获取时间戳距离今天有多少天（不按具体的24小时一天算，按天差算。如现在22点，距离时间戳还有3小时，但依然按1天距离算）
 * @param {number} timestamp 某个时间的时间戳
 * @return {object}
 *  {
 *    type: 'past'/'future', // 时间为：过去/未来
 *    days： number          // 间隔今天多少天
 *  }
 */
export const getIntervalDays = timestamp => {
  if (!parseInt(timestamp)) console.error('timestamp时间戳参数有误')
  nowDate = new Date()
  const result = {}
  const dayMillisecond = 1000 * 60 * 60 * 24
  let timeGap = timestamp - +nowDate
  let isPast = false
  let dayGap
  // 时间戳已过去，timeGap转为正数
  if (timeGap < 0) {
    isPast = true
    timeGap = String(timeGap).replace('-', '') * 1
  }
  dayGap = timeGap / dayMillisecond
  // 间隔天数是否为整数
  if (dayGap % 1 === 0) {
    result.days = dayGap
  } else {
    // 判断间隔天数的小数是否包含今天的时间，对天数下舍上入
    let decimal = String(dayGap).replace(/^\d+\./, '0.') * 1
    let todayGap
    if (isPast) {
      todayGap = +nowDate - +new Date(nowDate.toDateString() + ' 00:00:00')
    } else {
      todayGap = +new Date(nowDate.toDateString() + ' 23:59:59') - +nowDate
    }
    todayGap = (todayGap + 1) / dayMillisecond
    result.days = decimal <= todayGap ? Math.floor(dayGap) : Math.ceil(dayGap)
  }
  result.type = isPast ? 'past' : 'future'
  return result
}
