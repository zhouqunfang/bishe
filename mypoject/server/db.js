// Mongoose就是一个让我们可以通过Node来操作MongoDB的模块
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://localhost/job', { useNewUrlParser: true })
// 监听MongoDB数据库的连接状态
// 在mongoose对象中，有一个属性叫做connection，该对象表示的就是数据库连接
// 通过监视该对象的状态，可以来监听数据库的连接和断开
const db = mongoose.connection
db.once('open', function () {}) // 数据库连接成功事件
db.once('close', function () {}) // 数据库断开的事件
// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
/// / 创建Schema(模式)对象
// 登录注册
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: Number
})
// // 用户的socketid与用户名 映射表
// const idtoidSchema = new mongoose.Schema({
//   socketid: String,
//   username: String
// })
// 用户信息 
const userinfoSchema = new mongoose.Schema({
  username: String,
  iscompany:{
    type:Boolean,
    default:false
  }
})
// 聊天页面内容信息
// Schema.Type是由Mongoose内定的一些数据类型
// const chatcontentSchema = new mongoose.Schema({
//   //聊天发送用户id
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Userinfo'
//   },
//   //聊天接收用户名id
//   chatWith: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Userinfo'
//   },
//   //聊天时间
//   addTime: {
//     type: Date,
//     default: Date.now
//   },
//   //聊天内容
//   content: {
//     type: String
//   }
// })

// //聊天双方关系表
// const chatrelateSchema = new mongoose.Schema({
//   userA: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Userinfo'
//   },
//   userB: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Userinfo'
//   },
//   chatContent: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'ChatContent'
//   }],

// });
//简历模快个人信息
const baseinforSchema = new mongoose.Schema({
  username:String,
  name: String,
  sex: String,
  birth:String,
  phone:String,
  school:String,
  major:String,
})
//简历模快求职意向
const jobinforSchema = new mongoose.Schema({
  username: String,
  city: String,
  salary: String,
  job: String,
  jobaim:String
})
//简历模快工作经验
const experienceSchema = new mongoose.Schema({
  username: String,
  company: String,
  job: String,
  time: String,
  timeout:String,
  content:String
})
//简历模快项目经验
const pojectSchema = new mongoose.Schema({
  username: String,
  pojectname: String,
  role: String,
  detail: String,
  time: String,
  timeout:String
})
//todo页面
const todolistSchema = new mongoose.Schema({
  username:String,
  content:String,
  time:String,
  id:Number,
  completed:Boolean
})
//企业模块 
//公司信息
const addInfoSchema = new mongoose.Schema({
  username: String,
  companyTitle: String,
  companyContent: String,
  companyFullname: String,
  companyPerson: String,
  companyTime: String,
  companyMoney: String,
  companySrc: String
})
//企业职位发布
const addJobSchema = new mongoose.Schema({
  username: String,
  cityName: String,
  jobSalary: String,
  jobCompany: String,
  jobTitle: String,
  jobImg: String,
  jobcontent:String,
  id: Number
})
//企业消息简历库
const resumeMsgSchema = new mongoose.Schema({
  username: String,
  jobCompany:String
})
//个人消息
const companyMsgSchema = new mongoose.Schema({
  personusername: String,
  jobCompany: String,
  companyTitle: String
})
// 通过Schema来创建Model
// Model代表的是数据库中的集合，通过Model才能对数据库进行操作
// mongoose.model(modelName,schema) (集合名，Schema)
// modelName 就是要映射的集合名，mongoose会自动将集合名变成复数
const Models = {
  User: mongoose.model('User', userSchema),
  // Idtoid: mongoose.model('Idtoid', idtoidSchema),
  Userinfo: mongoose.model('Userinfo', userinfoSchema ),
  // Chatcontent: mongoose.model('Chatcontent', chatcontentSchema),
  // Chatrelation: mongoose.model('Chatrelation', chatrelateSchema),
  Baseinfor:mongoose.model('Baseinfor',baseinforSchema),
  Jobinfor: mongoose.model('Jobinfor', jobinforSchema),
  Experience: mongoose.model('Experience', experienceSchema),
  Poject: mongoose.model('Poject', pojectSchema),
  Todolist: mongoose.model('Todolist', todolistSchema),
  AddInfo: mongoose.model('AddInfo', addInfoSchema),
  AddJob: mongoose.model('AddJob', addJobSchema),
  Resumemsg: mongoose.model('Resumemsg', resumeMsgSchema),
  Companymsg: mongoose.model('Companymsg', companyMsgSchema)
}
module.exports = Models
