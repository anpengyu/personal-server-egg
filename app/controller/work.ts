import BaseController from '../core/BaseController';

export default class HomeController extends BaseController {
    //获取项目类型
    public async loadWorkType() {
        const { ctx } = this;
        ctx.body = await ctx.service.work.loadWorkType();
    }

    //根据项目类型id获取项目名称
    public async loadWorkNames() {
        const { ctx } = this;
        ctx.body = await ctx.service.work.loadWorkName(this.params.id);
    }

     //根据项目类型id获取项目名称
     public async loadWorks() {
        const { ctx } = this;
        ctx.body = await ctx.service.work.loadWorks(this.params);
    }
}
