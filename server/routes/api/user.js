var express = require('express');
var router = express.Router();
import UserModel from '../../models/user'
import { userInfo } from 'os';
var sha1 = require('sha1');

var formidable = require('formidable'),
    http = require('http'),
    fs = require('fs'),
    util = require('util');

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
        password: sha1(req.body.password),
        avatar:req.body.avatar,
        isAdmin:false
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
        if(!result || password !== result.password){
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

// POST 头像上传
router.post('/uploadimg', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./server/public/images";
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err,fields,files){
        let file = files.file;
        fs.rename(file.path , form.uploadDir + '/' + file.name);
        responseData.data= 'http://localhost:8080/images/' + file.name;
        res.json(responseData);
    });
});

// GET 获取用户列表
router.get('/', function(req, res, next) {
    let page= Number(req.query.page),
        rows =Number(req.query.rows);
    UserModel.getUserList(page,rows).then((result)=>{
        UserModel.getUserCount().then((total)=>{
            responseData.data={
                result:result,
                total:total,
                page:page,
                rows:rows
            };
            res.json(responseData); 
        })            
    }).catch(next);
});

// GET /user/:name 获取用户信息
router.get('/:name', function(req, res, next) {
    let name = req.params.name;
    UserModel.getUserByName(name).then((result)=>{
        delete result.password;
        responseData.data=result;
        res.json(responseData);           
    }).catch(next);
});

// DELETE /user/remove/:id 删除用户
router.delete('/remove/:id', function(req, res, next) {
    var id = req.params.id;
    UserModel.delUserById(id)
      .then(function () {
        res.json(responseData);     
      })
      .catch(next);
  });

module.exports = router;