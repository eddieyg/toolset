/**
 *  Axios可配置多实例封装
 */

import Axios from 'axios'

/**
 *  new AxiosBase(
 *    { baseURL, ...},                Axios实例config配置
 *    { req, reqErr, res, resErr }    请求、响应拦截器函数
 *  ).init()                          初始化返回配置后的实例
 */
export default class AxiosBase {
  constructor (options = {}, interceptors = {}) {
    this.options = options
    this.interceptors = interceptors
    this.instance = null
    this.defaultConfig = {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'json',
    }
    this.createInstance()
    this.addInterceptor()
  }

  // 初始化
  init () {
    const that = this
    return (
      method = 'get',
      url,
      params = {},
      options = {}
    ) => {
      return new Promise((resolve, reject) => {
        if (!url) reject(new Error('not request url'))
        Object.assign(options, { url, method })
        if (/put|post|patch/.test(method)) {
          options.data = params
        } else {
          options.params = params
        }
        that.instance.request(options).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

  // 创建实例
  createInstance () {
    this.instance = Axios.create(Object.assign(this.defaultConfig, this.options))
  }

  // 添加拦截器
  addInterceptor () {
    const defaultFn = res => res
    const defaultFnErr = err => Promise.reject(err)
    if (this.interceptors.req || this.interceptors.reqErr) {
      this.instance.interceptors.request.use(
        (this.interceptors.req || defaultFn),
        (this.interceptors.reqErr || defaultFnErr)
      )
    }
    if (this.interceptors.res || this.interceptors.resErr) {
      this.instance.interceptors.response.use(
        (this.interceptors.res || defaultFn),
        (this.interceptors.resErr || defaultFnErr)
      )
    }
  }
}
