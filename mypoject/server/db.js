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
const userSchema = new mongoose.Schema({
  username: String,
  password: String
})
// 通过Schema来创建Model
// Model代表的是数据库中的集合，通过Model才能对数据库进行操作
// mongoose.model(modelName,schema) (集合名，Schema)
// modelName 就是要映射的集合名，mongoose会自动将集合名变成复数
const Models = {
  User: mongoose.model('User', userSchema)
}

module.exports = Models
