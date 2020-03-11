import BaseService from '../core/BaseService';
import User from '../model/User';
import { getRepository } from 'typeorm';
import { KEYS } from '../extend/Constant';
import helper from '../extend/helper';
const _ = require('lodash');
const jwt = require('jsonwebtoken')

export default class AccountService extends BaseService {

    public async register(data: any) {
        const userRepository = getRepository(User);
        let userModel = await userRepository.findOne({ username: data.username });
        if (_.isEmpty(userModel)) {
            return await userRepository.save(data);
        } else {
            return userModel;
        }
    }

    public async login(data: any) {
        const userRepository = getRepository(User);
        let userModel: any = await userRepository.findOne({ username: data.username });
        if (_.isEmpty(userModel)) {
            return { state: 423, msg: '用户不存在' };
        }
        console.log(userModel, userModel.password, data.password)
        if (!_.eq(userModel.password, data.password)) {
            return { state: 424, msg: '密码错误' };
        }
        let loginTime = helper.currentDate();
        let token = jwt.sign({
            id: userModel.id,
            username: userModel.username,
            loginTime
        }, KEYS)
        this.app.redis.set(token, userModel.id);
        this.app.redis.set('loginTime',loginTime)
        return { state: 0, token };
    }
}
