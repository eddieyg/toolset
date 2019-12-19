/**
 *  Axios请求实例
 */

import Axios from '../index'
import QS from 'qs'

// 原始配置的请求实例
const originalHttp = new Axios({
  timeout: 5000
}).init()

// demo的请求实例
const demoHttp = new Axios({
  baseURL: 'http://rest.apizza.net',
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

// 声明接口
const originalDemo = p => originalHttp('get', 'http://rest.apizza.net/mock/bddccdad2768a4343e7830a52dee1153/getStatus', p)
const postDemo = p => demoHttp('post', '/mock/bddccdad2768a4343e7830a52dee1153/getList', p)

// 使用接口
originalDemo({
  o1: '123'
}).then(res => {
  console.log(res)
})
postDemo({
  p1: [12, 233, 33]
}).then(res => {
  console.log(res)
})