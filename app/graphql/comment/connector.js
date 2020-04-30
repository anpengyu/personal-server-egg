'use strict';

const DataLoader = require('dataloader');
const _ = require('lodash');
const Comment = require('../../entity/blog/Comment').default

class CommentConnector {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async loadAllArticles() {
    return await Comment.find()
  }

  async loadAllComment(articleId, id) {
    const comment = await Comment.find({
      skip: 0, take: 10,  order: { createDate: "DESC" },
      where: {
        articleId: articleId,
        rootCommentId: id
      },
    });
    console.log('comment',comment)
    return comment;
  }

  async loadAllComment1(articleId, id) {
    const comment = await Comment.find({
      where: {
        articleId: articleId,
        rootCommentId: id
      },
    })
    return comment;
  }

  // 添加文章
  async createComment(data) {
    const item = await Comment.save(_.pickBy({
      ...data
    }));
    return item
  }
}

module.exports = CommentConnector;

