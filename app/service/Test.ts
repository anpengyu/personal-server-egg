import { Service } from 'egg';
import { getRepository } from 'typeorm';
import WorkType from '../entity/WorkType';
/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi() {
    const workTypeRepository = getRepository(WorkType);
    let workTypeModel = workTypeRepository.find()
    return workTypeModel;
  }
}
