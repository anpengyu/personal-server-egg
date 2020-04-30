'use strict';
const _ = require('lodash');

module.exports = {
  Query: {
    //根据id获取单个用户详情
    user(root, { id }, ctx) {
      return ctx.connector.user.user(id);
    },
    login(root, params, ctx) {
      return ctx.connector.user.login(params);
    },
    logout(root, params, ctx) {
      return ctx.connector.user.logout();
    }
  },
  Article: {
    //根据文章获取所属用户
    user(root, _, ctx) {
      return ctx.connector.user.user(root.userId);
    }
  },
  Comment: {
    //根据文章获取所属用户
   async creator(root, _, ctx) {
      return await ctx.connector.user.user(root.userId);

    },
    replyTo(root, params, ctx) {
      if (_.eq(root.replyToCommentId,'0')) {
        return { id: -1, username: '', sex: '', headImg: '' };
      }
      return ctx.connector.user.user(root.replyToCommentId);
    },
  },
  Mutation: {
    //点赞 1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表
    changeUserInfo(root, { userId, id, type }, ctx) {
      return ctx.connector.user.changeUserInfo(userId, id, type);
    },
  },
};
