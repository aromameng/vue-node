var Comment = require('../config/mongo/mongo').Comment;

module.exports = {
    // 获取评论
    getComment(postId){
        return Comment
        .find({postId:postId})
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
}