var express = require('express');
var router = express.Router();
import CommentModel from '../../models/comment'

var moment = require('moment');
var objectIdToTimestamp = require('../../public/js/helper').objectIdToTimestamp;

let responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        msg: ""
    }
    next()
})

// GET /comment 获取图书的评论
router.get('/',function(req, res, next){
    let page= Number(req.query.page),
    rows =Number(req.query.rows);
    var bookId = req.query.bookId;
    CommentModel.getComment(bookId,page,rows)
    .then(function(result){
        CommentModel.getCount(bookId).then((total)=>{
            responseData.data={
                result:result,
                total:total,
                page:page,
                rows:rows
            };
            res.json(responseData); 
        })     
    }).catch(next);
})


// POST /comment/add/:bookId/:authorId
router.post('/add/:bookId/:authorId', function(req, res, next) {
    var bookId = req.params.bookId,
        authorId = req.params.authorId,
        content = req.body.content;
    let comment={
        author:authorId,
        content:content,
        postId:bookId
    }
    CommentModel.addComment(comment)
        .then(function (result) {
            responseData.data = result.ops[0];
            responseData.data.created_at = moment(objectIdToTimestamp(responseData.data._id)).format('YYYY-MM-DD HH:mm');
            res.json(responseData);     
        })
        .catch(next);
});

module.exports = router;