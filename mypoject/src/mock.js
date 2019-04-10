// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象 用于生成各种随机数据
const Random = Mock.Random
// mock一组数据
const JobData = () => {
  let jobdataList = []
  for (let i = 0; i < 6; i++) {
    let jobdata = {
      jobImg: Random.dataImage('56x56', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      jobTitle: Random.cword('零一二三四五六七八九十', 6, 8), //  Random.csentence( min, max )
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
// mock一组公司数据
const CompanyData = () => {
  let companyList = []
  for (let i = 0; i < 6; i++) {
    let companydata = {
      companyImg: Random.dataImage('56x56', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      companyTitle: Random.cword('零一二三四五六七八九十', 6, 8), //  Random.csentence( min, max )
      cityName: Random.city(),
      companyJob: Random.cword(3,5),
      companyContent: Random.csentence(10, 30),
      companyPic: Random.dataImage('80x80', '公司的图片'),
      companyFullname: Random.cword('零一二三四五六七八九十', 8, 10),
      companyPerson:Random.cname(),
      companyTime:Random.date(),
      companyMoney:Random.cword(4,6)
    }
    companyList.push(companydata)
  }
  return {
    companyList: companyList
  }
}

const NewsData = Mock.mock({
  'newslist|2':
    [
      '面试官问:如何证明你的学习能力',
      '猎头顾问向您推荐了1个职位',
      '投了100份简历，为什么还没有面试'
      // '简历有6个月的空白期怎么应付',
      // '求职高峰期巨献，实力名企播报',
      // '注意:前方有坑，别跳下去'
    ]
})

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
Mock.mock('/api/index/job', 'get', JobData)
Mock.mock('/api/index/news', 'get', NewsData)
Mock.mock('/api/company/list', 'get', CompanyData)
