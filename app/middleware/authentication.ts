import { KEYS } from '../extend/Constant';
import User from '../entity/User';
const _ = require('lodash');
const jwt = require('jsonwebtoken')

export default function Authentication(app) {
    return async (ctx, next) => {
        const token = ctx.request.header.authorization;
        return jwt.verify(token, KEYS, async (err, decoded) => {
            let loginTime = await app.redis.get(decoded && decoded.id + 'loginTime');
            if (err || _.isEmpty(loginTime)) {
                ctx.helper.notLogin(ctx);
                return false;
            } else if (!_.eq(loginTime, decoded.loginTime)) {
                ctx.helper.tokenExpired(ctx);
                return false;
            } else {
                const user = await User.findOne(decoded.id);
                ctx.req.currentUser = user;
                await next(app);
                return true;
            }
        })
    };
}