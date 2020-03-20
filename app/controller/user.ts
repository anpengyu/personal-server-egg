import BaseController from '../core/BaseController';
// import * as constants from './../extend/Constant';
const _ = require('lodash');
import userValidate from '../validate/userValidate';

export default class UserController extends BaseController {

    async register() {
        const { ctx } = this;
        let err: any = userValidate.registerValidate(ctx, this.params);
        if (!_.isEmpty(err)) {
            this.failure({ state: 422, msg: err });
            return;
        }
        let data = await this.ctx.service.user.register(this.params);
        if (!_.isEmpty(data)) {
            this.success({ data: '注册成功~' })
        } else {
            this.failure({ state: 422, msg: '用户已存在~' })
        }
    }

    async login() {
        const { ctx } = this;
        console.log('.....................',this.params)
        let err: any = userValidate.loginValidate(ctx);

        console.log('err',err)
        if (!_.isEmpty(err)) {
            this.failure({ state: 422, msg:err.msg });
            return;
        }
        let data: any = await this.ctx.service.user.login(this.params);
        if (data.state != 0) {
            this.failure({ state: data.state, msg: data.msg })
        } else {
            this.success({ data: data })
        }
    }

    async logout() {
        const { app  } = this;
        console.log('this.ctx',this.ctx)
        const userId = await app.redis.get(this.token)
        this.app.redis.set(this.token,'');
        this.app.redis.set(userId + 'loginTime', '')
        this.success({ data: "退出登录成功" })
    }

    async findPsw() {

        this.success({ data: "findPsw ok" })
    }

    async userInfo() {

        this.success({ data: "用户信息" })
    }
}
