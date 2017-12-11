var marked = require('marked');
var Post = require('../config/mongo/mongo').Post;

// 将 post 的 content 从 markdown 转换成 html
Post.plugin('contentToHtml', {
    afterFind: function (posts) {
      return posts.map(function (post) {
        post.content = marked(post.content);
        return post;
      });
    },
    afterFindOne: function (post) {
      if (post) {
        post.content = marked(post.content);
      }
      return post;
    }
});

module.exports = {
    // 按创建时间降序获取所有用户文章
    getPosts(page=1,rows=10) {
        return Post
        .find()
        .limit(rows)
        .skip((page-1)*rows)
        .sort({ _id: -1 })
        .addCreatedAt()
        .contentToHtml()
        .exec();
    },
    // 按出版时间降序获取所有文章
    getPostsPublish(page=1,rows=10){
      return Post
      .find()
      .limit(rows)
      .skip((page-1)*rows)
      .sort({ publish: -1 })
      .addCreatedAt()
      .contentToHtml()
      .exec();
    },
    // 获取总文章数
    getPostCount(){
      return Post.count().exec();
    },
    // 通过文章 id 获取一篇文章
    getPostById(postId) {
        return Post
        .findOne({ _id: postId })
        .addCreatedAt()
        .contentToHtml()
        .exec();
    },
    updatePost(postId,data){
      return Post
      .update({_id: postId},{ $set: data })
      .exec();
    },
    create(post) {
      return Post.create(post).exec();
    },
    // 通过用户 id 和文章 id 删除一篇文章
    delPostById(postId) {
      return Post.remove({_id: postId }).exec()
    }
}