import { Application } from 'egg';
import authentication from '../middleware/authentication';

module.exports = (app: Application) => {
    const { controller, router } = app;
 
    const { user } = controller;
    router.post('/user/register', user.register);
    router.post('/user/login', user.login);
    router.post('/user/logout', authentication(app), user.logout);
    router.get('/user/findPsw', user.findPsw);

    router.get('/user/userInfo', user.userInfo);
};