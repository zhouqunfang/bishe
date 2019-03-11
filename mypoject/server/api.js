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
  db.User.find({username: username}, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    // 判断用户名是否已存在
    if (data.length > 0) {
      res.send({'status': 0, 'msg': '用户名已存在'})
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
            res.send({'status': 1, 'msg': '注册成功'})
          }
        })
      } else {
        res.send({'status': 2, 'msg': '密码不能为空'})
      }
    }
  })
})

// 登陆
router.post('/api/user/sign', (req, res) => {
  let inputpassword = req.body.password
  let username = req.body.username
  db.User.find({username: username, password: inputpassword}, (err, docs) => {
    if (err) {
      res.send(err)
      return
    }
    if (docs.length === 0) {
      res.send({'status': 0, 'msg': '用户名不存在'})
    } else if (docs.length > 0) {
      let password = docs[0].password
      if (inputpassword !== password) {
        res.send({'status': 1, 'msg': '密码错误'})
      } else {
        let content = {username: username}// 生成token的主题信息
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
        res.send({'status': 2, msg: '登录成功', 'token': docs[0].token, 'username': username})// //返回给前台
        // })
      }
    }
  })
})

module.exports = router
