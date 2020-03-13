import { KEYS } from '../extend/Constant';
const _ = require('lodash');
const jwt = require('jsonwebtoken')

export default function Authentication(app) {
    return async (ctx, next) => {
        const token = ctx.request.header.authorization;
        return jwt.verify(token, KEYS, async (err, decoded) => {
            console.log('err', token)
            let loginTime = await app.redis.get(decoded.id + 'loginTime');
            if (err || _.isEmpty(loginTime)) {
                ctx.helper.notLogin(ctx);
                return false;
            } else if (!_.eq(loginTime, decoded.loginTime)) {
                ctx.helper.tokenExpired(ctx);
                return false;
            } else {
                await next();
                return true;
            }
        })
    };
}