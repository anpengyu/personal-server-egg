'use strict';

module.exports = {
  Query: {
    user(root, { id }, ctx) {
      let d = ctx.connector.user.fetchById(id);
      return d;
    },
    tags(root, params, ctx) {
      return ctx.connector.item.fetchRecommandation();
    },
  },
  Article: {
    //根据文章获取所属用户
    user(root, _, ctx) {
      return ctx.connector.user.fetchById(root.userId);
    }
  },
  Comment: {
    //根据文章获取所属用户
    creator(root, _, ctx) {
      return ctx.connector.user.fetchById(root.userId);

    },
    replyTo(root, _, ctx) {
      if (root.replyToCommentId === 0) {
        return { id: -1, username: '', sex: '', headImg: '' };
      }
      return ctx.connector.user.fetchById(root.replyToCommentId);
    },
  },
  Mutation: {
    //点赞
    addUserLikes(root, { userId, articleId }, ctx) {
      return ctx.connector.user.addUserLikes(userId,articleId);
    },
  },
};
