'use strict';
// 行为：负责资料的获取操作
module.exports = {
  Query: {
    // 获取所有文章
    allArticles(root, _, ctx) {
      console.log('dddddddddddd')
      return ctx.connector.article.loadAllArticles();
    },
    //根据文章id获取文章详情
    article(root, { id }, ctx) {
      return ctx.connector.article.fetchById(id);
    },
    tags(root, params, ctx) {
      return ctx.connector.item.fetchRecommandation();
    },
  },
  User: {
    //根据用户id获取其所有文章
    articles(root, _, ctx) {
      return ctx.connector.article.loadAllArticlesForUser(root.id);
    },
  },

  Mutation:{
    // 添加文章
    createArticle(root,{userId,articleTitle,articleSubTitle,articleContent},ctx){
      let data = {
        userId,articleTitle,articleSubTitle,articleContent
      }
      return ctx.connector.article.createArticle(data, userId,articleTitle,articleSubTitle,articleContent)
    },

    // 增加文章查看次数
    addWatchCount(root,{articleId},ctx){
      return ctx.connector.article.addWatchCount(articleId);
    },

    //点赞
    addPraiseCount(root,{articleId,type},ctx){
      return ctx.connector.article.addPraiseCount(articleId,type);
    },

  }
};
