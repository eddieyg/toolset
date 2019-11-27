/**
 * 简化版 AJAX 请求封装
 */

const ajax = ({
  type = 'GET',
  url,
  success,
  error,
}) => {
  let Req
  if (window.XMLHttpRequest) {
    Req = new XMLHttpRequest()
  } else {
    Req = new ActiveXObject('Microsoft.XMLHTTP')
  }

  Req.onreadystatechange = () => {
    if (Req.readyState === 4) {
      if (Req.status === 200) {
        success && success(Req.responseText)
      } else {
        error && error(Req.status)
      }
    }
  }

  Req.open(type, url)
  Req.send()
}
