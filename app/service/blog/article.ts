import BaseService from '../../core/BaseService';
import Article from '../../model/blog/article';

// 博客文章
export default class ArticleService extends BaseService {

    public async addArticle(params: any) {
        let currentUser = this.ctx.req['currentUser']
        let article = new Article();
        article.articleTitle = params.articleTitle;
        article.articleContent = params.articleContent;
        article.user = currentUser;
        article.save();
        return { statu: 0 };
    }


    public async loadOwnArticle(params: any) {
        console.log(params)
        // let currentUser = this.ctx.req['currentUser']
        // let article = new Article();
        let data = await Article.find();
        return data;
    }
}
