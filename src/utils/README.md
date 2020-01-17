# 工具函数
以下为日常工具函数封装的集合


## 比较零散的封装 - index.js
```
  import { belongType, ... } from 'utils/index';
```

### 生成随机数 createRandomNum
`@description: 生成随机数`  
`@param {number} min 最小值`  
`@param {number} max 最大值`  
`@return {number} 随机数`
```
createRandomNum(1, 10)      // 8
```

### 获取数据归属类型 belongType
`@description: 获取数据归属类型`  
`@param {*} 需要判断类型的任何值`  
`@return {string} 值的类型（全小写）`
```
belongType([])      // 'array'
```