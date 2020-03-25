import BaseService from '../core/BaseService';
import { getRepository } from 'typeorm';
import AccountBookType from '../model/AccountBookType';
import AccountBook from '../model/AccountBook';
import AccountBookTypeDetail from '../model/AccountBookTypeDetail';


/**
 * work Service
 */
export default class AccountBookService extends BaseService {

    public async loadAccountBook(userid: any,params:any) {
        console.log('params',params)
        const accountBookRepository = getRepository(AccountBook);
        let AccountBookModel = await accountBookRepository.find({ userid })
        return AccountBookModel;
    }

    public async addAccountBook(params: any, userid: any) {
    
        const accountBookRepository = getRepository(AccountBook);
        let data = {
            ...params,
            userid
        }
        let AccountBookModel = await accountBookRepository.save(data)
        return AccountBookModel;
    }


    public async loadAccountBookType() {
        const accountBookTypeRepository = getRepository(AccountBookType);
        let AccountBookTypeModel = await accountBookTypeRepository.find()
        return AccountBookTypeModel;
    }

    public async loadAccountBookDetail() {
        const accountBookTypeDetailRepository = getRepository(AccountBookTypeDetail);
        let AccountBookTypeDetailModel = await accountBookTypeDetailRepository.find()
        return AccountBookTypeDetailModel;
    }
}
