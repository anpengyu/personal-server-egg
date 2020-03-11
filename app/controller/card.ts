import BaseController from '../core/BaseController';

export default class CardController extends BaseController {

    public async loadCard() {
        const { ctx,app } = this;
        const userId = await app.redis.get(this.token)
        let data = await ctx.service.card.loadCard(userId);
        this.success({ data })
    }
}
