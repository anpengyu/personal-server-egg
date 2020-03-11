import BaseController from '../core/BaseController';

export default class HomeController extends BaseController {
    //获取项目类型
    public async loadWorkType() {
        const { ctx } = this;
      
        let typeData = await ctx.service.work.loadWorkType();
        let count = await ctx.service.work.loadCountForFlag();
        let data = {
            typeData,
            count
        };
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
        let params = [
            { type: this.params.type },
            { flag: this.params.flag }
        ]
        let data = await ctx.service.work.loadWorks(params);
        let pagination = await ctx.service.work.loadPagination(params);
        this.success({ data, pagination })
    }

    public async addWorks() {
        const { ctx } = this;
        let data = await ctx.service.work.addWorks(this.params);
        this.success({ data })
    }

    public async deleteWork() {
        const { ctx } = this;
        let data = await ctx.service.work.delWork(this.params.id);
        if(data){
            this.success({ data })
        }
    }
}
