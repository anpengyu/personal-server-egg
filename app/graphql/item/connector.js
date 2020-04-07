'use strict';

const _ = require('lodash');

class ItemConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = ctx.app.model.Item;
    this.tag = this.ctx.app.model.Tag;
  }
  async fetch() {
  
    const tags = await this.proxy.findAll().then(ts => ts.map(u => u.toJSON()));
    console.log('tags',tags)
    return tags;
  }
  async fetchByUserId(userID) {
  
    const tags = await this.tag.findAll({
      where: {
        item_id: userID,
      },
    }).then(ts => ts.map(u => u.toJSON()));
    return tags;
  }

  async create(userID, content, expire,time) {
    const item = await this.proxy.create(_.pickBy({ user_id: userID, content, expire,time }));
    return item.toJSON();
  }

  async update(id, content, expire, done) {
    await this.proxy.update(_.pickBy({ id, content, expire, done }), { where: { id } });
    const item = await this.proxy.findOne({ where: { id } });
    return item.toJSON();
  }

  async delete(id) {
    const item = await this.proxy.findOne({ where: { id } });
    const ret = item.toJSON();
    await item.destroy();
    return ret;
  }
}

module.exports = ItemConnector;

