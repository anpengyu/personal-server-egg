'use strict';
// 行为：负责资料的获取操作
const BaseController = require('../../core/BaseController').default

module.exports = {

  Query: {
    // 获取所有文章
    allArticles(root, params, ctx) {
      return ctx.connector.article.loadAllArticles(params);
    },
    //根据文章id获取文章详情
    article(root, { id }, ctx) {
      return ctx.connector.article.articleDetail(id);
    },
  },
  User: {
    //根据用户id获取其所有文章
    articles(root, _, ctx) {
      return ctx.connector.article.loadAllArticlesForUser(root.id);
    },
  },

  Mutation: {
    // 添加文章
    createArticle(root, params, ctx) {
      return ctx.connector.article.createArticle(params)
    },

    auditArticle(root, params, ctx) {
      return ctx.connector.article.auditArticle(params)
    },

    // 增加文章查看次数
    addWatchCount(root, { articleId }, ctx) {
      return ctx.connector.article.addWatchCount(articleId);
    },

    //点赞
    addPraiseCount(root, { articleId, flag, type }, ctx) {
      return ctx.connector.article.addPraiseCount(articleId, flag, type);
    },

  }
}