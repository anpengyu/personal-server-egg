import BaseController from '../core/BaseController';
import * as constants from './../extend/Constant';
const _ = require('lodash');
export default class UserController extends BaseController {

    public async register() {
        const { ctx } = this;
        const { password, repassword } = this.params;
        try {
            ctx.validate({
                username: { type: constants.VALIDATE_USERNAME, },
                password: { type: constants.VALIDATE_PASSWORD },
                repassword: { type: constants.VALIDATE_RE_PASSWORD }
            });
            if (!_.eq(password, repassword)) {
                throw ({ errors: [{ message: '两次密码不一致' }] })
            }
        } catch (err) {
            this.failure({ state: 422, msg: err.errors[0].message });
            return;
        }
        let data = await this.ctx.service.user.register(this.params);
        if (!_.isEmpty(data)) {
            this.success({ data: '注册成功~' })
        } else {
            this.failure({ state: 423, msg: '用户已存在~' })
        }
    }

    public async login() {
        const { ctx } = this;
        try {
            ctx.validate({
                username: { type: constants.VALIDATE_USERNAME, },
                password: { type: constants.VALIDATE_PASSWORD }
            });
        } catch (err) {
            this.failure({ state: 422, msg: err.errors[0].message });
            return;
        }
        let data: any = await this.ctx.service.user.login(this.params);
        if (data.state != 0) {
            this.failure({ state: data.state, msg: data.msg })
        } else {
            this.success({ data: data })
        }
    }

    public async logout() {

        this.success({ data: "logout ok" })
    }

    public async findPsw() {

        this.success({ data: "findPsw ok" })
    }
}
