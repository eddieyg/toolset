
// 公用方法
export default {

  // 设置url参数
  setRequest (url, params, type = {}) {
    if (typeof (params) !== 'object') return url
    var urlList = url.split('#')
    url = urlList[0]
    var hash = urlList[1] ? '#' + urlList[1] : ''
    var paramsStrLIst = []
    for (var key in params) {
      var pattern = new RegExp(key + '=([^&]*)&?')
      url = url.replace(pattern, '')
      paramsStrLIst.push(key + '=' + params[key])
    }
    if (url.match('[?]')) {
      return (url + '&' + paramsStrLIst.join('&')).replace('?&', '?') + hash
    } else {
      return url + '?' + paramsStrLIst.join('&') + hash
    }
  },

  // 生成随机数
  createRandomNum () {
    let randomNum = Math.round(Math.random() * 99999)
    return (+new Date()) + '' + randomNum
  },
  
  /**
   * 获取时间戳距离今天还有多少天
   * （不按具体的24小时一天算，按天差算。如现在22点，距离时间戳还有3小时，但依然按1天距离算）
   **/

  getSurplusDays (endTime) {
    if (!parseInt(endTime)) console.error('endTime时间戳参数有误')
    endTime = parseInt(endTime)
    nowDate = new Date()
    const result = {}
    const dayMillisecond = 1000 * 60 * 60 * 24
    let timeGap = endTime - +nowDate
    let isPast = false
    let dayGap

    // 时间戳已过去
    if (timeGap < 0) {
      isPast = true
      timeGap = String(timeGap).replace('-', '') * 1
    }

    dayGap = timeGap / dayMillisecond
    
    // 天数间隙是否为整数
    if (dayGap % 1 === 0) {
      result.days = dayGap
    } else {
      let decimal = String(dayGap).replace(/^\d+\./, '0.') * 1
      let todayGap
      if (isPast) {
        todayGap = +nowDate - +new Date(nowDate.toDateString() + ' 00:00:00')
      } else {
        todayGap = +new Date(nowDate.toDateString() + ' 23:59:59') - +nowDate
      }
      todayGap = todayGap / dayMillisecond
      result.days = decimal - todayGap <= 0 ? Math.floor(dayGap) : Math.ceil(dayGap)
    }

    result.type = isPast ? 'past' : 'future'
    return result
  }
  
}
