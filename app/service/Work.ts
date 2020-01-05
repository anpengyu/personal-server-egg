import BaseService from '../core/BaseService';
import { getRepository } from 'typeorm';
import { WorkType } from '../model/WorkType';
import { WorkName } from '../model/WorkName';
import { Work } from '../model/Work';
let _ = require('lodash');

/**
 * work Service
 */
export default class WorkService extends BaseService {

    public async loadWorkType() {
        const workTypeRepository = getRepository(WorkType);
        let workTypeModel = await workTypeRepository.find()
        return workTypeModel;
    }

    public async loadWorkName(id: string) {
        const workNameRepository = getRepository(WorkName);
        let workNameModel = await workNameRepository.find({ workTypeId: id });
        return workNameModel;
    }

    public async loadWorks(params: any) {
        const workRepository:any = getRepository(Work);
        let worModel = {};
        if (!_.isEmpty(params.type) && !_.isEmpty(params.flag)) {
            this.paramsData.type = params.type;
            this.paramsData.flag = params.flag;
        } else if (!_.isEmpty(params.type)) {
            this.paramsData.type = params.type;
        } else if (!_.isEmpty(params.flag)) {
            this.paramsData.flag = params.flag;
        }
        worModel = await workRepository
        .find(this.paramsData);

        // let type = params.type;
        // let flag = params.flag;
        // console.log('flag',flag)
        // let work = await workRepository
        //     .createQueryBuilder("work") // 别名，必填项，用来指定本次查询
        //     // .where("work.type=Android")
        //     .offset(0)
        //     .where('type=:type', {type})
        //     .andWhere('flag=:flag', {flag})
        //     .limit(4)
        //     // .setParameters({ type: "React"})
        //     .getMany();
        return worModel;
    }
}
