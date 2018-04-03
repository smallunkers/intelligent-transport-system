module.exports = {
    getParams : function (req) {
        var params = req.body || {},
            queryParams = req.query;
        if(queryParams){
            for(var key in queryParams){
                if(queryParams.hasOwnProperty(key)){
                    params[key] = queryParams[key];
                }
            }
        }
        return params;
    },
    getParamByKey: function(req,key) {
        var params = this.getParams(req);
        return params[key] || null;
    },
    query2json: function (str) {
        var arr = str.split('&'),
            json = {};
        for(var i=arr.length-1;i>=0;i--){
            var kvs = arr[i].split('='),
                key = kvs[0];
            json[key] = kvs[1];
        }
        return json;
    },
    json2query: function (json) {
        if(!json)return null;
        var arr = [];
        for(var key in json){
            if(json.hasOwnProperty(key))arr.push(key+'='+json[key]);
        }
        return arr.join('&');
    },
    clearEmptyValue: function(params){
        if(params){
            for(var key in params){
                if(params.hasOwnProperty(key)){
                    var val = params[key];
                    if(val === null || val === undefined)delete params[key];
                }
            }
        }
    },
    isEmpty: function(json){
        if(!json)return true;
        for(var key in json){
            if(json.hasOwnProperty(key))return false;
        }
        return true;
    }
};