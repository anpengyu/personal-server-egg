'use strict';

const DataLoader = require('dataloader');
const _ = require('lodash');
class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
    this.proxy = ctx.app.model.Article;
    this.classifyProxy = ctx.app.model.Classify;
  }

  fetch(ids) {
    const users = this.ctx.app.model.Article.findAll({
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

  // 获取所有文章
  async loadAllArticles(params) {
    console.log('params', params)
    let audit = params.audit;
    let articleTitle = params.articleTitle;
    let username = params.username;
    let updated_at = params.updated_at;
    let course = params.course;
    let label = params.label;

    let condition = {
      // limit: 10, offset: 0,
      order: [["created_at", "desc"]]
    }
    if (!_.isEmpty(audit)&&audit != 4) {
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
      const user = await this.ctx.app.model.User.findOne({
        where: {
          username: params.username
        }
      });
      where = {
        ...where,
        userId: user && user.id || 0,
      }
    }
    if (!_.isEmpty(updated_at)) {
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
    var objs = Object.keys(where)
    console.log(objs)

    condition = {
      ...condition,
      where,
    }
    console.log('condition', condition)
    // let d = await this.ctx.app.model.Article.findAndCountAll()

    // d.then(res=>  console.log('count', res))
  
    const articles = this.ctx.app.model.Article.findAll({
      ...condition
    }).then(us =>
      us.map(u => u.toJSON())
    );
    return articles;
  }

  // 文章审核
  async auditArticle(params) {
    const article = await this.ctx.app.model.Article.findOne({
      where: {
        id: params.articleId
      }
    }).then(res => res && res.toJSON());
    let response = {
      status: 0,
      data: "",
      model: {}
    }
    console.log('params', params)
    if (!_.isEmpty(article)) {
      article.audit = params.audit;
      article.auditCause = params.cause;
      console.log('article', article)
      let Updateresponse = await this.proxy.update(article, {
        where: {
          id: params.articleId
        },
      });
      console.log('response', Updateresponse)
      if (Updateresponse[0] == 1) {
        response.model = article;
        return response;
      } else {
        response.status = 1;
      }
    }
    response.status = 2;
    response.data = '文章不存在'
    return response;

  }

  loadAllArticlesForUser(id) {
    const articles = this.ctx.app.model.Article.findAll({
      where: {
        userId: id
      },
    }).then(us =>
      us.map(u => u.toJSON())
    );
    return articles;
  }

  async addClassify(data, id) {
    if (!_.isEmpty(data.course)) {
      const classifyForUser = await this.classifyProxy.findAll({
        where: { userId: data.userId },
      }).then(us =>
        us.map(u => u.toJSON())
      );
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
    await this.classifyProxy.update(_.pickBy({
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
    await this.classifyProxy.create(_.pickBy({
      ...classifyData
    }));
  }

  // 添加文章
  async createArticle(data) {
    if (data.label && !_.isEmpty(data.label)) {
      data.label = JSON.stringify(data.label)
    }
    //添加分类

    const item = await this.proxy.create(_.pickBy({
      ...data
    })).then(us => !_.isEmpty(us) && us.toJSON());
    console.log('....................', item)

    this.addClassify(data, item.id)

    return item;
  }

  // 添加文章查看次数
  async addWatchCount(id) {
    const article = await this.loader.load(id);
    article.articlePageView += 1
    let data = await this.ctx.app.model.Article.update(article, {
      where: {
        id: id
      },
    })
    return { articlePageView: article.articlePageView };
  }

  // 点赞 1:点赞列表 2:收藏列表 3:浏览记录 4:关注的作者 5:评论列表 6:文章列表  type:1添加 2:减
  async addPraiseCount(id, flag, type) {

    const article = await this.loader.load(id);
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

    let data = await this.ctx.app.model.Article.update(article, {
      where: {
        id: id
      },
    })
    return { id: article.id };
  }

}

module.exports = UserConnector;

