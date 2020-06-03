/**
 * JSON文件增删改查方法
 */

import fs from 'fs'
import pub from './public'

/**
 * 读取JSON文件数据
 * @param {*} _path 
 * @param {*} initData 
 */
export const readJson = (_path, initData = {}) => {
  if (typeof _path !== 'string') return
  if (!/\.json$/.test(_path)) {
    _path = _path + '.json'
  }
  let data
  if (!fs.existsSync(_path)) {
    fs.writeFileSync(_path, JSON.stringify(initData))
    data = JSON.parse(JSON.stringify(initData))
  } else {
    data = JSON.parse(
      fs.readFileSync(_path).toString()
    )
  }
  return data
}

/**
 * 添加或覆盖JSON文件数据
 * @param {*} _path 
 * @param {*} data 
 */
export const updateJson = (_path, data = {}) => {
  if (!/\.json$/.test(_path)) {
    _path = _path + '.json'
  }
  let jsonData = readJson(_path)
  for (let k in data) {
    jsonData[k] = Object.assign({}, (jsonData[k] || {}), data[k])
  }
  fs.writeFileSync(_path, JSON.stringify(jsonData))
}

/**
 * 查询JSON文件数据
 * @param {*} _path 
 * @param {*} param 
 * @param {*} option 
 */
export const queryJson = (_path, param = {}, option = {}) => {
  if (!/\.json$/.test(_path)) {
    _path = _path + '.json'
  }
  let jsonData = readJson(_path)
  let res = null
  if (param.id) {
    res = jsonData[param] || {}
  } else if (option.classifyType) {
    res = {}
    option.classifyType.forEach(e => res[e] = [])
    param.type && (delete param.type)
    for (let k in jsonData) {
      if (jsonData[k]) {
        let mismatch = Object.keys(param).some(e => {
          return jsonData[k][e] != param[e]
        })
        if (!mismatch) res[jsonData[k].type].push(jsonData[k])
      }
    }
  } else {
    res = []
    for (let k in jsonData) {
      if (jsonData[k]) {
        let mismatch = Object.keys(param).some(e => {
          return jsonData[k][e] != param[e]
        })
        if (!mismatch) res.push(jsonData[k])
      }
    }
  }
  return res
}