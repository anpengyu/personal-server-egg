import { Application } from 'egg';
import authentication from './middleware/authentication';

export default (app: Application) => {
  const { controller, router } = app;
  const { work,project,account,card,accountBook } = controller;

  router.get('/', controller.home.index);
  // 获取项目类型列表
  router.get('/work/loadWorkTypes', work.loadWorkType);
  router.get('/work/loadWorkNames', work.loadWorkNames);
  router.get('/work/loadWorks', work.loadWorks);
  router.post('/work/addWork',work.addWorks);
  router.post('/work/delWork',work.deleteWork);
  router.get('/project/loadProject', project.loadProject);

  router.get('/loadAccount', account.loadAccount);
  router.get('/dd', account.dd);
  router.get('/loadAccountTitle', account.loadAccountTitle);
  router.get('/loadAccountType', account.loadAccountType);
  // const jwt = app.passport.authenticate('jwt', {session:false, successReturnToOrRedirect:null});
  router.get('/loadCard', card.loadCard);
  router.get('/addWorkName',authentication(app), work.addWorkName)
  router.post('/updateWorkName',authentication(app), work.updateWorkName)
  // router.get('/loadWorkName',authentication(app), work.loadWorkName)
  router.get('/loadAccountBook',authentication(app), accountBook.loadAccountBook);
  router.post('/addAccountBook',   accountBook.addAccountBook);
  router.get('/loadAccountBookType', accountBook.loadAccountBookType);
  router.get('/loadAccountBookTypeDetail', accountBook.loadAccountBookTypeDetail);
  

  require('./router/user')(app)
  require('./router/blog')(app)
};
