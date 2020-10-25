import { Provide, Config } from '@midwayjs/decorator';
import * as crypto from 'crypto';

@Provide()
export default class Crypto {
    @Config('pwdSecret')
    pwdSecret;

    md5 = (pass: string, option?: any): string => {
        option = option || { algorithm: 'md5', encoding: 'hex' };
        const pwdSecret = this.pwdSecret || '';
        return crypto
            .createHash(option.algorithm)
            .update(`${[pass]}${pwdSecret}`)
            .digest(option.encoding);
    };
}
