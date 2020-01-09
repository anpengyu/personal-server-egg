import BaseService from '../core/BaseService';
import { getRepository, getConnection } from 'typeorm';
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

    public async loadCountForFlag() {
        let sql = 'select flag,count(*) as count from work group by flag order by flag';
        const waitDevelopSql = await getConnection().query(sql);
        console.log('waitDevelopSql',waitDevelopSql[1]);
        return waitDevelopSql;
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
        return workBuilder.offset(this.offset).limit(this.limit).orderBy('id', 'DESC').getMany();
    }

    public async addWorks(params: any) {
        console.log('params', params)
        const workRepository = getRepository(Work);
        let addNewTypeResponse: any = {};
        if (params.addNewType == 'true') {
            const workTypeRepository = getRepository(WorkType);
            let typeData = {
                title: params.workType
            }
            addNewTypeResponse = await workTypeRepository.save(typeData);
            console.log('addNewTypeResponse', addNewTypeResponse);
        }
        if (params.addNewName == 'true') {
            const workNameRepository = getRepository(WorkName);
            let workTypeId = '';
            if (params.addNewType == 'true') {
                workTypeId = String(addNewTypeResponse.id);
            } else {
                workTypeId = params.workTypeId
            }
            let nameData = {
                title: params.workName,
                workTypeId
            }
            let addNewNameResponse = await workNameRepository.save(nameData);
            console.log('addNewNameResponse', addNewNameResponse);
        }
        let data = {
            time: params.time,
            type: params.workType,
            name: params.workName,
            butt_joint: params.developer,
            content: params.des,
        }
        let response = await workRepository.save(data);
        return response;
    }

}
