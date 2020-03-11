import BaseController from '../core/BaseController';
const _ = require('lodash');
export default class AccountBookController extends BaseController {

    public async loadAccountBook() {
        const { ctx, app } = this;
        const userid = await app.redis.get(this.token)
        ctx.body = await ctx.service.accountBook.loadAccountBook(userid,this.params);
    }

    public async addAccountBook() {
        const { ctx, app } = this;
        const userid = await app.redis.get(this.token)
        if (_.isEmpty(this.params.money)) {
            this.failure({ state: 424, msg: '参数不能为空' });
            return;
        }
        let data = await ctx.service.accountBook.addAccountBook(this.params,userid);
        this.success({data})
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
