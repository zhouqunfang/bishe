'use strict'
// 引入数据库文件
const db = require('./db')
const express = require('express')
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
          password: password
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
  db.User.find({ username: username, password: inputpassword }, (err, docs) => {
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
        db.Userinfo.find({ username: username }, (err, data) => {
          if (data.length == 0) {
            let setUser = new db.Userinfo({
              username: username,
              iscompany: false
            })
            setUser.save((err, docs) => {
              if (err) {
                res.send(err)
                return
              }
            })
          }
        })
        res.send({ 'status': 2, msg: '登录成功', 'token': docs[0].token, 'username': username })// //返回给前台
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
  let newDatabase = new db.Jobinfor({
    city: city ,
    salary: salary,
    job: job,
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
  let updateStr = {
    $set: {
      "city": city ,
      "salary": salary,
      "job": job
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
  let content = req.body.content
  let newDatabase = new db.Experience({
    username: username,
    company: company,
    job: job,
    time: time,
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
  let content = req.body.content
  let updateStr = {
    $set: {
      "company":company,
      "job": job,
      "time": time,
      "content": content   
    }
  }
  db.Experience.updateOne(whereStr, updateStr, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      console.log(423423)
      console.log(data)
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
  let newDatabase = new db.Poject({
    username: username,
    pojectname: pojectname,
    role: role,
    detail: detail,
    time: time
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
  let updateStr = {
    $set: {
      "pojectname": pojectname,
      "role ": role,
      "detail": detail,
      "time": time
    }
  }
  db.Poject.updateOne(whereStr, updateStr, (err, data) => {
    if (err) {
      res.send(err)
      return
    } else {
      console.log(423423)
      console.log(data)
      res.send({ "code": "0", "msg": "更新成功" })
    }
  })
})
module.exports = router
