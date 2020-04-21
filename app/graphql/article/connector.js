'use strict';

const DataLoader = require('dataloader');
const _ = require('lodash');
class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
    this.proxy = ctx.app.model.Article;
    this.classifyProxy = ctx.app.model.Classify;
  }

  fetch(ids) {
    const users = this.ctx.app.model.Article.findAll({
      where: {
        id: {
          $in: ids,
        },
      },
    }).then(us =>

      us.map(u => u.toJSON())
    );
    return users;
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    let d = this.proxy.findAll();


    return d;
  }

  // 获取所有文章
  loadAllArticles() {
    const articles = this.ctx.app.model.Article.findAll({ limit: 10, offset: 0, order: [["created_at", "desc"]] })
      .then(us =>
        us.map(u => u.toJSON())
      );
    return articles;
  }


  loadAllArticlesForUser(id) {
    const articles = this.ctx.app.model.Article.findAll({
      where: {
        userId: id
      },
    }).then(us =>
      us.map(u => u.toJSON())
    );
    return articles;
  }

  // 添加文章
  async createArticle(data) {
    if (data.label && !_.isEmpty(data.label)) {
      data.label = JSON.stringify(data.label)
    }
    console.log('data', data)
    // const classify = await this.proxy.create({ ...params });
    const item = await this.proxy.create(_.pickBy({
      ...data
    }));

    return item.toJSON();
  }

  // 添加文章查看次数
  async addWatchCount(id) {
    const article = await this.loader.load(id);
    article.articlePageView += 1
    let data = await this.ctx.app.model.Article.update(article, {
      where: {
        id: id
      },
    })
    return { articlePageView: article.articlePageView };
  }

  // 点赞 1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表  type:1添加 2:减
  async addPraiseCount(id, flag, type) {

    const article = await this.loader.load(id);
    if (type == 1) {//1：点赞  2：取消点赞
      switch (flag) {
        case 1: article.articlePraiseCount += 1
          break;
        case 2: article.articleDislikeCount += 1
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
      }
    } else {
      switch (flag) {
        case 1: Number(article.articlePraiseCount) >= 0 ? article.articlePraiseCount -= 1 : ''
          break;
        case 2: Number(article.articleDislikeCount) >= 0 ? article.articleDislikeCount -= 1 : ''
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
      }
    }

    let data = await this.ctx.app.model.Article.update(article, {
      where: {
        id: id
      },
    })
    console.log('article', article)
    return { id: article.id };
  }

}

module.exports = UserConnector;

