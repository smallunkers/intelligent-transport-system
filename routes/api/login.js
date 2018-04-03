const express = require('express');
const router = express.Router();
const apiConstant = require('../../service/serviceNameList');
const service = require('../../service/service');
const paramUtil = require('../../public/src/utils/paramUtil');
router.post('/handleLogin',function (req, res, next){
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    return service.handleLogin(parameters).then((resp) => {
        res.json(resp);
    })
});

router.post('/forgetPassword',function (req, res, next) {
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    return service.forgetPassword(parameters).then((resp) => {
        res.json(resp);
    })
});

router.post('/register',function (req, res, next) {
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    return service.register(parameters).then((resp) => {
        res.json(resp);
    })
});
router.post('/changePassword',function (req, res, next) {
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    return service.changePassword(parameters).then((resp) => {
        res.json(resp);
    })
});
router.post('/checkUserId',function (req, res, next) {
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    return service.checkUserId(parameters).then((resp) => {
        res.json(resp);
    })
});

module.exports = router;