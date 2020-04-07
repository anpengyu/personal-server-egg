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
        let data = await this.article.loadNewArticle();
        this.success({ data })
    }
    //文章详情
    async loadArticleDetail() {
        let data = await this.article.loadArticleDetail(this.params.id);
        this.success({ data })
    }
    
    // 获取热门文章
    async loadHotArticle() {
        let data = await this.article.loadHotArticle();
        this.success({ data })
    }

    //获取自己的文章
    async loadOwnArticle() {
        // const { ctx } = this;
        // let data = await this.article.loadOwnArticle(this.params);
        // this.success({ data })
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
        if (_.isEmpty(data)) {
            this.failure({ state: 422, msg: '文章标题重复，请修改标题~' });
        } else {
            this.success({ data })
        }
    }

    //删除文章
    async deleteArticle() {
        let data = await this.article.deleteArticle(this.params.id);
        if (!_.isEmpty(data)) {
            this.success({ data })
        } else {
            this.failure({ state: 422, msg:'只能删除自己的帖子'});
        }
    }
}
