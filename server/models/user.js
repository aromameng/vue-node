var User = require('../config/mongo/mongo').User;

User.plugin('delPassword', {
  afterFind: function (posts) {
    return posts.map(function (post) {
      delete post.password
      return post;
    });
  },
  afterFindOne: function (post) {
    if (post) {
      delete post.password
    }
    return post;
  }
});

module.exports = {
    // 注册一个用户
  create: function create(user) {
    return User.create(user).exec();
  },
  // 通过用户名获取用户信息
  getUserByName: function getUserByName(name) {
    return User
      .findOne({ name: name })
      .addCreatedAt()
      .exec();
  },
  // 获取用户列表
  getUserList(page,rows){
    return User
    .find()
    .limit(rows)
    .skip((page-1)*rows)
    .sort({ _id: -1 })
    .addCreatedAt()
    .delPassword()
    exec();
  },
  // 获取用户总数
  getUserCount(){
    return User.count().exec();
  },
  delUserById(userId){
    return User.remove({_id: userId }).exec()
  }
}