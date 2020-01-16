/*
 * @Description: 工具函数
 * @Author: eddie
 * @Date: 2020-01-13 15:34:12
 */

// 设置url参数
export const setRequest = (url, params, type = {}) => {
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
export const createRandomNum = (min, max) => {
  return Math.floor(Math.random() * max) + min
},

  // 数据归属类型
export const belongType = d => {
  const type = Object.prototype.toString.call(d)
  return type.replace(/\[object\s|\]/g, '').toLocaleLowerCase()
}

