import BaseController from '../core/BaseController';
import * as constants from './../extend/Constant';
const _ = require('lodash');
export default class UserController extends BaseController {

    public async register() {
        const { ctx } = this;
        const { password, repassword } = this.params;
        try {
            ctx.validate({
                userName: { type: constants.VALIDATE_PHONE, },
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
        let data = await this.ctx.service.user.register();
        this.success({ data })


    }

    public async login() {

        this.success({ data: "login ok" })
    }

    public async logout() {

        this.success({ data: "logout ok" })
    }

    public async findPsw() {

        this.success({ data: "findPsw ok" })
    }
}
