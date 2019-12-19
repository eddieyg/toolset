import utils from 'src/utils/index'

/**
  * jsonp方法
  * @param {String} url [请求的url地址]
  * @param {Object} options [请求时携带的参数]
  */
export default (url, options = {}) => {
  if (!url) {
    console.error('JSONP 至少需要一个url参数!')
    return
  }

  return new Promise((resolve, reject) => {
    const jsonpId = utils.createRandomNum()
    let params = { callback: 'jsonpCB' + jsonpId }
    params = Object.assign(params, options)

    window[params.callback] = (result) => {
      resolve(result)
    }
    var JSONP = document.createElement('script')
    JSONP.type = 'text/javascript'
    JSONP.src = utils.setRequest(url, params)
    document.getElementsByTagName('head')[0].appendChild(JSONP)
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP)
    }, 500)
  })
}
