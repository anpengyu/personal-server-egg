
export default class BaseConnector {
    constructor(ctx) {
        console.log('token...',ctx.request.header.authorization)
    }
}