'use strict'
// 引入数据库文件
const db = require('./db')
const express = require('express')
var multer = require("multer");
// 设置图片存储路径
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../static/image');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
// 添加配置文件到muler对象。
var upload = multer({ storage: storage });
// 引入解析post请求的模块
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
app.use(bodyParser.json())
// 当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({ extended: false }))
// express的router是属于后端的，Vue的router是属于前端的
// 验证 要理解
const jwt = require('jsonwebtoken')
// 注册
router.post('/api/user/register', (req, res) => {
  let password = req.body.password
  let username = req.body.username
  let role = req.body.role
  console.log(role ,11)
  db.User.find({ username: username }, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    // 判断用户名是否已存在
    if (data.length > 0) {
      res.send({ 'status': 0, 'msg': '用户名已存在' })
    } else if (data.length === 0) {
      if (password) {
        let newUser = new db.User({
          username: username,
          password: password,
          role: role
        })
        newUser.save((err, data) => {
          if (err) {
            res.send(err)
          } else {
            res.send({ 'status': 1, 'msg': '注册成功' })
          }
        })
      } else {
        res.send({ 'status': 2, 'msg': '密码不能为空' })
      }
    }
  })
})

// 登陆
router.post('/api/user/sign', (req, res) => {
  let inputpassword = req.body.password
  let username = req.body.username
  db.User.find({ username: username}, (err, docs) => {
    if (err) {
      res.send(err)
      return
    }
    if (docs.length === 0) {
      res.send({ 'status': 0, 'msg': '用户名不存在' })
    } else if (docs.length > 0) {
      let password = docs[0].password
      if (inputpassword !== password) {
        res.send({ 'status': 1, 'msg': '密码错误' })
      } else {
        let content = { username: username }// 生成token的主题信息
        let secretOrPrivateKey = '123456'// 这是加密的key（密钥）
        let token = jwt.sign(content, secretOrPrivateKey, {
          expiresIn: 60 * 60 * 1 // 1小时过期
        })
        docs[0].token = token
        // token写入数据库
        // db.User(docs[0]).save(function (err) {
        //   if (err) {
        //     res.status(500).send()
        //     return
        //   }
        //添加信息到Userinfo表
        // db.Userinfo.find({ username: username }, (err, data) => {
        //   if (data.length == 0) {
        //     let setUser = new db.Userinfo({
        //       username: username,
        //       iscompany: false
        //     })
        //     setUser.save((err, docs) => {
        //       if (err) {
        //         res.send(err)
        //         return
        //       }
        //     })
        //   }
        // })
        res.send({ 'status': 2, msg: '登录成功', 'token': docs[0].token, 'username': username,'role':docs[0].role })// //返回给前台
      }
    }
  })
})

//获取用户信息
router.post('/api/chat/userInfo', (req, res) => {
  let username = req.body.username
  if (username) {
    db.Userinfo.find({ username: username }, (err, data) => {
      if (err) {
        res.send(err)
        return
      }
      res.send({
        'code': 0, 'docs': '获取成功', 'userinfo': data
      })
    })
  }
})



// 聊天对象信息 
router.post('/api/chat/touserInfo', (req, res) => {
  let tousername = req.body.username
  db.User.find(
    { username: tousername }, (err, docs) => {
      if (err) {
        res.send(err)
        return
      } else {
        console.log('聊天对象' + docs)
        res.send(docs)

      }
    }
  )
})
//聊天信息发送
//populate 连表查询
router.post('/api/chat/chatwith', (req, res) => {
  let chatWith = req.body.chatWithId;
  let user_id = req.body.user_id;
  let content = req.body.content;
  if (chatWith == user_id) {
    let newChatcontent = new db.Chatcontent(
      {
        chatWith: chatWith,
        user_id: user_id,
        content: content,
      })
    newChatcontent.save().then((newContent) => {
      db.Chatrelation.findOne({
        $or: [{
          userA: user_id,
          userB: chatWith
        }, {
          userB: user_id,
          userA: chatWith
        }]
      }).then((rs) => {
        if (rs) {
          let Chatcontent = rs.Chatcontent;
          // Chatcontent.unshift(newContent._id);
          db.Chatrelation.update({
            _id: rs.id
          }, {
              Chatcontent: Chatcontent
            }).then(() => {
              res.send({
                code: 0,
                data: newContent
              })
            })
        } else {
          let Chatrelation = new db.Chatrelation({
            userA: user_id,
            userB: chatWith,
            chatcontent: [{ newContent }]
          })
          Chatrelation.save().then(() => {
            res.send({
              code: 0,
              data: newContent
            })
          })
        }
      })
    })
  }
  let Chatcontent = new db.Chatcontent({
    chatWith: chatWith,
    user_id: user_id,
    content: content
  })
  Chatcontent.save().then((newContent) => {
    db.Chatrelation.findOne({
      $or: [{
        userA: user_id,
        userB: chatWith
      }, {
        userB: user_id,
        userA: chatWith
      }]
    }).then((rs) => {
      if (rs) {
        let Chatcontent = rs.Chatcontent;
        // Chatcontent.unshift(newContent._id);
        db.Chatrelation.update({
          _id: rs.id
        }, {
            Chatcontent: Chatcontent
          }).then(() => {
            // res.send({
            //   code: 0,
            //   data: newContent
            // })
          })
      } else {
        let Chatrelation = new db.Chatrelation({
          userA: user_id,
          userB: chatWith,
          Chatcontent: [newContent._id]
        })
        Chatrelation.save().then(() => {
          res.send({
            code: 0,
            data: newContent
          })
        })
      }
    })
  })
});
//增加简历个人信息
router.post('/api/resume/baseinfor', (req, res) => {
  let username = req.body.username
  let name = req.body.name
  let sex = req.body.sex
  let birth = req.body.birth
  let phone = req.body.phone
  let school = req.body.school
  let major = req.body.major
  let newDatabase = new db.Baseinfor({
    name: name,
    sex: sex,
    birth: birth,
    phone: phone,
    school: school,
    major: major,
    username: username
  })
  newDatabase.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send({ 'code': 0, msg: '保存成功' })
    }
  })
})
//获取基本信息
router.post('/api/my/baseinfor', (req, res) => {
  let username = req.body.username
  db.Baseinfor.find({ username: username }, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else if (data.length > 0) {
      res.send({ "code": "0", "msg": "保存成功", "data": data[0] })
    } else {
      res.send({ "code": "1" })
    }
  })
})
//更新简历基本信息
router.post('/api/my/updatebase', (req, res) => {
  let username = req.body.username
  let whereStr = { username: username }
  let name = req.body.name
  let sex = req.body.sex
  let birth = req.body.birth
  let phone = req.body.phone
  let school = req.body.school
  let major = req.body.major
  let updateStr = {
    $set: {
      "name": name,
      "sex": sex,
      "birth": birth,
      "phone": phone,
      "school": school,
      "major": major
    }
  }
  db.Baseinfor.updateOne(whereStr, updateStr, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "更新成功" })
    }
  })
})
//增加简历求职意向
router.post('/api/resume/jobinfor', (req, res) => {
  let username = req.body.username
  let city = req.body.city
  let salary = req.body.salary
  let job = req.body.job
  let jobaim = req.body.jobaim
  let newDatabase = new db.Jobinfor({
    city: city ,
    salary: salary,
    job: job,
    jobaim: jobaim,
    username: username
  })
  newDatabase.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send({ 'code': 0, msg: '保存成功' })
    }
  })
})
//获取求职意向信息
router.post('/api/my/jobinfor', (req, res) => {
  let username = req.body.username
  db.Jobinfor.find({ username: username }, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else if (data.length > 0) {
      res.send({ "code": "0", "msg": "编辑成功", "data": data[0] })
    } else {
      res.send({ "code": "1" ,"msg": "保存成功", "data": data[0]})
    }
  })
})
//更新求职意向信息
router.post('/api/my/updatejobinfor', (req, res) => {
  let username = req.body.username
  console.log(username)
  let whereStr = { username: username }
  let city = req.body.city
  let salary = req.body.salary
  let job = req.body.job
  let jobaim = req.body.jobaim
  let updateStr = {
    $set: {
      "city": city ,
      "salary": salary,
      "job": job,
      "jobaim": jobaim
    }
  }
  db.Jobinfor.updateOne(whereStr, updateStr, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      console.log(data)
      res.send({ "code": "0", "msg": "更新成功" })
    }
  })
})
//增加工作经验
router.post('/api/resume/experience', (req, res) => {
  let username = req.body.username
  let company = req.body.company
  let job = req.body.job
  let time = req.body.time
  let timeout = req.body.timeout
  let content = req.body.content
  let newDatabase = new db.Experience({
    username: username,
    company: company,
    job: job,
    time: time,
    timeout: timeout,
    content: content
  })
  newDatabase.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send({ 'code': 0, msg: '保存成功' })
    }
  })
})
//获取工作经验信息
router.post('/api/my/experience', (req, res) => {
  let username = req.body.username
  db.Experience.find({ username: username }, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else if (data.length > 0) {
      res.send({ "code": "0", "msg": "编辑成功", "data": data[0] })
    } else {
      res.send({ "code": "1", "msg": "保存成功", "data": data[0] })
    }
  })
})
//更新工作经验信息
router.post('/api/my/updateexperience', (req, res) => {
  let username = req.body.username
  let whereStr = { username: username }
  let company = req.body.company
  let job = req.body.job
  let time = req.body.time
  let timeout = req.body.timeout 
  let content = req.body.content
  let updateStr = {
    $set: {
      "company":company,
      "job": job,
      "time": time,
      "content": content,
      "timeout": timeout   
    }
  }
  db.Experience.updateOne(whereStr, updateStr, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "更新成功" })
    }
  })
})
//增加项目经验
router.post('/api/resume/poject', (req, res) => {
  let username = req.body.username
  let pojectname = req.body.pojectname
  let role = req.body.role
  let detail = req.body.detail
  let time = req.body.time
  let timeout = req.body.timeout 
  let newDatabase = new db.Poject({
    username: username,
    pojectname: pojectname,
    role: role,
    detail: detail,
    time: time,
    timeout:timeout
  })
  newDatabase.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send({ 'code': 0, msg: '保存成功' })
    }
  })
})
//获取项目经验信息
router.post('/api/my/poject', (req, res) => {
  let username = req.body.username
  db.Poject.find({ username: username }, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else if (data.length > 0) {
      res.send({ "code": "0", "msg": "编辑成功", "data": data[0] })
    } else {
      res.send({ "code": "1", "msg": "保存成功", "data": data[0] })
    }
  })
})
//更新工作经验信息
router.post('/api/my/updatepoject', (req, res) => {
  let username = req.body.username
  let whereStr = { username: username }
  let pojectname = req.body.pojectname
  let role = req.body.role
  let detail = req.body.detail
  let time = req.body.time
  let timeout = req.body.timeout
  let updateStr = {
    $set: {
      "pojectname": pojectname,
      "role ": role,
      "detail": detail,
      "time": time,
      "timeout":timeout
    }
  }
  db.Poject.updateOne(whereStr, updateStr, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "更新成功" })
    }
  })
})
//todo列表增加数据
router.post('/api/todo/addlist',(req,res)=>{
  let username = req.body.username  
  let content = req.body.content
  let time = req.body.time
  let id = req.body.id

  let newDatabase = new db.Todolist({
    username: username,
    content:content,
    time :time,
    id:id,
    completed: false
  })
  newDatabase.save((err,data)=>{
    if(err){
      res.send(err)
      return
    }else{
      res.send({ "code": "0", "msg": "添加成功" })
    }
  })
})
//获取todo列表
router.post('/api/todo/gettodolist',(req,res)=>{
  let username = req.body.username
  db.Todolist.find({ username: username },(err,data)=>{
    if (err) {
      res.send(err)
      return
    } else  {
      let datalength = data.length 
      res.send({ "code": "0", "msg": "获取成功", "data": data, "datalength": datalength})
    }     
  })
})
//删除todo数据 
router.post('/api/todo/deletetodolist',(req,res)=>{
  let id= req.body.id
  db.Todolist.deleteMany({ id: id}, (err,data)=>{
    if(err){
      res.send(err)
    }else{
      res.send({"code":"0","msg":"删除成功"})
    }
  });
})
//更新todo状态 
router.post('/api/todo/updatetodolist', (req, res) => {
  let completed = req.body.completed
  let content = req.body.content
  let updateStr = {
    $set: {
      "completed": completed
    }
  }
  db.Todolist.updateOne({ content: content }, updateStr,(err, data) => {
    if (err) {
      res.send(err)
    } else {
      console.log(data)
      res.send({ "code": "0", "msg": "更新成功"})
    }
  });/*  */
})
//首页获取职位数据
router.post('/api/index/getjob', (req, res) => {
  db.AddJob.find({}, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "获取成功", "data": data })
    }
  })
})
//获取职位详情
router.post('/api/index/jobdetail', (req, res) => {
  let id= req.body._id
  db.AddJob.find({ _id: id }, (err, data) => {
    if (err) {
      res.send(err)
      return
    }  else {
      res.send({ "code": "0", "msg": "获取成功", "data": data })
    }
  })
})
//公司数据获取
router.post('/api/company/list', (req, res) => {
  db.AddInfo.find({}, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "获取成功", "data": data })
    }
  })
})
//公司详情数据获取
router.post('/api/company/detail', (req, res) => {
  let companyTitle = req.body.companyTitle
  db.AddInfo.find({ companyTitle: companyTitle}, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "获取成功", "data": data })
    }
  })
})
//企业招聘
//首页模块
router.post('/api/first/resumeinfor', (req, res) => {
  db.Jobinfor.find({}, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "获取成功", "data": data })
    }
  })
})
//增加公司信息
router.post('/api/company/addinfor', (req, res) => {
  let newDatabase = new db.AddInfo({
    username: req.body.username,
    companyTitle: req.body.companyTitle,
    companyContent: req.body.companyContent,
    companyFullname: req.body.companyFullname,
    companyPerson: req.body.companyPerson,
    companyTime: req.body.companyTime,
    companyMoney: req.body.companyMoney,
  })
  newDatabase.save((err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "保存成功" })
    }
  })
})
//获取公司信息
router.post('/api/company/getinfor', (req, res) => {
  let username = req.body.username
  db.AddInfo.find({ username: username }, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else if (data.length > 0) {
      res.send({ "code": "0", "msg": "编辑成功", "data": data[0] })
    } else {
      res.send({ "code": "1", "msg": "保存成功", "data": data[0] })
    }
  })
})
//更新公司信息
router.post('/api/company/updateinfor', (req, res) => {
  let username = req.body.username
  let whereStr = { username: username }
  let companyTitle = req.body.companyTitle
  let companyContent = req.body.companyContent
  let companyFullname = req.body.companyFullname
  let companyPerson = req.body.companyPerson
  let companyTime = req.body.companyTime
  let companyMoney = req.body.companyMoney
  let companySrc = req.body.companySrc
  let updateStr = {
    $set: {
      "companyTitle": companyTitle,
      "companyContent": companyContent,
      "companyFullname": companyFullname,
      "companyPerson": companyPerson,
      "companyTime": companyTime,
      "companyMoney": companyMoney,
      "companySrc": companySrc
    }
  }
  db.AddInfo.updateOne(whereStr, updateStr, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "更新成功" })
    }
  })
})
//公司发布职位信息
router.post('/api/sendjob/addjob', (req, res) => {
  console.log(req.body.id)
  let newDatabase = new db.AddJob({
    username: req.body.username,
    cityName: req.body.cityName, 
    jobSalary: req.body.jobSalary,
    jobCompany: req.body.jobCompany,
    jobTitle: req.body.jobTitle,
    jobImg: req.body.jobImg,
    jobcontent: req.body.jobcontent,
    id:req.body.id
  })
  newDatabase.save((err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      res.send({ "code": "0", "msg": "保存成功" })
    }
  })
})
//获取公司发布职位信息
router.post('/api/sendjob/getjob', (req, res) => {
  let username = req.body.username
  db.AddJob.find({ username: username }, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else if (data.length > 0) {
      res.send({ "code": "0", "msg": "编辑成功", "data": data })
    } else {
      res.send({ "code": "1", "msg": "保存成功", "data": data})
    }
  })
})
//删除公司职位发布信息数据 
router.post('/api/sendjob/deletejob', (req, res) => {
  let _id = req.body._id
  db.AddJob.deleteMany({ _id: _id }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send({ "code": "0", "msg": "删除成功" })
    }
  });
})
//消息简历发送
router.post('/api/message/resume', (req, res) => {
  let username = req.body.username
  let jobCompany = req.body.jobCompany
  let newDatabase = new db.Resumemsg({
    username:username,
    jobCompany: jobCompany
  })
  newDatabase.save((err,data)=>{
    if(err){
      res.send(err)
    }else{
      res.send({
        "code": "0", "msg": "发送成功"
      })
    }
  })
})
//消息简历接收
router.post('/api/message/getresume', (req, res) => {
  let jobCompany = req.body.jobCompany
  db.Resumemsg.find({ jobCompany: jobCompany},(err,data)=>{
      if(err){
        return res.send(err)
      }else{
        res.send({'code':'0','data':data})
      }
      })
    }
  )
//消息简历删除
router.post('/api/message/deleteresume',(req,res)=>{
        let _id = req.body._id
    db.Resumemsg.deleteMany({ _id: _id }, (err, data) => {
          if (err) {
            res.send(err)
          } else {
            res.send({ "code": "0", "msg": "删除成功" })
          }
        })
      })
//公司消息发送
router.post('/api/message/company', (req, res) => {
  let personusername = req.body.personusername
  let jobCompany = req.body.jobCompany
  let companyTitle = req.body.companyTitle
  let newDatabase = new db.Companymsg({
    personusername: personusername,
    jobCompany: jobCompany,
    companyTitle: companyTitle
  })
  newDatabase.save((err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send({
        "code": "0", "msg": "发送成功"
      })
    }
  })
})
//个人消息接收
router.post('/api/message/getmessage', (req, res) => {
  let personusername = req.body.personusername
  db.Companymsg.find({ personusername: personusername }, (err, data) => {
    if (err) {
      return res.send(err)
    } else {
      res.send({ 'code': '0', 'data': data })
    }
  })
}
)
//个人消息删除
router.post('/api/message/deletemsg', (req, res) => {
  let _id = req.body._id
  db.Companymsg.deleteMany({ _id: _id }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send({ "code": "0", "msg": "删除成功" })
    }
  })
})
// 文件上传请求处理，upload.array 支持多文件上传，第二个参数是上传文件数目
router.post('/api/company/imglist', upload.array('myphoto', 2), function (req, res) {
  // 读取上传的图片信息
  var files = req.files;
  console.log(files,1111)
  // 设置返回结果
  var result = {};
  if (!files[0]) {
    result.code = 1;
    result.errMsg = '上传失败';
  } else {
    result.code = 0;
    result.data = {
      url: files[0].filename
    }
    result.errMsg = '上传成功';
  }
  res.send(result);
});

module.exports = router
