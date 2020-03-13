import BaseService from '../core/BaseService';
import User from '../model/User';
import { getRepository,getManager } from 'typeorm';
import { KEYS } from '../extend/Constant';
import helper from '../extend/helper';
const _ = require('lodash');
const jwt = require('jsonwebtoken')

export default class AccountService extends BaseService {

    private userRepository = getRepository(User);

    public async register(data: any) {
        let userModel = await User.findOne({ username: data.username });
        if (_.isEmpty(userModel)) {
            let user = _.assign(new User(),data);
            user.hashPassword();
            return await User.save(user);
        } else {
            return {};
        }
    }

    public async login(data: any) {
        let userModel: any = await this.userRepository.findOne({ username: data.username });
        if (_.isEmpty(userModel)) {
            return { state: 422, msg: '用户不存在' };
        }
        const entityManager = getManager(); // 你也可以通过 getConnection().manager 获取
        const user = await entityManager.findOne(User);
        let validatPassword = await user?.validatPassword(data.password)
        if (!validatPassword) {
            return { state: 422, msg: '密码错误' };
        }
        let loginTime = helper.currentDate();
        let token = jwt.sign({
            id: userModel.id,
            username: userModel.username,
            loginTime
        }, KEYS)
        this.app.redis.set(token, userModel.id);
        this.app.redis.set('loginTime', loginTime)
        return { state: 0, token };
    }
}
