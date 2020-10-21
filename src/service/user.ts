import { Provide, Config, Plugin } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import User from '../entity/user';
import { IUserService, ILoginOptions } from '../iservice/iuser';
import { md5 } from '../common/crypto';

@Provide()
export class UserService implements IUserService {
    @Plugin('jwt')
    jwt;

    @Config('jwt')
    jwtConfig;

    @Config('pwdSecret')
    pwdSecret;

    @InjectEntityModel(User)
    userRepository: Repository<User>;

    // async getUser(options: IUserOptions) {
    //     return {
    //         uid: options.uid,
    //         username: 'mockedName',
    //         phone: '12345678901',
    //         email: 'xxx.xxx@xxx.com',
    //     };
    // }

    /**
     * 通过id获取用户
     *
     * @param {number} id
     * @returns
     * @memberof UserService
     */
    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOne({ id: id });
    }
    /**
     * 登录
     *
     * @param {ILoginOptions} options
     * @returns
     * @memberof UserService
     */
    async login(options: ILoginOptions) {
        const existUser = await this.userRepository.findOne({
            uid: options.uid,
        });

        // 用户不存在
        if (!existUser) {
            return null;
        }

        let token = '';
        console.log(md5(options.pwd, this.pwdSecret));
        if (existUser.pwd === md5(options.pwd, this.pwdSecret)) {
            token = this.jwt.sign({ uid: existUser.uid }, this.jwtConfig.secret, { expiresIn: this.jwtConfig.sign.expiresIn });
        }
        // 验证通过
        return token;
    }
}
