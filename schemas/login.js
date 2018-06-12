let mongoose = require('mongoose')
let Schema = mongoose.Schema;

/*定义模式Student_Schema*/
let User_Schema = new Schema({
    userName: String,
    password: String,
    id: String,
    createDate:String,
    updateDate: String,
    information: {
        name:String,
        age:String
    }
}, {
    versionKey: false
});

/*定义模型User，注意数据库存的是students*/
let users = mongoose.model("User", User_Schema);
exports.users = users