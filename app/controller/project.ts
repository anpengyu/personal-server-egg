import BaseController from '../core/BaseController';

export default class ProjectController extends BaseController {

     public async loadProject() {
        const { ctx } = this;
        ctx.body = await ctx.service.project.loadProject();
    }
}
