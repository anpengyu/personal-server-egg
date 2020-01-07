import BaseController from '../core/BaseController';

export default class HomeController extends BaseController {
    //获取项目类型
    public async loadWorkType() {
        const { ctx } = this;
        let data = await ctx.service.work.loadWorkType();
        this.success({ data })
    }

    //根据项目类型id获取项目名称
    public async loadWorkNames() {
        const { ctx } = this;
        let data = await ctx.service.work.loadWorkName(this.params.id);
        this.success({ data });
    }

    public async loadWorks() {
        const { ctx } = this;
        let data = await ctx.service.work.loadWorks(this.params);
        this.success({ data })
    }

    public async addWorks() {
        const { ctx } = this;
        let data = await ctx.service.work.addWorks(this.params);
        this.success({ data })
    }
}
