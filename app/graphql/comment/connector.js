'use strict';

const DataLoader = require('dataloader');
const _ = require('lodash');
class CommentConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
    this.proxy = ctx.app.model.Comment;
  }

  fetch(ids) {
    const users = this.ctx.app.model.Comment.findAll({
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
    return d;
  }

  loadAllArticles() {
    const articles = this.ctx.app.model.Article.findAll().then(us => us.map(u => u.toJSON()));
    return articles;
  }


  loadAllComment(articleId,id) {
   
    // const d = this.ctx.app.model.Comment.findAll();
    // d.then(res=>{console.log(res)})
    const comment = this.ctx.app.model.Comment.findAll({limit: 10, offset: 0,order:[["created_at","desc"]],
      where: {
        article_id: articleId,
        root_comment_id:id
      },
    }).then(us =>
      us.map(u => u.toJSON())
    );
    return comment;
  }

  loadAllComment1(articleId,id) {
    console.log('id', id)
    const comment = this.ctx.app.model.Comment.findAll({
      where: {
        article_id:articleId,
        root_comment_id: id
      },
    }).then(us =>
      us.map(u => u.toJSON())
    );
    return comment;
  }

  // 添加文章
  async createComment(data) {
    const item = await this.proxy.create(_.pickBy({
      ...data
    }));
    return item.toJSON();
  }
}

module.exports = CommentConnector;

