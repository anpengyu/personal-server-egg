import BaseController from '../../core/BaseController';
// let _ = require('lodash');

export default class CollectController extends BaseController {

    // 收藏夹
    async favorite() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

    // 收藏、取消收藏
    async collectArticle() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

    // 收藏列表
    async collectList() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

}
