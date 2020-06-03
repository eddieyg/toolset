/**
 * JSON文件增删改查方法
 */
const fs = require('fs')
const path = require('path')

const resolve = dir => path.join(__dirname, dir)
const baseTypeOf = (d) => {
  return Object.prototype.toString.call(d).slice(8, -1).toLocaleLowerCase()
}
/* 
  时间格式化
  参数：time ->number类型的时间戳
       type->string类型：
       {
         'y-m-d h:m:s':'2018-8-20 11:43:25',
         'y-m-d h:m'  :'2018-8-20 11:43',
         'y-m-d'      :'2018-8-20',
         'y/m/d h:m:s':'2018/8/20 11:43:25',
         'y/m/d h:m'  :'2018/8/20 11:43',
         'y/m/d'      :'2018/8/20',
       }
*/
const formatTime = (time, type) => {
  if (time === '' || time === null || time === undefined) {
    console.error("params is 'empty' or 'null' or 'undefined' ,time：" + time)
    return time
  }
  if (isNaN(time)) {
    console.error('Parameter data type error：' + JSON.stringify(arr))
    return false
  }
  if (typeof time === 'string') {
    time = Number(time)
  }
  let sign = ''
  if (type) {
    sign = type && type.indexOf('/') > -1 ? '/' : '-'
    type = type.split(' ')
  } else {
    sign = '-'
    type = []
  }
  let date = new Date(time),
    y = date.getFullYear(),
    m =
      date.getMonth() + 1 < 10
        ? '0' + (parseInt(date.getMonth()) + 1)
        : date.getMonth() + 1,
    d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    minutes =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  if (type.length == 2) {
    let hms = type[1].split(':')
    if (hms.length == 1) {
      return y + sign + m + sign + d + ' ' + h
    } else if (hms.length == 2) {
      return y + sign + m + sign + d + ' ' + h + ':' + minutes
    } else {
      return y + sign + m + sign + d + ' ' + h + ':' + minutes + ':' + s
    }
  } else {
    return y + sign + m + sign + d
  }
}
const createRandomNum = (min, max) => {
  return Math.floor(Math.random() * max) + min
}

const readJson = (_path, initData = {}) => {
  if (typeof _path !== 'string') return
  _path = resolve(_path)
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

const updateJson = (_path, data = {}) => {
  let jsonData = readJson(_path + '.json')
  for (let k in data) {
    jsonData[k] = Object.assign({}, (jsonData[k] || {}), data[k])
  }
  fs.writeFileSync(resolve(_path + '.json'), JSON.stringify(jsonData))
}

const queryJson = (_path, param = {}) => {
  let jsonData = readJson(_path + '.json')
  let res = null
  if (param.id) {
    res = jsonData[param] || {}
  } else {
    res = []
    for (let k in jsonData) {
      if (jsonData[k]) {
        let mismatch = Object.keys(param).some(e => {
          console.log(jsonData[k][e], param[e])
          return jsonData[k][e] != param[e]
        })
        if (!mismatch) res.push(jsonData[k])
      }
    }
  }
  return res
}
let id = +new Date()
updateJson('../../dist/print', {[id+'_' + createRandomNum(10000, 99999)]: {id, date: formatTime(new Date(), 'y-m-d h:m:s')}})

console.log(readJson('../../dist/print-type.json'))
// console.log(fs.existsSync(resolve('../../dist/aaa/ccc/as')))
// fs.mkdirSync(resolve('../../dist/aaa/ccc'), { recursive: true })

