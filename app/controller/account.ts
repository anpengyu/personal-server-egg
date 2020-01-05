import BaseController from '../core/BaseController';
let _ = require('lodash');

export default class AccountController extends BaseController {

     public async loadAccount() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccount();
    }

    public async loadAccountTitle() {
        const { ctx } = this;
        if(_.isEmpty(this.params.parentId)){
            this.failure({msg: '参数缺失', state: 401 });
        }else{
            let data = await ctx.service.account.loadAccountTitle(this.params);
            this.success({data});
        }
    }

    public async loadAccountType() {
        const { ctx } = this;
        ctx.body = await ctx.service.account.loadAccountType();
    }
}
