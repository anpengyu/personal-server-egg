import { VALIDATE_ARTICLE_TITLE, VALIDATE_ARTICLE_CONTENT } from '../extend/Constant';

// import * as constants from '../extend/Constant';
const _ = require('lodash');


const addArticleValidate = (ctx) => {
    try {
        ctx.validate({
            articleTitle: { type:VALIDATE_ARTICLE_TITLE},
            articleContent: { type: VALIDATE_ARTICLE_CONTENT}
        });
    } catch (err) {
        console.log('')
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