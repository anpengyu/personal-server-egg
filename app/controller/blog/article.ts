import BaseController from '../../core/BaseController';
import ArticleService from '../../service/blog/article';
import articleValidate from '../../validate/articleValidate';
let _ = require('lodash');

export default class ArticleController extends BaseController {
    article: ArticleService;
    constructor(params) {
        super(params)
        this.article = this.ctx.service.blog.article
    }

    // 获取最新文章
    async loadNewArticle() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

    // 获取热门文章
    async loadHotArticle() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

    //获取自己的文章
    async loadOwnArticle() {
        // const { ctx } = this;
        let data= await this.article.loadOwnArticle(this.params);
        this.success({data})
    }

    //添加文章
    async addArticle() {
        const { ctx } = this;
        let err: any = articleValidate.addArticleValidate(ctx);
        if (!_.isEmpty(err)) {
            this.failure({ state: 422, msg: err });
            return;
        }
        let data = await this.article.addArticle(this.params);
        this.success({data})
    }

    //删除文章
    async deleteArticle() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }
}
