const api = require('./api')
// 引入数据库文件
const db = require('./db')
// 引入node的path模块和fs模块
const fs = require('fs') 
const path = require('path')
// 使用express（node的web框架）
const express = require('express')
const app = express()
// socket.io集成 (或挂载) 到 Node.JS HTTP 服务器
const server=require('http').Server(app)
const io = require('socket.io')(server)
//socket要实现的具体逻辑
const socketHandler = require('./socket.js')
io.on('connection', socket => {
  const socketid = socket.id
  socket.on('login',username=>{
    //登录时建立一个username到socketId的映射表
socketHandler.saveUserSocketId(username,socketid)      
  })
socket.on('chat',data=>{
    db.Idtoid.findOne({
      username:data.to_user
    }).then(res=>{
//根据用户名在映射表中找到对应的socketId
      io.to().emit('sendMsg',{
        from_user:data.from_user,
        message:data.message,
        time:data.time,
        _id: data._id
      })
    })
  })
  // socket.emit('news', { hello: 'world' })
  // socket.on('my other event', data => {
  //   console.log(data)
  // })
})
// 引入解析post请求的模块
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// 当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({ extended: false }))
// const cors = require('cors')
// app.use(cors({ origin: 'http://localhost:8083' }))
// path.resolve（） 解析路径 将静态文件目录设置为：项目根目录+/dist
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 同步操作(+Sync)，没有callback，直接得到数据
// 因为是单页应用 所有请求都走/dist/index.
// api为代理的服务
app.use(api)
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
// 允许跨域访问  也可以通过npm cors进行设置=
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
server.listen(3000)
console.log('success listen…………')
