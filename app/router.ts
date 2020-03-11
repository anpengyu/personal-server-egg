import { Application } from 'egg';
import authentication from './middleware/authentication';

export default (app: Application) => {
  const { controller, router } = app;
  const { work,project,account,card,accountBook,user } = controller;

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
  router.get('/loadCard',authentication(app), card.loadCard);

  router.get('/loadAccountBook',authentication(app), accountBook.loadAccountBook);
  router.post('/addAccountBook', authentication(app), accountBook.addAccountBook);
  router.get('/loadAccountBookType', accountBook.loadAccountBookType);
  router.get('/loadAccountBookTypeDetail', accountBook.loadAccountBookTypeDetail);

  router.post('/user/register',user.register);
  router.post('/user/login',user.login);
  router.get('/user/logout',user.logout);
  router.get('/user/findPsw',user.findPsw);
};
