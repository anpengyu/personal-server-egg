import BaseService from '../../core/BaseService';
import Article from '../../model/blog/article';
// import { getRepository } from 'typeorm';
let _ = require('lodash');
// 博客文章
export default class ArticleService extends BaseService {

    async loadNewArticle() {
        let { current, pageSize } = this.params;
        return await Article.find({
            order: { createDate: 'DESC' },
            take: pageSize || 10,
            skip: (current - 1) * pageSize,
        })
    }
    async loadArticleDetail(id:number) {
        return await Article.findOne(id)
    }
    
    async loadHotArticle() {
        let { current, pageSize } = this.params;
        return await Article.find({
            order: { articlePraiseCount: 'DESC' },
            take: pageSize || 10,
            skip: (current - 1) * pageSize,
        })
    }

    public async addArticle(params: any) {
        let article = new Article();
        let articleTitle = params.articleTitle;
        let isExist = await Article.find({ articleTitle })
        if (!_.isEmpty(isExist)) {
            return {}
        } else {
            article.articleTitle = params.articleTitle;
            article.articleContent = params.articleContent;
            article.user = this.currentUser;
            return await article.save();
        }
    }


    public async loadOwnArticle(params: any) {
        let { current, pageSize } = params;
        let data = await Article.find({
            where: {
                user: this.currentUser,
            },
            order: { createDate: 'DESC' },
            take: pageSize || 10,
            skip: (current - 1) * pageSize,
        });
        return data;
    }

    async deleteArticle(id: number) {
        let article = await Article.findOne({ id })
        if (article?.user.id == this.currentUser.id) {
            return await article?.remove();
        } else {
            return {}
        }


    }
}
