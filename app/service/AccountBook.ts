import BaseService from '../core/BaseService';
import { getRepository } from 'typeorm';
import AccountBookType from '../model/AccountBookType';
import AccountBook from '../model/AccountBook';
import AccountBookTypeDetail from '../model/AccountBookTypeDetail';
/**
 * work Service
 */
export default class AccountBookService extends BaseService {

    public async loadAccountBook() {
        const accountBookRepository = getRepository(AccountBook);
        let AccountBookModel = await accountBookRepository.find()
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
