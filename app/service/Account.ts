import BaseService from '../core/BaseService';
import { getRepository } from 'typeorm';
import Account from '../model/Account';
import AccountTitle from '../model/AccountTitle';
import AccountType from '../model/AccountType';


/**
 * work Service
 */
export default class AccountService extends BaseService {

    public async loadAccount() {
        const accountRepository = getRepository(Account);
        let AccountModel = await accountRepository.find()
        return AccountModel;
    }

    public async loadAccountTitle(params:any) {
        this.paramsData.parentId = params.parentId;
        const accountTitleRepository = getRepository(AccountTitle);
        let AccountTitleModel = await accountTitleRepository.find(this.paramsData)
        return AccountTitleModel;
    }

    public async loadAccountType() {
        const accountTypeRepository = getRepository(AccountType);
        let AccountTypeModel = await accountTypeRepository.find()
        return AccountTypeModel;
    }
}
