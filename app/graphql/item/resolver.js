'use strict';

module.exports = {
  User: {
    items(root, _, ctx) {
      console.log('items')
      return ctx.connector.item.fetchByUserId(root.id);
    },
  },
  Mutation: {
    createItem(root, {
      userID,
      content,
      expire,
      time
    }, ctx) {
      return ctx.connector.item.create(userID, content, expire,time);
    },
    updateItem(root, {
      id,
      content,
      expire,
      done,
    }, ctx) {
      return ctx.connector.item.update(id, content, expire, done);
    },
    deleteItem(root, {
      id,
    }, ctx) {
      return ctx.connector.item.delete(id);
    },
  },
};
