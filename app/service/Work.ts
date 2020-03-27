import BaseService from '../core/BaseService';
import { getRepository, getConnection } from 'typeorm';
import WorkType from '../entity/WorkType';
import WorkName from '../entity/WorkName';
import Work from '../entity/Work';
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
        return waitDevelopSql;
    }

    public async loadWorkName(id: string) {
        console.log('id',id)
        let {current,pageSize} = this.params;
        const workNameRepository = getRepository(WorkName);
        // let workNameModel = await workNameRepository.find({ workTypeId: id });
        // let workNameModel = await workNameRepository.find();
        let workNameModel = await workNameRepository.findAndCount({take:pageSize,skip:(current-1)*pageSize})
        return workNameModel;
    }

    public async loadWorks(params: any) {
        let workBuilder = this.queryBuilder(params, Work);
        return workBuilder.offset(this.offset).limit(this.limit).orderBy('id', 'DESC').getMany();
    }

    // 删除一条工作记录
    public async delWork(id: string) {
        const workNameRepository = getRepository(Work);
        let workToRemove: any = await workNameRepository.findOne(id);
        const removeResponse = await workNameRepository.remove(workToRemove);
        return removeResponse;
    }

    public async addWorks(params: any) {

        const workRepository = getRepository(Work);
        let addNewTypeResponse: any = {};
        if (params.addNewType == 'true') {
            const workTypeRepository = getRepository(WorkType);
            let typeData = {
                title: params.workType
            }
            addNewTypeResponse = await workTypeRepository.save(typeData);
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
                workTypeId,
            }
            let addNewNameResponse = await workNameRepository.save(nameData);
            console.log('addNewNameResponse',addNewNameResponse)
        }
        let data: any = {
            time: params.time,
            type: params.workType,
            typeId: params.typeId,
            name: params.workName,
            butt_joint: params.developer,
            content: params.des,
            flag: '1',
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'
        }
        let response = '';
        if (!_.isEmpty(params.id)) {
            let workToUpdate: any = await workRepository.findOne(params.id);
            if (!_.isEmpty(params.workName)) {
                workToUpdate.time = params.time;
                workToUpdate.type = params.workType;
                workToUpdate.typeId = params.typeId;
                workToUpdate.name = params.workName;
                workToUpdate.butt_joint = params.developer;
                workToUpdate.content = params.des;
                // workToUpdate.flag = params.flag;

            } else {
                workToUpdate.flag = params.flag;
                if (!_.isEmpty(params.time)) {
                    switch (params.flag) {
                        case '2':
                            workToUpdate.developmentDate = params.time;
                            break;
                        case '3':
                            workToUpdate.testDate = params.time;
                            break;
                        case '4':
                            workToUpdate.onlineDate = params.time;
                            break;
                    }
                }
            }

            response = await workRepository.save(workToUpdate);
        } else {
            response = await workRepository.save(data);
        }

        return response;
    }

}
