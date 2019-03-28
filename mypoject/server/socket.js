let db = require('./db')
// Class 的静态方法Class 的静态方法
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
module.exports = class socketHandler {
    static async saveUserSocketId(username, socketid) {
        //保存用户的id和socketid
        await db.Idtoid.findOne({
            username: username
        }).then((rs) => {
            if (!rs) {
                let newIdtoid = new db.Idtoid({
                    username: username,
                    socketid: socketid
                })
                newIdtoid.save().then(() => {
                })
            } else {
                db.Idtoid.update({
                    username: username
                }, {
                    socketid: socketid
                }).then(() => {
                })
            }
        })
    }
};