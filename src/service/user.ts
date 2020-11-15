import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import User from '../entity/user';
import { IUserService, ILoginOptions } from '../interface/iuser';
import { ICrypto, IToken } from '../utility/interface';

@Provide()
export class UserService implements IUserService {
    @Inject()
    crypto: ICrypto;

    @Inject()
    token: IToken;

    @InjectEntityModel(User)
    userRepository: Repository<User>;

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
     * 通过iid获取用户
     *
     * @param {number} uid
     * @returns
     * @memberof UserService
     */
    async getUserByUid(uid: string): Promise<User> {
        return await this.userRepository.findOne({ relations: ['roles'], where: { uid: uid } });
    }
    /**
     * 登录
     *
     * @param {ILoginOptions} options
     * @returns
     * @memberof UserService
     */
    async login(options: ILoginOptions): Promise<string> {
        const existUser = await this.userRepository.findOne({
            uid: options.uid,
        });

        // 用户不存在
        if (!existUser) {
            return null;
        }
        let token = '';
        console.log(this.crypto.md5(options.pwd));
        if (existUser.pwd === this.crypto.md5(options.pwd)) {
            token = this.token.generateToken(existUser.uid);
        }
        // 验证通过
        return token;
    }
}
