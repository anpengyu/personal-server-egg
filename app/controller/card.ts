import BaseController from '../core/BaseController';

export default class CardController extends BaseController {

     public async loadCard() {
        const { ctx } = this;
        ctx.body = await ctx.service.card.loadCard();
    }
}
