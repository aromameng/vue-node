var express = require('express');
var router = express.Router();
import UserModel from '../../models/user'
import { userInfo } from 'os';
var sha1 = require('sha1');

let responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        msg: ""
    }
    next()
})

// POST /user/register 注册
router.post('/register', function(req, res, next) {
    const user={
        name:req.body.name,
        password: sha1(req.body.password)
    }
    UserModel.getUserByName(user.name).then((userInfo)=>{
        if(userInfo){
            responseData.code=1;
            responseData.msg="用户名重复，请重新注册";
            res.json(responseData);
            return;
        }
        UserModel.create(user).then((result)=>{
            var user = result.ops[0];
            // 将用户信息存入 session
            delete user.password;
            req.session.user = user;
            responseData.data=user;
            res.json(responseData);
        }).catch(next);
    })
});

// POST /user/login 登录
router.post('/login', function(req, res, next) {
    let name=req.body.name,
          password=req.body.password;
    UserModel.getUserByName(name).then((result)=>{
        if(!result || sha1(password) !== result.password){
           responseData.code=1;
           responseData.msg="用户名或密码错误";
           res.json(responseData);
           return; 
        }      
        // 用户信息写入 session
        delete result.password;
        req.session.user = result;
        responseData.data=result;
        res.json(responseData);
    }).catch(next);
});

// POST /user/loginout 退出登录
router.post('/loginout', function(req, res, next) {
    let _id=req.body._id;
    req.session.user=null;
    responseData.data=null;
    res.json(responseData);
});

module.exports = router;