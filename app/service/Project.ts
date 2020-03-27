import BaseService from '../core/BaseService';
import { getRepository } from 'typeorm';
import Project from '../entity/Project';

/**
 * work Service
 */
export default class ProjectService extends BaseService {

    public async loadProject() {
        const projectRepository = getRepository(Project);
        let ProjectModel = await projectRepository.find()
        return ProjectModel;
    }
}
