import { Service } from 'egg';
import { getConnection } from 'typeorm';
let _ = require('lodash');

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

    //分页
    public async loadPagination(params: any) {
        let sql = '';
        if (_.isEmpty(params)) {
            sql = `select count(1) as count from work`;
        } else {
            sql = `select count(1) as count from work where`;
            params.map((item: any) => {
                for (let i in item) {
                    if (!_.isEmpty(item[i])) {
                        sql += ` ${i} = '${item[i]}' and`;
                    }
                }
            })
            if (sql.slice(sql.length - 3, sql.length) == 'and') {
                sql = sql.slice(0, sql.length - 3);
            }
        }
        const totalCountSql = await getConnection().query(sql);
        const pageSize = this.params.pageSize || 10;
        const totalCount = totalCountSql[0].count;
        const pagination = {
            page: this.params.pageNum,
            perPage: this.params.pageSize,
            totalCount,
            totalPage: Math.floor((totalCount - 1) / pageSize) + 1,
        };
        return pagination;
    }

}
