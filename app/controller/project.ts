import BaseController from '../core/BaseController';

export default class ProjectController extends BaseController {

     public async loadProject() {
        const { ctx } = this;
        let data = await ctx.service.project.loadProject();
        this.success({data})
    }
}
