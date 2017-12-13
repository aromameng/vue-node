var Comment = require('../config/mongo/mongo').Comment;

module.exports = {
    // 获取评论
    getComment(postId,page=1,rows=10){
        return Comment
        .find({postId:postId})
        .limit(rows)
        .skip((page-1)*rows)
        .populate({ path: 'author',select:{password:0} , model: 'User' })
        .sort({ _id: -1 })
        .addCreatedAt()
        .exec();
    },
    // 添加评论
    addComment(comment){
        return Comment
        .create(comment)
        .exec()
    },
    // 获取评论总数
    getCount(bookId){
        return Comment
        .count({postId:bookId}).exec();
    }
}