'use strict';

const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    // this.loader = new DataLoader(this.fetch.bind(this));
    this.proxy = ctx.app.model.User;
  }

  // fetch(ids) {
  //   const users = this.ctx.app.model.User.findAll({
  //     where: {
  //       id: {
  //         $in: ids,
  //       },
  //     },
  //   }).then(us => us.map(u => u.toJSON()));
  //   return users;
  // }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  async fetchById(id) {
    const comment = this.ctx.app.model.User.find({
      where: {
        id
      },
    }).then(us => us.toJSON() );

    return comment;
  }
}

module.exports = UserConnector;

