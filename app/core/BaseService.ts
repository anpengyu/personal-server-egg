import { Service } from 'egg';
import { getConnection, getRepository } from 'typeorm';
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
        if(ctx.request.method=='GET'){
            this.params = ctx.query;
        }else{
            this.params = ctx.request.body
        }
        this.offset = _.isEmpty(this.params.pageNum) ? 0 : ((Number(this.params.pageNum) - 1) * (Number(this.params.pageSize) || 10))
        this.limit = Number(this.params.pageSize) || 10;
    }

    //获取分页每页条数、页数、总条数
    public async loadPagination(params: any) {
        let sql = '';
        if (_.isEmpty(params)) {
            sql = `select count(1) as count from work`;
        } else {
            sql = `select count(1) as count from work where`;
            params.map((item: any) => {
                let key = Object.keys(item)[0];
                if (!_.isEmpty(item[key])) {
                    sql += ` ${key} = '${item[key]}' and`;
                }
            })
            if (sql.slice(sql.length - 3, sql.length) == 'and') {
                sql = sql.slice(0, sql.length - 3);
            }
            if (sql.slice(sql.length - 5, sql.length) == 'where') {
                sql = sql.slice(0, sql.length - 5);
            }
        }
        const totalCountSql = await getConnection().query(sql);
        const pageSize = this.params.pageSize || 10;
        const totalCount = totalCountSql[0].count;
        const pagination = {
            page: this.params.pageNum || 1,
            perPage: pageSize,
            totalCount,
            totalPage: Math.floor((totalCount - 1) / pageSize) + 1,
        };
        return pagination;
    }

    /**
     * 拼接查询参数
     * @param params 参数
     * @param name 表
     */
    public queryBuilder(params: any, name: any) {
        const workRepository: any = getRepository(name);
        let workBuilder = workRepository.createQueryBuilder(`${name}`);
        params.map((item: any) => {
            let key = Object.keys(item)[0];
            let value = item[key];
            let isHasWhere = false;
            if (!_.isEmpty(value)) {
                if (!isHasWhere) {
                    isHasWhere = true;
                    workBuilder = workBuilder.where(`${key}=:value`, { value });
                } else {
                    workBuilder = workBuilder.andWhere(`${key}=:value`, { value });
                }
            }

        })
        return workBuilder;
    }
}
