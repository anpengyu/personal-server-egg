import * as constants from './../extend/Constant';
import helper from './../extend/helper';

module.exports = app => {
    let { validator } = app;

    // 登陆注册 校验用户名是否正确
    validator.addRule(constants.VALIDATE_USERNAME, (_rule: any, value: string | any[]) => {
        if (value.length < 6 || value.length > 12) {
            return "用户名的长度应该在6-10之间";
        }
    });
    validator.addRule(constants.VALIDATE_PASSWORD, (_rule: any, value: string | any[]) => {
        console.log('ssssss',_rule)
        if (value.length < 6 || value.length > 12) {
            return "密码的长度应该在6-10之间";
        }
    });
    validator.addRule(constants.VALIDATE_RE_PASSWORD, (_rule: any, value: string | any[]) => {
        if (value.length < 6 || value.length > 12) {
            return "确认密码的长度应该在6-10之间";
        }
    });
    validator.addRule(constants.VALIDATE_PHONE, (_rule: any, value: string | any[]) => {
        if (value.length == 11) {
            let isPhone = helper.isPoneAvailable(value);
            if (!isPhone) {
                return '请输入有效的手机号码';
            }
        } else {
            return "手机号码必须为11位";
        }
    });
};