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
                repassword: { type: constants.VALIDATE_RE_PASSWORD },
                phone: { type: constants.VALIDATE_PHONE }
            });
            if (!_.eq(password, repassword)) {
                throw ({ errors: [{ message: '两次密码不一致' }] })
            }
        } catch (err) {
            let msg = '';
            if (_.eq('missing_field', err.errors[0].code)) {
                switch (err.errors[0].field) {
                    case 'username':
                        msg = '用户名不能为空'
                        break;
                    case 'password':
                        msg = '密码不能为空'
                        break;
                    case 'repassword':
                        msg = '确认密码不能为空'
                        break;
                    case 'phone':
                        msg = '手机号码不能为空'
                        break;
                }
            }
            this.failure({ state: 422, msg: msg || err.errors[0].message });
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
            let msg = '';
            if (_.eq('missing_field', err.errors[0].code)) {
                switch (err.errors[0].field) {
                    case 'username':
                        msg = '用户名不能为空'
                        break;
                    case 'password':
                        msg = '密码不能为空'
                        break;
                }
            }

            console.log('error2', err)
            this.failure({ state: 422, msg: msg || err.errors[0].message });
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
