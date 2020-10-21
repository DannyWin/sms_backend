import { Controller, Post, Provide, Inject } from '@midwayjs/decorator';
import { Context } from 'egg';
import { IUserService } from '../iservice/iuser';
import { auth_userNotFound } from '../common/constant';

@Provide()
@Controller('/')
export class LoginController {
    @Inject()
    ctx: Context;

    @Inject()
    userService: IUserService;

    @Post('/login')
    async login(ctx: Context): Promise<void> {
        const { uid, pwd } = ctx.request.body;
        const token = await this.userService.login({ uid, pwd });
        if (token) {
            ctx.body = { msg: 'Login successfully', data: { token } };
        } else {
            ctx.status = 400;
            ctx.body = {
                code: auth_userNotFound.code,
                msg: auth_userNotFound.msg,
            };
            //ctx.throw(400,'Uid or Pwd is wrong')
        }
    }
}
