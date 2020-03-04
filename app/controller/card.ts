import BaseController from '../core/BaseController';

export default class CardController extends BaseController {

     public async loadCard() {
        //  console.log('loadCard')
        const { ctx } = this;
        let data = await ctx.service.card.loadCard();
        // console.log('data',data)
        this.success({ data})
    }
}
