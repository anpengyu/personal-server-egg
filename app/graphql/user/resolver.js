'use strict';

module.exports = {
  Query: {
    user(root,params, ctx) {
      return ctx.connector.user.fetchById();
    },
    tags(root, params, ctx) {
      return ctx.connector.item.fetchRecommandation();
    },
    login(root, params, ctx){
      return ctx.connector.user.login(params);
    },
    logout(root, params, ctx){
      return ctx.connector.user.logout();
    }
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
    //点赞 1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表
    changeUserInfo(root, { userId, id,type }, ctx) {
      return ctx.connector.user.changeUserInfo(userId,id,type);
    },
  },
};
