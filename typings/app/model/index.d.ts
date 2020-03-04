// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/model/Account';
import ExportAccountBook from '../../../app/model/AccountBook';
import ExportAccountBookType from '../../../app/model/AccountBookType';
import ExportAccountBookTypeDetail from '../../../app/model/AccountBookTypeDetail';
import ExportAccountTitle from '../../../app/model/AccountTitle';
import ExportAccountType from '../../../app/model/AccountType';
import ExportCard from '../../../app/model/Card';
import ExportProject from '../../../app/model/Project';
import ExportUser from '../../../app/model/User';
import ExportWork from '../../../app/model/Work';
import ExportWorkName from '../../../app/model/WorkName';
import ExportWorkType from '../../../app/model/WorkType';

declare module 'egg' {
  interface IModel {
    Account: ReturnType<typeof ExportAccount>;
    AccountBook: ReturnType<typeof ExportAccountBook>;
    AccountBookType: ReturnType<typeof ExportAccountBookType>;
    AccountBookTypeDetail: ReturnType<typeof ExportAccountBookTypeDetail>;
    AccountTitle: ReturnType<typeof ExportAccountTitle>;
    AccountType: ReturnType<typeof ExportAccountType>;
    Card: ReturnType<typeof ExportCard>;
    Project: ReturnType<typeof ExportProject>;
    User: ReturnType<typeof ExportUser>;
    Work: ReturnType<typeof ExportWork>;
    WorkName: ReturnType<typeof ExportWorkName>;
    WorkType: ReturnType<typeof ExportWorkType>;
  }
}
