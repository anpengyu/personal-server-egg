// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportWorkType from '../../../app/model/WorkType';

declare module 'egg' {
  interface IModel {
    WorkType: ReturnType<typeof ExportWorkType>;
  }
}
