// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportAuthentication from '../../../app/middleware/authentication';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    authentication: typeof ExportAuthentication;
  }
}
