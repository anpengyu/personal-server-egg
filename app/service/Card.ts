import BaseService from '../core/BaseService';
import { getRepository } from 'typeorm';
import Card from '../model/Card';
import ImportantDays from '../model/ImportantDays';
import { getManager } from "typeorm";
const _ = require('lodash');

/**
 * work Service
 */
export default class CardService extends BaseService {

    public async loadCard(userId) {
        console.log(userId)
        const cardRepository = getRepository(Card);
        let CardModel = await cardRepository.find({ userid: userId })
    

        const entityManager = getManager();
        const user = await entityManager.find(Card);
        let fullName = user.map(item=>item.fullName())
        console.log('sum',_.sum(fullName))

        let data = {
            title:'a',date:'a',
            mark:'a',icon:'a',
            cycle:'a',type:'a',bg:'b',
        }
        const impoRepository = getRepository(ImportantDays);
        // impoRepository.update("92a1f0f9-b664-44fe-869a-7d2798019aae",data)
        impoRepository.save(data);
        return CardModel;
    }
}
