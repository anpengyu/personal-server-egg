import { Controller } from 'egg';
import { Response } from './Type';

export default class BaseController extends Controller {
    params: any = '';
    constructor(params) {
        super(params);
        const { ctx } = this;
        this.params = ctx.query;
        if(ctx.request.method=='GET'){
            this.params = ctx.query;
        }else{
            this.params = ctx.request.body
        }
    }

    success(success: Response.Success) {
        const { data, state, pagination } = success;
        const { ctx } = this;
        ctx.body = {
            code: 0,
            msg: 'OK',
            result: {
                data: data || undefined,
                pagination: pagination || undefined
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