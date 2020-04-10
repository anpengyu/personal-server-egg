const jwt = require('jsonwebtoken')

module.exports =() => {
  return async function auth(ctx, next) {
    if (ctx.app.config.graphql.graphiql) {
      await next()
      return
    }
    const body = ctx.request.body
    console.log('body',body.operationName)
    if (body.operationName !== 'createArticle') {
      let token = ctx.request.header['authorization']
      console.log('token',token)
      if (token === undefined) {
        ctx.body = {message: '令牌为空，请登陆获取！'}
        ctx.status = 401
        return
      }
      // token = token.replace(/^Bearer\s/, '')
      token = 'abcdefg'
      try {
        // let decoded = jwt.verify(token, ctx.app.config.jwt.jwtSecret, {
        //   expiresIn: ctx.app.config.jwt.jwtExpire
        // })
        await next()
      } catch (err) {
        ctx.body = {message: '访问令牌鉴权无效，请重新登陆获取！'}
        ctx.status = 401
      }
    } else {
      await next()
    }
  }
}
