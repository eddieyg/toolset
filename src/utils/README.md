# 工具函数
以下为日常工具函数封装的集合

### 比较零散的封装 - index.js
```
  import { ... } from 'utils/index';
```
- **createRandomNum：** 生成指定范围的随机数
- **belongType：** 获取数据归属数据类型
- **deepClone：** 深拷贝对象或数组

### 日期工具函数 - date.js
```
  import { ... } from 'utils/date';
```
- **getIntervalDays：** 获取时间戳距离今天有多少天（不按具体的24小时一天算，按天差算。如现在22点，距离时间戳还有3小时，但依然按1天距离算）

### 字符串工具函数 - str.js
```
  import { ... } from 'utils/str';
```
- **objStringify：** 对象序列化为字符串参数（不支持多维对象） `{ a: 1, b: [] }  >>  'a=1&b="[]"'`
- **strParse：** 参数字符串解析为对象  `'a=1&b="[]"'  >>  { a: 1, b: [] }`
- **filterHTMLTags：** 过滤字符串的html标签和转义字符
- **trim：** 去除字符串左右两侧的空格
- **convertToHump：** `'-'`分隔字符串转为驼峰字符串   `get-some  >>  getSome`

### App webview内调用协议链接 - wvcall.js
```
  import wvcall from 'utils/wvcall';

  // 配置App协议列表
  wvcall.config({
    closewebview: 'example://closewebview',
    share: {
      url: 'example://share',
      params: {
        title: '标题',
      },
      callback: () => {},
    }
  }, 'appCallback')

  // 调用App协议链接
  wvcall.call('closewebview')
  let str = wvcall.call('share', {
    title: '新的标题',
    desc: '描述'
  }, res => {
    console.log(res)
  })

  console.log(str)
  // example://sharehhh/shareCB?title=%E6%96%B0%E7%9A%84%E6%A0%87%E9%A2%98&desc=%E6%8F%8F%E8%BF%B0
```

### REM自适应Font-Size设置 - rem.js
```
  import 'utils/rem';
```