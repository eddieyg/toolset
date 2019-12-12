
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
  }
}
