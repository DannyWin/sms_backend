import { CreateApiPropertyDoc } from '@midwayjs/swagger';
import User from '../entity/user';

export interface IRegisterOptions {
    username: string;
    password: string;
    mobile?: number;
    email: string;
    userId?: string;
}

export class ILoginOptions {
    @CreateApiPropertyDoc('uid')
    uid: string;
    @CreateApiPropertyDoc('pwd')
    pwd: string;
}

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
    id: number;
}

/**
 * @description User-Service response
 */
export interface IUserResult {
    id: number;
    username: string;
    phone: string;
    email?: string;
}

/**
 * @description User-Service abstractions
 */
export interface IUserService {
    login(loginOptions: ILoginOptions): Promise<string>;
    //getUser(options: IUserOptions): Promise<IUserResult>;
    getUserById(id: number): Promise<User>;
    getUserByUid(uid: string): Promise<User>;
}
