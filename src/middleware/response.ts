import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';

@Provide()
export class ResponseMiddleware implements IWebMiddleware {
    resolve() {
        return async (ctx: Context, next: IMidwayWebNext) => {
            try {
                await next();
                ctx.status = ctx.body.status || 200;
            } catch (e) {
                console.log(e);
                ctx.status = e.status || 400;
                //ctx.response.type = 'application/json';
                ctx.body = {
                    status: e.status,
                    code: e.code || 'Interal_unknownError',
                    msg: e.msg || '',
                };
            }
        };
    }
}
