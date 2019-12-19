
const objToString = obj => {
  let strRes = ''
  for (let key in obj) {
    strRes += `${key}=${obj[key]}&`
  }
  return !strRes ? strRes : strRes.slice(0, strRes.length - 1)
}

/**
  * 轻量简化版 AJAX 请求封装
  * Lightweight simplified Ajax request encapsulation
  * @param { type, url, data, headers, sync, timeout, success, error }
  */
export default ({
  type = 'GET',
  url,
  data = {},
  headers = {},
  sync = true,
  timeout = 5000,
  success,
  error,
}) => {
  let Req, handleData, ContentType = ''
  type = type.toLocaleLowerCase()

  if (window.XMLHttpRequest) {
    Req = new XMLHttpRequest()
  } else {
    Req = new ActiveXObject('Microsoft.XMLHTTP')
  }

  Req.onload = () => {
    if (Req.status >= 200 && Req.status <= 300) {
      let resData,
        resType = Req.getResponseHeader('Content-type')
      if (resType.indexOf('xml') !== -1 && Req.responseXML) {
        resData = Req.responseXML
      } else if (resType.indexOf('application/json') !== -1) {
        resData = JSON.parse(Req.responseText)
      } else {
        resData = Req.responseText
      }
      success && success(resData)
    } else {
      error && error({
        type: 'response',
        status: Req.status,
        statusText: Req.statusText
      })
    }
  }
  Req.ontimeout = () => {
    error && error({
      type: 'timeout'
    })
  }

  // get请求处理url参数
  if (type === 'GET' && data) {
    let m = url.indexOf('?') === -1 ? '?' : '&'
    url += m + objToString(data)
  }

  Req.open(type, url, sync)

  // post请求设置默认content-type
  if (type === 'POST') {
    Req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    if (!ContentType) ContentType = 'application/x-www-form-urlencoded'
  }
  for (let key in headers) {
    Req.setRequestHeader(key, headers[key])
    if (/(content-type)/i.test(key)) ContentType = headers[key]
  }

  // 处理data数据格式
  if (ContentType.indexOf('application/x-www-form-urlencoded') !== -1) {
    handleData = objToString(data)
  } else if (ContentType.indexOf('application/json') !== -1) {
    handleData = JSON.stringify(data)
  } else if (type === 'GET' || type === 'HEAD') {
    handleData = null
  } else {
    handleData = data
  }

  Req.timeout = timeout
  Req.send(handleData)
}
