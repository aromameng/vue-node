var express = require('express');
var router = express.Router();
import PostModel from '../../models/posts'
import {formatDate} from '../../public/js/helper'
import {checkLogin,checkAdmin} from '../../middlewares/check'

let responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        msg: ""
    }
    next()
})

// GET /book 获取图书列表
router.get('/', function(req, res, next) {
    let page= Number(req.query.page),
        rows =Number(req.query.rows);
    PostModel.getPosts(page,rows).then((result)=>{
        PostModel.getPostCount().then((total)=>{
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

// GET /book 获取最新发版的10条图书列表
router.get('/new10', function(req, res, next) {
    PostModel.getPosts(1,10).then((result)=>{
        PostModel.getPostCount().then((total)=>{
            responseData.data={
                result:result
            };
            res.json(responseData); 
        })            
    }).catch(next);
});

// POST /book 创建图书
router.post('/', checkAdmin , function(req, res, next) {
    req.body.publish = formatDate(new Date(req.body.publish),'yyyy-MM-dd hh:mm:ss');
    var {author,title,publish,content} = req.body;
    var post = {
        author: author,
        title: title,
        publish:publish,
        content: content,
        pv: 0
    };
    PostModel.create(post)
    .then(function (result) {
      // 此 post 是插入 mongodb 后的值，包含 _id
      post = result.ops[0];
      res.json(responseData); 
    })
    .catch(next);
});

/* POST /book/:id 修改图书 */
router.post('/:id', checkAdmin , function(req, res, next) {
    var id=req.params.id;
    req.body.publish = formatDate(new Date(req.body.publish),'yyyy-MM-dd hh:mm:ss');
    var {author,title,publish,content} = req.body;
    var post = {
        author: author,
        title: title,
        publish:publish,
        content: content,
        pv: 0
    };
    PostModel.updatePost(id,post).then(function(request){
        res.json(responseData);     
    }).catch(next);
});

/* GET /book/:id 获取某篇文章 */
router.get('/:id', async(req, res, next) => {
    var id=req.params.id;
    const result = await PostModel.getPostById(id);
    responseData.data=result;
    res.json(responseData);
});

// DELETE /book/remove/:postId 删除一篇文章
router.delete('/remove/:id', checkAdmin , async(req, res, next) => {
    const id = req.params.id;
    const result = await PostModel.delPostById(id);
    res.json(responseData);
  });

module.exports = router;