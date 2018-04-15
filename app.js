let express = require('express');
let path = require('path');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config.dev.js');
let app = express();// 创建一个express实例
let compiler = webpack(webpackConfig);// 调用webpack并把配置传递过去
let session = require('express-session');
let router = express.Router();
let RedisStrore = require('connect-redis')(session);

app.all('/index',function (req,res,next) {
    if (req.session.user){
        console.log('req.session is exist!');
        next();
    }else {
        console.log('user is expired or no login --------');
        res.redirect('/login');
    }
});
// 使用 webpack-dev-middleware 中间件
let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    stats: {
        colors: true,
        chunks: false
    }});
let history = require('connect-history-api-fallback');
app.use(history());
app.use(require("webpack-hot-middleware")(compiler));
app.use(devMiddleware);

// session 中间件
app.use(session({
    secret: 'secret',  // 进行签名使用
    resave:true, // 强制会话保存
    saveUninitialized: true, // 强制未初始化的会话保存到存储
    cookie:{path:'/', httpOnly:true, secure: false, maxAge:1000*60*60*24},
    store : new RedisStrore({
        "host" : "127.0.0.1",
        "port" : "6379",
        "db" : 1,
        "ttl" : 1800,
        "logErrors" : true
    })
}));
// app.use('/', require('./routes/authSession'));
// app.all('/index',function (req,res,next) {
//     if (req.session.user){
//         console.log('req.session is exist!');
//         next();
//     }else {
//         console.log('user is expired or no login --------');
//         res.redirect('/login');
//     }
// });
//  接口配置
app.use('/api/login',require('./routes/api/login'));
app.use('/api/main/roadInfo',require('./routes/api/main/roadInfo'));
app.use('/api/main/roadMap',require('./routes/api/main/roadMap'));
app.use('/api/main/roadEmergency',require('./routes/api/main/roadEmergency'));
app.use('/api/main/roadResolve', require('./routes/api/main/roadResolve'));

module.exports = app;
