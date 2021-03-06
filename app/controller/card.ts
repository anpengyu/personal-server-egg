import BaseController from '../core/BaseController';
const _ = require('lodash');
export default class CardController extends BaseController {

    public async loadCard() {
        const { ctx, app } = this;
        const userId = await app.redis.get(this.token)
        let data = await ctx.service.card.loadCard(userId);
        if (!_.isEmpty(data)) {
            this.success({ data })
        } else {
            this.failure({ state: 422, msg: '用户名已存在' });
        }
    }

}
