import BaseService from '../core/BaseService';
import { getRepository, getConnection } from 'typeorm';
import WorkType from '../model/WorkType';
import WorkName from '../model/WorkName';
import Work from '../model/Work';
// let _ = require('lodash');

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
        return waitDevelopSql;
    }

    public async loadWorkName(id: string) {
        const workNameRepository = getRepository(WorkName);
        let workNameModel = await workNameRepository.find({ workTypeId: id });
        return workNameModel;
    }

    public async loadWorks(params: any) {
        let workBuilder = this.queryBuilder(params, Work);
        return workBuilder.offset(this.offset).limit(this.limit).orderBy('id', 'DESC').getMany();
    }

    // 删除一条工作记录
    public async delWork(id: string) {
        console.log('id:',id);
        const workNameRepository = getRepository(Work);
        let workToRemove: any = await workNameRepository.findOne(id);
        const removeResponse = await workNameRepository.remove(workToRemove);
        return removeResponse;
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
