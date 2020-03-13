import BaseService from '../core/BaseService';
import { getRepository } from 'typeorm';
import Card from '../model/Card';

/**
 * work Service
 */
export default class CardService extends BaseService {

    public async loadCard(userId) {
        console.log(userId)
        const cardRepository = getRepository(Card);
        let CardModel = await cardRepository.find()
        return CardModel;
        // let fullName = user.map(item => item.fullName())
        // console.log('sum', _.sum(fullName))

        // const impoRepository = getRepository(ImportantDays);
        // impoRepository.update("92a1f0f9-b664-44fe-869a-7d2798019aae",data)
    }
}
