import { KEYS } from '../extend/Constant';

const jwt = require('jsonwebtoken')

export default function Authentication() {
    return async (ctx, next) => {
        const token = ctx.request.header.authorization;
        return jwt.verify(token, KEYS, async (err) => {
            if (err) {
                ctx.helper.notLogin(ctx);
                return false;
            } else {
                await next();
                return true;
            }
        })


    };
}