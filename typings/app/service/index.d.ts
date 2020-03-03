// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/service/Account';
import ExportAccountBook from '../../../app/service/AccountBook';
import ExportCard from '../../../app/service/Card';
import ExportProject from '../../../app/service/Project';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';
import ExportWork from '../../../app/service/Work';

declare module 'egg' {
  interface IService {
    account: ExportAccount;
    accountBook: ExportAccountBook;
    card: ExportCard;
    project: ExportProject;
    test: ExportTest;
    user: ExportUser;
    work: ExportWork;
  }
}
