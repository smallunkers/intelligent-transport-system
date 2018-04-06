const express = require('express');
const router = express.Router();
const apiConstant = require('../../../service/serviceNameList');
const service = require('../../../service/service');
const paramUtil = require('../../../public/src/utils/paramUtil');


module.exports = router;

router.post('/roadMapAll',function (req,res,next) {
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    let fs = require('fs');
    let data = fs.readFileSync('data/roadMap.json','utf-8');
    // console.log(data);
    res.status(200).send(data);
    // return service.roadMapAll(parameters).then((resp) => {
    //     res.json(resp);
    // })
});