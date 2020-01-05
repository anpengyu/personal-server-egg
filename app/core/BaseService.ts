import { Service } from 'egg';
// let _ = require('lodash');

/**
 * work Service
 */
export default class BaseService extends Service {
    paramsData: any = {};
    params: any = '';
    constructor(params: any) {
        super(params);
        const { ctx } = this;
        this.params = ctx.query;
        // this.paramsData = {
        //     skip: !_.isEmpty(this.params.pageNum) ? (this.params.pageNum * this.params.pageSize) : 0, 
        //     take: !_.isEmpty(this.params.pageSize) ? this.params.pageSize : 5,
        // };
    }

}
