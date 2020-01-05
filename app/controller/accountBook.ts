import BaseController from '../core/BaseController';

export default class AccountBookController extends BaseController {

     public async loadAccountBook() {
        const { ctx } = this;
        ctx.body = await ctx.service.accountBook.loadAccountBook();
    }

    public async loadAccountBookType() {
        const { ctx } = this;
        ctx.body = await ctx.service.accountBook.loadAccountBookType();
    }

    public async loadAccountBookTypeDetail() {
        const { ctx } = this;
        ctx.body = await ctx.service.accountBook.loadAccountBookDetail();
    }
}
