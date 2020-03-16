// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAccount from '../../../app/service/Account';
import ExportAccountBook from '../../../app/service/AccountBook';
import ExportCard from '../../../app/service/Card';
import ExportProject from '../../../app/service/Project';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';
import ExportWork from '../../../app/service/Work';
import ExportBlogArticle from '../../../app/service/blog/article';

declare module 'egg' {
  interface IService {
    account: AutoInstanceType<typeof ExportAccount>;
    accountBook: AutoInstanceType<typeof ExportAccountBook>;
    card: AutoInstanceType<typeof ExportCard>;
    project: AutoInstanceType<typeof ExportProject>;
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
    work: AutoInstanceType<typeof ExportWork>;
    blog: {
      article: AutoInstanceType<typeof ExportBlogArticle>;
    }
  }
}
