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

  //1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表
  async changeUserInfo(userId, id, type) {
    const user = await this.loader.load(id);
    let data = '';
    switch (type) {
      case "1": data = user.likes;
        break;
      case "2": data = user.collects;
        break;
      case "3": data = user.historys;
        break;
      case "4": data = user.attention;
        break;
      case "5": data = user.comments;
        break;
      case "6": data = user.articles;
        break;
    }
    let newData = [];
    if (_.isEmpty(data)) {
      newData.push(id);
    } else {
      newData = JSON.parse(data);
      newData.push(id);
    }

    switch (type) {
      case "1": user.likes = JSON.stringify(newData);
        break;
      case "2": user.collects = JSON.stringify(newData);
        break;
      case "3": user.historys = JSON.stringify(newData);
        break;
      case "4": user.attention = JSON.stringify(newData);
        break;
      case "5": user.comments = JSON.stringify(newData);
        break;
      case "6": user.articles = JSON.stringify(newData);
        break;
    }

    let response = await this.ctx.app.model.User.update(user, {
      where: {
        id: userId
      },
    });
    return user;
  }

}



module.exports = UserConnector;

