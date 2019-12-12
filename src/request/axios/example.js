/**
 *  Axios请求实例
 */

import Axios from './index'
import QS from 'qs'

// 原始配置的请求实例
const originalHttp = new Axios({
  timeout: 5000
}).init()

// demo的请求实例
const demoHttp = new Axios({
  baseURL: 'http://api.example.com',
  timeout: 100000
}, {
  req: config => {
    // 在发送请求之前做些什么
    if (/put|post|patch/.test(config.method)) {
      config.data = QS.stringify(config.data)
    }
    return config
  },
  reqErr: err => {
    // 对请求错误做些什么
    return Promise.reject(err)
  },
  res: res => {
    // 在响应拦截之前做些什么
    return res
  },
  resErr: err => {
    // 在响应错误拦截之前做些什么
    return Promise.reject(err)
  }
}).init()

export const originalDemo = p => originalHttp('get', '/demo/get', p)
export const postDemo = p => demoHttp('post', '/demo/post', p)
