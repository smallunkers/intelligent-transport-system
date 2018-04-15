const express = require('express');
const router = express.Router();
let session = require('express-session');

router.get('/home/roadResolve',function(req, res, next) {
    if (req.session.user){
        console.log('req.session is exist!');
        next();
    }else {
        console.log('user is expired or no login --------');
        res.redirect('/login');
    }
    res.redirect('/login');
})

module.exports = router;