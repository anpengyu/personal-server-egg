// import * as constants from '../extend/Constant';
const _ = require('lodash');


const addArticleValidate = (ctx) => {
    try {
        ctx.validate({
            articleTitle: { type: 'string'},
            articleContent: { type: 'string'}
        });
    } catch (err) {
        let msg = '';
        if (_.eq('missing_field', err.errors[0].code)) {
            switch (err.errors[0].field) {
                case 'articleTitle':
                    msg = '文章名称不能为空'
                    break;
                case 'articleContent':
                    msg = '文章内容不能为空'
                    break;
            }
        }
        return { msg: msg || err.errors[0].message };
    }
}

export default {
    addArticleValidate
}