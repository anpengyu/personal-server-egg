import * as constants from '../extend/Constant';
const _ = require('lodash');

const registerValidate = (ctx, params) => {
    try {
        ctx.validate({
            username: { type: constants.VALIDATE_USERNAME, },
            password: { type: constants.VALIDATE_PASSWORD },
            repassword: { type: constants.VALIDATE_RE_PASSWORD },
            phone: { type: constants.VALIDATE_PHONE }
        });
        if (!_.eq(params.password, params.repassword)) {
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
        return { msg: msg || err.errors[0].message };
    }
}

const loginValidate = (ctx) => {
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
        return { msg: msg || err.errors[0].message };
    }
}

export default {
    registerValidate,
    loginValidate
}