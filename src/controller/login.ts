import { Controller, Post, Provide, Inject, Body, ALL } from '@midwayjs/decorator';
import { IUserService, ILoginOptions } from '../interface/iuser';
import { login_success, auth_userNotFound } from '../common/constant';
import { CreateApiDoc } from '@midwayjs/swagger';
@Provide()
@Controller('/')
export class LoginController {
    @Inject()
    userService: IUserService;

    @(CreateApiDoc()
        .summary('user login')
        .description('This is a open api for login')
        .param('uid', {
            required: true,
            example: 'zhangsan',
            description: 'This is uid',
        })
        .param('pwd', {
            required: true,
            description: 'This is pwd',
        })
        .build())
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
