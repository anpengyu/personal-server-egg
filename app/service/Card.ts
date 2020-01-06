import BaseService from '../core/BaseService';
import { getRepository } from 'typeorm';
import Card from '../model/Card';

/**
 * work Service
 */
export default class CardService extends BaseService {

    public async loadCard() {
        const cardRepository = getRepository(Card);
        let CardModel = await cardRepository.find()
        return CardModel;
    }
}
