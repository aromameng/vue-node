var Chat = require('../config/mongo/mongo').Chat;

module.exports = {
  getConversation(conversationId){
    return Chat
      .findOne({_id: conversationId})
      .exec();
  },
  create(conversation){
    return Chat.create(conversation).exec();
  },
  delConversationById(conversationId) {
    return Chat.remove({_id: conversationId }).exec()
  }
}