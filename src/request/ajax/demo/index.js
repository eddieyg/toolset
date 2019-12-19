import ajax from '../index'

ajax({
  type: 'POST',
  url: 'http://rest.apizza.net/mock/bddccdad2768a4343e7830a52dee1153/test',
  data: {
    p1: 123456,
    p2: 'abcdef'
  },
  headers: {
    'Content-Type': 'application/json'
  },
  success(res) {
    console.log(res)
  },
  error(err) {
    console.log(err)
  }
})

ajax({
  type: 'GET',
  url: '/mock/bddccdad2768a4343e7830a52dee1153/userinfo',
  data: {
    p1: 123456,
    p2: 'abcdef'
  },
  success(res) {
    console.log(res)
  },
  error(err) {
    console.log(err)
  }
})
