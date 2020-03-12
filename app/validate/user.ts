import * as constants from './../extend/Constant';

module.exports = app => {
    let { validator } = app;

    // 登陆注册 校验用户名是否正确
    validator.addRule(constants.VALIDATE_USERNAME, (_rule: any,value: string | any[]) => {
        if (value.length < 6 || value.length > 12) {
            return "用户名的长度应该在6-10之间";
        }
    });
    validator.addRule(constants.VALIDATE_PASSWORD, ( _rule: any,value: string | any[]) => {
        if (value.length < 6 || value.length > 12) {
            return "密码的长度应该在6-10之间";
        }
    });
    validator.addRule(constants.VALIDATE_RE_PASSWORD,( _rule: any,value: string | any[]) => {
        if (value.length < 6 || value.length > 12) {
            return "确认密码的长度应该在6-10之间";
        }
    });
};