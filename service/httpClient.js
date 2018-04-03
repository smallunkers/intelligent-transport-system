const url = require('url');
const http = require('http');
const https = require('https');
const querystring = require('querystring');
const _ = require('underscore');
const Promise = require('promise');
const BufferHelper = require('../public/src/utils/bufferHelper');
let paramUtil = require('../public/src/utils/paramUtil');

let request = function (action,data,method,headers) {
    let urlObj = url.parse(action,true);
    headers = headers || {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    _.extend({},headers,{
        'Content-Length':Buffer.byteLength(postData),
        'Connection':'keep-alive'});
    let options = {
        hostname:urlObj.hostname,
        port:urlObj.port,
        path:urlObj.path,
        method: method || 'POST',
        headers: headers
    };
    return new Promise(function(resolve,reject) {
        let reqCallback = function(res) {
            let bufferHelper = new BufferHelper();
            //console.log('Status:',res.statusCode);
            //console.log('headers:',JSON.stringify(res.headers));

            //设置后chunk返回字符串 默认buffer
            //res.setEncoding('utf-8');
            res.on('data',function(chunk){
                //console.log('body分隔线---------------------------------\r\n');
                bufferHelper.concat(chunk);
            });
            res.on('end',function(){
                //console.log('No more data in response.********');
                resolve(bufferHelper.toBuffer().toString('utf8'));
            });
            let req= urlObj.protocol.indexOf('https')>-1?
                https.request(options, reqCallback):
                http.request(options, reqCallback);

            req.on('error',function(err){
                reject(err);
            });
            req.write(data);
            req.end();
        };
    });
};

module.exports = {
  post:function (action,params) {
      paramUtil.clearEmptyValue(params);
      return request(action,params?querystring.stringify(params):"");
  },
  get: function (action,params) {
      let queryStr = paramUtil.json2query(params) || '';
      return request(action,queryStr,'GET');
  }
};