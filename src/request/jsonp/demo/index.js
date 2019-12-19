import jsonp from '../index'

jsonp(
  'http://rest.apizza.net/mock/bddccdad2768a4343e7830a52dee1153/test',
  { query01: 'test' }
).then(res => {
  console.log(res)
})
