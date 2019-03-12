// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象 用于生成各种随机数据
const Random = Mock.Random
// mock一组数据
const produceNewsData = () => {
  let jobdataList = []
  for (let i = 0; i < 8; i++) {
    let jobdata = {
      jobImg: Random.dataImage('56x56', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      jobTitle: Random.ctitle(2, 8), //  Random.csentence( min, max )
      jobCompany: Random.cword(2, 15), // Random.cname() 随机生成一个常见的中文姓名
      jobSalary: Random.float(0, 1, 1, 1) + '-' + Random.float(1.1, 3, 1, 1) + '万/月', // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      cityName: Random.city()
    }
    jobdataList.push(jobdata)
  }
  return {
    jobdataList: jobdataList
  }
}
// const jobdataList = Mock.mock({
//   'object|2': {
//     '310000': '上海市',
//     '320000': '江苏省',
//     '330000': '浙江省',
//     '340000': '安徽省'
//   },
//   jobImg: Random.image('56x56')

// })

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/index/job', 'get', produceNewsData)
// Mock.mock('/api/index/job', 'get', jobdataList)
