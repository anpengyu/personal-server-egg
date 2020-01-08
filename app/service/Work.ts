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
        let workBuilder = await workRepository.createQueryBuilder("work");
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
