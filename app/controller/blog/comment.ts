import BaseController from '../../core/BaseController';
// let _ = require('lodash');

export default class CommentController extends BaseController {

    // 获取文章评论
    async loadComment() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

    // 删除文章评论
    async deleteComment() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

    //添加评论
    async addComment() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

    //点赞、取消点赞
    async praise() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

}
