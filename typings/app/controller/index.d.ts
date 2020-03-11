// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportAccountBook from '../../../app/controller/accountBook';
import ExportCard from '../../../app/controller/card';
import ExportHome from '../../../app/controller/home';
import ExportProject from '../../../app/controller/project';
import ExportUser from '../../../app/controller/user';
import ExportWork from '../../../app/controller/work';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    accountBook: ExportAccountBook;
    card: ExportCard;
    home: ExportHome;
    project: ExportProject;
    user: ExportUser;
    work: ExportWork;
  }
}
