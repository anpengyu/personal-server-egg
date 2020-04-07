'use strict';

module.exports = {
  Item: {
    tags(root, _, ctx) {
      // return ctx.connector.tag.fetchByItemId(root.id);
      return ctx.connector.item.fetchByUserId(root.id);
    },
  },
   User: {
    tags(root, _, ctx) {
      // return ctx.connector.tag.fetchByItemId(root.id);
      return ctx.connector.item.fetchByUserId(root.id);
    },
  },
  Mutation: {
    attachTag(root, { itemID, tag }, ctx) {
      return ctx.connector.tag.attach(itemID, tag);
    },
    removeTag(root, { id }, ctx) {
      return ctx.connector.tag.remove(id);
    },
  },
};
