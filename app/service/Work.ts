import BaseService from '../core/BaseService';
import { getRepository } from 'typeorm';
import WorkType from '../model/WorkType';
import WorkName from '../model/WorkName';
import Work from '../model/Work';
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
        const workRepository: any = getRepository(Work);
        let type = params.type;
        let flag = params.flag;
        let workBuilder = await workRepository.createQueryBuilder("work");
        if (!_.isEmpty(type)) {
            workBuilder = workBuilder.where('type=:type', { type })
        }
        if (!_.isEmpty(flag)) {
            workBuilder = workBuilder.andWhere('flag=:flag', { flag })
        }
        return workBuilder.offset(this.offset).limit(this.limit).getMany();
    }

    public async addWorks(params: any) {
        const workRepository = getRepository(Work);
        let data = {
            time: params.time,
            type: params.workType,
            name: params.workName,
            butt_joint: params.developer,
            content: params.des,
        }
        console.log('params', params)
        let response = await workRepository.save(data);

        return response;
    }

}
