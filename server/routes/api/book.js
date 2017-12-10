var express = require('express');
var router = express.Router();
import PostModel from '../../models/posts'

let responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        msg: ""
    }
    next()
})

// GET /news 获取文章列表
router.get('/', function(req, res, next) {
    let page= Number(req.query.page),
        rows =Number(req.query.rows);
    PostModel.getPosts(page,rows).then((request)=>{
        PostModel.getPostCount().then((total)=>{
            responseData.data={
                result:request,
                total:total,
                page:page,
                rows:rows
            };
            res.json(responseData); 
        })            
    }).catch(next);
});

// POST /news 创建一篇文章
router.post('/', function(req, res, next) {
    var author = req.body.author;
    var title = req.body.title;
    var content = req.body.content;
    var post = {
        author: author,
        title: title,
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

/* POST /news/:id 修改某篇文章 */
router.post('/:id', function(req, res, next) {
    var id=req.params.id,
        author = req.body.author,
        title = req.body.title,
        content = req.body.content;
    var post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    };
    PostModel.updatePost(id,post).then(function(request){
        res.json(responseData);     
    }).catch(next);
});



/* GET /news/:id 获取某篇文章 */
router.get('/:id', function(req, res, next) {
    var id=req.params.id;
    PostModel.getPostById(id).then(function(request){
        responseData.data=request;
        res.json(responseData);     
    }).catch(next);
});

// GET /news/remove/:postId 删除一篇文章
router.get('/remove/:id', function(req, res, next) {
    var id = req.params.id;

    PostModel.delPostById(id)
      .then(function () {
        res.json(responseData);     
      })
      .catch(next);
  });


module.exports = router;