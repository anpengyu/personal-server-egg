'use strict';

module.exports = {
  Query: {
    // 获取文章下所有评论
    comment(root, { articleId }, ctx) {
      return ctx.connector.comment.loadAllComment(articleId,"0");
    },
  },
  User: {
    //根据用户id获取其所有文章
    articles(root, _, ctx) {
      return ctx.connector.article.loadAllArticlesForUser(root.id);
    },
  },
  Comment: {
    comment(root, _, ctx) {
      return ctx.connector.comment.loadAllComment(root.articleId,root.id );
    },
  },
  Mutation: {
    // 添加评论
    createComment(root, { userId, articleId, content, replyToCommentId, rootCommentId }, ctx) {
      let data = {
        userId, articleId, content, replyToCommentId, rootCommentId
      }
      return ctx.connector.comment.createComment(data)
    }
  },
  Article: {
    comment(root, { articleId }, ctx) {
      console.log('root',root)
      console.log('articleId',articleId)
      return ctx.connector.comment.loadAllComment(root.id,"0");
    },
  }
};

