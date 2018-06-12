const express = require('express');
const router = express.Router();
const apiConstant = require('../../service/serviceNameList');
const service = require('../../service/service');
const paramUtil = require('../../public/src/utils/paramUtil');
// 导入模型
let users = require('../../schemas/login').users
let mongoose = require('mongoose')
mongoose.Promise = global.Promise;

/*调试模式是mongoose提供的一个非常实用的功能，用于查看mongoose模块对mongodb操作的日志，一般开发时会打开此功能，以便更好的了解和优化对mongodb的操作。*/
mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/test');
let db = mongoose.connection
db.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

db.on("open", function () {
    console.log("数据库连接成功");
});

router.post('/handleLogin',function (req, res, next){
    let params = paramUtil.getParams(req);
    console.log('params is -----')
    console.log(params)
    let parameters = {

    }
    let obj = new users({
        userName : "Cao13819977854",
        password : "cao499584483",
        id : "1527758656805",
        createDate : "1527758656805",
        updateDate : "",
        information : {
            name : "曹家骏",
            age : "22"
        }
    })
    // obj.save(function (err) {
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log('存入成功')
    //     }
    // })
    users.find({"userName":params.username,"password":params.password},function(err,docs){
        if(err){
            console.log('err is ------')
            console.log(err)
            return
        }else{
            if(docs.length>0){
                console.log('docs is ---------')
                console.log(docs)
                let userName = docs[0].userName;
                let age = docs[0].information.age;
                let name = docs[0].information.name;
                let baseName = new Buffer(userName)
                let token = baseName.toString('base64');
                let result = {
                    code:"0",
                    msg:"login successfully!",
                    data:{
                        userInfo:{
                            token:token,
                            age:age,
                            name:name,
                            userName:userName
                        }
                    }
                };
                res.status(200).send(result);
            }else{
                res.status(200).send({
                    code:"16001",
                    msg:"not found",
                    data:{}
                })
            }
        }
    })
    // return service.handleLogin(parameters).then((resp) => {
    //     if (resp.code=='0') {
    //         req.session.user = resp.data.user;
    //     }
    //     res.json(resp);
    // })
});

router.post('/changePassword',function (req, res, next) {
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    // return service.changePassword(parameters).then((resp) => {
    //     res.json(resp);
    // })
});

router.post('/register',function (req, res, next) {
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    let userName = params.username,
        password = params.password;
    console.log(params)
    users.find({"userName":userName},function (err,docs) {
        if(err){
            console.log(err)
            res.status(200).send({
                code: "16009",
                msg: "error in system",
                data: {}
            })
        }else{
            if(docs.length > 0) {
                res.status(200).send({
                    code: "16001",
                    msg: "username is repeat",
                    data: {}
                })
            }else{
                let user = {
                    userName: userName,
                    password:password,
                    createDate:Date.now(),
                    updateDate: '',
                    information:{
                        name: '',
                        age: ''
                    }
                }
                user.id = user.createDate
                users.create(user,function(err,docs) {
                    if(err){
                        console.log(err)
                        res.status(200).send({
                            code: "16009",
                            msg: "error in system",
                            data: {}
                        })
                    }else{
                        res.status(200).send({
                            code: "0",
                            msg: "register successfully",
                            data: {
                                userId: user.id
                            }
                        })
                    }
                })
            }
        }
    })
    // return service.register(parameters).then((resp) => {
    //     res.json(resp);
    // })
});
router.post('/forgetPassword',function (req, res, next) {
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    users.find({"id":params.userId},function(err,docs){
        if(err){
            console.log(err)
            res.status(200).send({
                code: "16001",
                msg: "id is not exist",
                data: {}
            })
        }else{
            if(docs.length > 0){
               users.update({"id":params.id},{password:params.password,updateDate:Date.now()},function(err){
                    if(err){
                        console.log(err);
                        res.status(200).send({
                            code: "16003",
                            msg: "update fail",
                            data: {}
                        })
                    }else{
                        res.status(200).send({
                            code: "0",
                            msg: "update successfully",
                            data: {}
                        })
                    }
               })
            } else {
                res.status(200).send({
                    code: "16001",
                    msg: "id is not exist",
                    data: {}
                })
            }
        }
    })
    // return service.forgetPassword(parameters).then((resp) => {
    //     res.json(resp);
    // })
});

module.exports = router;