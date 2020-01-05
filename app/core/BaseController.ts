import { Controller } from 'egg';
import { Response } from './Type';

export default class BaseController extends Controller {
    params: any = '';
    constructor(params) {
        super(params);
        const { ctx } = this;
        console.log('constructor',params)
        this.params = ctx.query;
    }

    success(success: Response.Success) {
        const { data, state } = success;
        const { ctx } = this;
        ctx.body = {
            code: 0,
            msg: 'OK',
            result: {
                data: data || undefined,
            }
        }
        ctx.status = state || 200;
    }

    failure(err: Response.Error) {
        const { state, data, code, msg } = err;
        const { ctx } = this;
        const defaultCode = (state >= 200 && state < 300) ? 0 : state;

        ctx.body = {
            code: Number(code || defaultCode),
            msg: msg || ctx.helper.errorCode[String(state)],
            result: data,
        };
        ctx.status = state || 500;
    }
}