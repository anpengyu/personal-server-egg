'use strict';

const DataLoader = require('dataloader');
const _ = require('lodash');

const Article = require('../../entity/blog/Article').default
const Classify = require('../../entity/blog/Classify').default
const User = require('../../entity/user').default
class UserConnector {

  //根据userId获取所属所有文章
  async articleDetail(id) {
    return await Article.findOne({ id: id });
  }

  // 获取所有文章
  async loadAllArticles(params) {
    console.log('params', params)
    let audit = params.audit;
    let articleTitle = params.articleTitle;
    let username = params.username;
    let createDate = params.createDate;
    let course = params.course;
    let label = params.label;

    let condition = {
      skip: 0, take: 10,
      order: { createDate: "DESC" }
    }

    if (_.isNumber(audit) && audit != 4) {
      console.log('audit', audit)
      condition = {
        where: { audit: audit },
        ...condition
      }
    }
    let where = condition.where || {};
    if (!_.isEmpty(articleTitle)) {
      where = {
        ...where,
        articleTitle: articleTitle,
      }
    }

    if (!_.isEmpty(username)) {
      const user = await User.findOne({
        where: {
          username: params.username
        }
      });
      where = {
        ...where,
        userId: user && user.id || 0,
      }
    }
    if (!_.isEmpty(createDate)) {
      where = {
        ...where,
        updated_at,
      }
    }
    if (!_.isEmpty(course)) {
      where = {
        ...where,
        course,
      }
    }
    if (!_.isEmpty(label)) {
      where = {
        ...where,
        label,
      }
    }
    condition = {
      ...condition,
      where,
    }
    return await Article.find({ ...condition });
  }

  // 文章审核
  async auditArticle(params) {
    const article = await Article.findOne({ where: { id: params.articleId } })
    let response = {
      status: 0,
      data: "",
      model: {}
    }

    console.log('params', params)
    if (!_.isEmpty(article)) {
      article.audit = params.audit;
      article.auditCause = params.cause;
      let updateResponse = await Article.save(article)
      console.log('response', updateResponse)
      if (!_.isEmpty(updateResponse)) {
        return response;
      } else {
        response.status = 1;
        return response;
      }
    }
    response.status = 2;
    response.data = '文章不存在'
    return response;
  }

  async loadAllArticlesForUser(id) {
    return await Article.find({ userId: id })
  }

  async addClassify(data, id) {
    if (!_.isEmpty(data.course)) {
      const classifyForUser = await Classify.find({
        where: { userId: data.userId },
      });
      if (classifyForUser) {
        let course = _.filter(classifyForUser, function (o) { return _.eq(o.name, data.course); });
        if (course && !_.isEmpty(course)) {
          this.pushClassify(data, course, id)
        } else {
          this.addNewClassify(data, id)
        }
      }
      // console.log('classify', classify)
    }

  }

  async pushClassify(data, course, id) {
    let detailData = { name: data.articleTitle, id: id };
    course = course[0];
    let detail = JSON.parse(course.detail);
    detail.push(detailData)
    course.detail = JSON.stringify(detail)
    await Classify.save(_.pickBy({
      ...course
    }), { where: { userId: data.userId, name: course.name } });
  }

  async addNewClassify(data, id) {
    let newDetail = [{ id: id, name: data.articleTitle }];
    let classifyData = {
      userId: data.userId,
      name: data.course,
      detail: JSON.stringify(newDetail)
    }
    await Classify.save(_.pickBy({
      ...classifyData
    }));
  }

  // 添加文章
  async createArticle(data) {
    if (data.label && !_.isEmpty(data.label)) {
      data.label = JSON.stringify(data.label)
    }
    //添加分类

    const item = await Article.save(_.pickBy({
      ...data
    }))
    console.log('....................', item)
    this.addClassify(data, item.id)
    return item;
  }

  // 添加文章查看次数
  async addWatchCount(id) {
    const article = await Article.findOne({id})
    article.articlePageView += 1
    let data = await Article.save(article)
    return { articlePageView: article.articlePageView };
  }

  // 点赞 1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表  type:1添加 2:减
  async addPraiseCount(id, flag, type) {

    const article = await Article.findOne({id})
    if (type == 1) {//1：点赞  2：取消点赞
      switch (flag) {
        case 1: article.articlePraiseCount += 1
          break;
        case 2: article.articleDislikeCount += 1
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
      }
    } else {
      switch (flag) {
        case 1: Number(article.articlePraiseCount) >= 0 ? article.articlePraiseCount -= 1 : ''
          break;
        case 2: Number(article.articleDislikeCount) >= 0 ? article.articleDislikeCount -= 1 : ''
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
      }
    }

    let data = await Article.save(article)
    return { id: article.id };
  }

}

module.exports = UserConnector;

