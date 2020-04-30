import { Service } from 'egg';
import {  getRepository } from 'typeorm';
import User from '../entity/User';
import BaseModel from './BaseModel';
let _ = require('lodash');

/**
 * work Service
 */
export default class BaseService extends Service {
    paramsData: any = {};
    pageNum: number = 0;
    pageSize: number = 10;
    currentUser: User;



    constructor(request: any) {
        super(request);
        const { ctx } = this;
        let params: { variables: { pageNum: number, pageSize: number } } = { variables: { pageNum: 0, pageSize: 10 } }
        if (ctx.request.method == 'GET') {
            params = ctx.query;
        } else {
            params = ctx.request.body
        }
        this.pageNum =params.variables&& params.variables.pageNum || 0;
        this.pageSize = params.variables&&params.variables.pageSize || 10;
        console.log('this.params', this.pageNum, this.pageSize)
        // this.pageNum = this.params.
        // this.offset = _.isEmpty(this.params.pageNum) ? 0 : ((Number(this.params.pageNum) - 1) * (Number(this.params.pageSize) || 10))
        // this.limit = Number(this.params.pageSize) || 10;
        // this.currentUser = ctx.req['currentUser']
    }

    //获取分页每页条数、页数、总条数
    public async loadPagination<T>(T t) {
        console.log('params', t.find())
        // const totalCountSql = await getConnection().query(sql);
        // const pageSize = this.pageSize || 10;
        // const totalCount = totalCountSql[0].count;
        // const pagination = {
        //     page: this.pageNum || 1,
        //     perPage: pageSize,
        //     totalCount,
        //     totalPage: Math.floor((totalCount - 1) / pageSize) + 1,
        // };
        // return pagination;
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
