// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportArticle = require('../../../app/model/article');
import ExportItem = require('../../../app/model/item');
import ExportTag = require('../../../app/model/tag');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    Item: ReturnType<typeof ExportItem>;
    Tag: ReturnType<typeof ExportTag>;
    User: ReturnType<typeof ExportUser>;
  }
}
