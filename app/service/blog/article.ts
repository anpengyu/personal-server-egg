import BaseService from '../../core/BaseService';
import Article from '../../entity/blog/Article';
// import { getRepository } from 'typeorm';
let _ = require('lodash');
// let moment =require( 'moment');
// 博客文章
export default class ArticleService extends BaseService {

    async loadNewArticle() {
        //        let data = moment().format(); 
        // console.log('data',data)
        // let { current, pageSize } = this.params;
        // return await Article.find({
        //     order: { createDate: 'DESC' },
        //     take: pageSize || 10,
        //     skip: (current - 1) * pageSize,
        // })
return '';
 
    }
    async loadArticleDetail(id:number) {
        return await Article.findOne(id)
    }
    
    async loadHotArticle() {
        // let { current, pageSize } = this.params;
        // return await Article.find({
        //     order: { articlePraiseCount: 'DESC' },
        //     take: pageSize || 10,
        //     skip: (current - 1) * pageSize,
        // })
        return '';
    }

    public async addArticle(params: any) {
        let article = new Article();
        let articleTitle = params.articleTitle;
        let isExist = await Article.find({ articleTitle })
        if (!_.isEmpty(isExist)) {
            return {}
        } else {
            article.userId = params.userId;
            article.articleTitle = params.articleTitle;
            article.articleContent = params.articleContent;
            article.articleSubTitle = params.articleSubtitle;
            // article.user = this.currentUser;
            await article.save();
            return {state:0};
        }
    }


    public async loadOwnArticle() {
        // let { current, pageSize } = params;
        // let data = await Article.find({
        //     // where: {
        //     //     user: this.currentUser,
        //     // },
        //     order: { createDate: 'DESC' },
        //     take: pageSize || 10,
        //     skip: (current - 1) * pageSize,
        // });
        // return data;
        return '';
    }

    async deleteArticle(id: number) {
        let article = await Article.findOne({ id })
        if (id == this.currentUser.id) {
            return await article?.remove();
        } else {
            return {}
        }


    }
}
