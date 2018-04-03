let express = require('express');
let path = require('path');
let webpack = require('webpack');
let webpackConfig = require('./webpack.config.dev.js');
let app = express();// 创建一个express实例
let compiler = webpack(webpackConfig);// 调用webpack并把配置传递过去
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

//  接口配置
app.use('/api/login',require('./routes/api/login'));
app.use('/api/main/roadInfo',require('./routes/api/main/roadInfo'));
app.use('/api/main/roadMap',require('./routes/api/main/roadMap'));
app.use('/api/main/roadEmergency',require('./routes/api/main/roadEmergency'));
app.use('/api/main/roadResolve', require('./routes/api/main/roadResolve'));

module.exports = app;
