import * as constants from '../extend/Constant';

module.exports = app => {
    let { validator } = app;

    // 登陆注册 校验用户名是否正确
    validator.addRule(constants.VALIDATE_ARTICLE_TITLE, (_rule: any, value: string | any[]) => {
        if (value.length==0) {
            return "文章标题不能为空";
        }
    });
    validator.addRule(constants.VALIDATE_ARTICLE_CONTENT, (_rule: any, value: string | any[]) => {
        if (value.length==0) {
            return "文章内容不能为空";
        }
    });
};