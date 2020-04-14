// 'use strict';
// import helper from '../../extend/helper';
const helper = require('../../extend/helper');
const { KEYS } = require('../../extend/Constant');
const _ = require('lodash');
const jwt = require('jsonwebtoken')
// const BaseConnector = require('../BaseConnector');

const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
    this.proxy = ctx.app.model.User;
    this.token = ctx.request.header.authorization;
  }

  fetch(ids) {
    const users = this.proxy.findAll({
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
    }).then(us => !_.isEmpty(us) && us.toJSON());

    return user;
  }

  //1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表
  async changeUserInfo(userId, id, type) {
    const user = await this.loader.load(userId);
    let data = '';
    switch (type) {
      case 1: data = user.likes;
        break;
      case 2: data = user.collects;
        break;
      case 3: data = user.historys;
        break;
      case 4: data = user.attention;
        break;
      case 5: data = user.comments;
        break;
      case 6: data = user.articles;
        break;
    }
    let newData = [];
    if (_.isEmpty(data)) {
      newData.push(id);
    } else {
      if (_.includes(data, id)) {
        if (!_.eq(type, 3)) {
          newData = _.filter(JSON.parse(data), (v) => id != v)
          if (_.isEmpty(newData)) {
            newData = []
          }
        } else {
          newData = JSON.parse(data);
          newData.push(id);
        }
      } else {
        newData = JSON.parse(data);
        newData.push(id);
      }
    }

    // let strData = JSON.stringify(_.uniq(newData));
    let strData = JSON.stringify(newData);
    switch (type) {
      case 1: user.likes = strData;
        break;
      case 2: user.collects = strData;
        break;
      case 3: user.historys = strData
        break;
      case 4: user.attention = strData;
        break;
      case 5: user.comments = strData;
        break;
      case 6: user.articles = strData;
        break;
    }

    let response = await this.ctx.app.model.User.update(user, {
      where: {
        id: userId
      },
    });
    return user;
  }

  async login(params) {
    console.log('params',params)
    const user = await this.proxy.findOne({
      where: {
        username: params.username,
        password: params.password
      }
    });

    if (_.isEmpty(user)) {
      return null;
    } else {
      let loginTime = helper.currentDate();
      // let loginTime = this.currentDate();
      let token = jwt.sign({
        id: user.id,
        username: user.username,
        loginTime
      }, KEYS)
      // console.log('ctx',this.ctx.app.redis)
      this.ctx.app.redis.set(token, user.id);
      this.ctx.app.redis.set(user.id + 'loginTime', loginTime)
      return { id:user.id,token }
    }
  }

  async logout() {
    const userId = await this.ctx.app.redis.get(this.token)
    this.ctx.app.redis.set(this.token, '');
    this.ctx.app.redis.set(userId + 'loginTime', '')
    return { id: userId }
  }
}

module.exports = UserConnector;

