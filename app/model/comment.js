module.exports = (app) => {
  const { STRING ,TEXT,INTEGER} = app.Sequelize;
  const Comment = app.model.define('comment',{
    userId:STRING(),
    content:{type:STRING(),field:'content'},
    rootCommentId:{type:STRING(),field:'root_comment_id'},
    articleId:{type:STRING(),field:'article_id'},
    replyToCommentId:{type:STRING(),field:'reply_toComment_id'},
    liks:{type:INTEGER,field:'liks'}
  });
  return Comment;
};
