import { Service } from 'egg';
// let _ = require('lodash');

/**
 * work Service
 */
export default class BaseService extends Service {
    paramsData: any = {};
    params: any = '';
    offset: number = 0;
    limit: number = 10;
    constructor(request: any) {
        super(request);
        const { ctx } = this;
        this.params = ctx.query;
        this.offset = ((Number(this.params.pageNum) - 1) * Number(this.params.pageSize)) || 0;
        this.limit = Number(this.params.pageSize) || 10;
    }

}
