'use strict';
const _ = require('lodash');
const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
    this.proxy = ctx.app.model.User;
  }

  fetch(ids) {
    const users = this.ctx.app.model.User.findAll({
      where: {
        id: {
          $in: ids,
        },
      },
    }).then(us => us.map(u => u.toJSON()));
    return users;
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  async fetchById(id) {
    const user = this.ctx.app.model.User.find({
      where: {
        id
      },
    }).then(us => us.toJSON());

    return user;
  }

  //点赞列表
  async addUserLikes(id, articleId) {
    const user = await this.loader.load(id);
    let likes = user.likes;
    let newLikes = [];
    if (_.isEmpty(likes)) {
      newLikes.push(articleId);
    } else {
      newLikes = JSON.parse(likes);
      newLikes.push(articleId);
    }
    user.likes = JSON.stringify(newLikes);
    let data = await this.ctx.app.model.User.update(user, {
      where: {
        id
      },
    });
    return user;
  }

}



module.exports = UserConnector;

