import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const { work,project,account,card,accountBook } = controller;

  router.get('/', controller.home.index);
  // 获取项目类型列表
  router.get('/loadWorkTypes', work.loadWorkType);
  router.get('/loadWorkNames', work.loadWorkNames);
  router.get('/loadWorks', work.loadWorks);
  router.get('/loadProject', project.loadProject);
  router.get('/loadAccount', account.loadAccount);
  router.get('/loadAccountTitle', account.loadAccountTitle);
  router.get('/loadAccountType', account.loadAccountType);
  router.get('/loadCard', card.loadCard);
  router.get('/loadAccountBook', accountBook.loadAccountBook);
  router.get('/loadAccountBookType', accountBook.loadAccountBookType);
  router.get('/loadAccountBookTypeDetail', accountBook.loadAccountBookTypeDetail);
};
