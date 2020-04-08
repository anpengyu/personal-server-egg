import { KEYS } from '../extend/Constant';
// import User from '../entity/User';
const _ = require('lodash');
const jwt = require('jsonwebtoken')

export default function Authentication() {
    return async (ctx, next) => {
        let token = ctx.request.header.authorization;
        if(_.eq(token,'login')){
            await next();
            return;
        }
        return jwt.verify(token, KEYS, async (err, decoded) => {
            let loginTime = await ctx.app.redis.get(decoded && decoded.id + 'loginTime');
            if (err || _.isEmpty(loginTime)) {
                ctx.helper.notLogin(ctx);
                return;
            } else if (!_.eq(loginTime, decoded.loginTime)) {
                ctx.helper.tokenExpired(ctx);
                return;
            } else {
                await next();
                return;
            }
        })
    }
}