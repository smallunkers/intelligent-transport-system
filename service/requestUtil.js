// import httpClient from './httpClient';
let httpClient = require('./httpClient')
module.exports= {
    requestTis (url,parameters) {
        return new httpClient.post(url,parameters).then(function(result){
            let obj = JSON.parse(result);
            let response;
            if(obj.code === 0) {
                 response = {
                    code:'0',
                    data:obj.data || {},
                    msg:obj.msg || ''
                }
            }else {
                response = {
                    code: obj.code,
                    msg: obj.msg || '',
                    data: obj.data || {},
                }
            }
            return response;
        }).catch((error)=>{
            return error;
        })
    }
}