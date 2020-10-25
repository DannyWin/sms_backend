import { Controller, Post, Provide, Inject, Body, ALL } from '@midwayjs/decorator';
import { IUserService, ILoginOptions } from '../interface/iuser';
import { login_success, auth_userNotFound } from '../common/constant';
@Provide()
@Controller('/')
export class LoginController {
    @Inject()
    userService: IUserService;

    @Post('/login')
    async login(@Body(ALL) body: ILoginOptions) {
        const { uid, pwd } = body;
        console.log(body);
        const token = await this.userService.login({ uid, pwd });
        if (token) {
            return { ...login_success, data: { token } };
        } else {
            throw auth_userNotFound;
        }
    }
}
