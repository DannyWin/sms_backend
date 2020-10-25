import { Provide, Inject } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { auth_tokenError, auth_tokenMissing } from '../common/constant';
import { IToken } from '../utility/interface';

@Provide()
export class AuthorizationMiddleware implements IWebMiddleware {
    @Inject()
    token: IToken;

    resolve() {
        return async (ctx: Context, next: IMidwayWebNext) => {
            if (!ctx.request.path.startsWith('/login')) {
                const bearerToken = ctx.request.header.authorization;
                if (bearerToken) {
                    try {
                        this.token.decodeToken = this.token.verifyToken(bearerToken);
                        console.log('this.token.decodeToken======>', this.token.decodeToken);
                        await next();
                    } catch (error) {
                        ctx.status = auth_tokenError.status;
                        ctx.body = auth_tokenError;
                        return;
                    }
                } else {
                    ctx.status = auth_tokenMissing.status;
                    ctx.body = auth_tokenMissing;
                    return;
                }
            } else {
                await next();
            }
        };
    }
}
