'use strict';

const DataLoader = require('dataloader');
const _ = require('lodash');
class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
    this.proxy = ctx.app.model.Article;
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
    let d = this.loader.load(id);
    d.then(res => {
      console.log('res..', res)
    })

    return d;
  }

  // 获取所有文章
  loadAllArticles() {
    const articles = this.ctx.app.model.Article.findAll({limit: 10, offset: 0,order:[["created_at","desc"]]})
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

    const item = await this.proxy.create(_.pickBy({
      ...data
    }));
    return item.toJSON();
  }
}

module.exports = UserConnector;

