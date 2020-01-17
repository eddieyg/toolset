/*
 * @Description: 
 * @Author: eddie
 * @Date: 2020-01-17 11:26:32
 */
import { objStringify, strParse } from '@/utils/str'
const o = {
  aa: 0,
  bb: '234/asdasf/gd',
  cc: ['a', 242],
  ee: '司法所',
  dd: {
    dds: 45645,
    dda: 'ads',
  },
  ff: ''
}

let o1 = objStringify(o)
let o2 = objStringify(o, { encode: true })

console.log(o1)
console.log(strParse(o1))
console.log(o2)
console.log(strParse(o2))
console.log(strParse(o2, { noDecode: true }))
console.log(strParse(location.search, { noDecode: true }))