import * as crypto from 'crypto';

const md5 = (pass: string, pwdSuffix?: string, option?: any): string => {
    option = option || { algorithm: 'md5', encoding: 'hex' };
    pwdSuffix = pwdSuffix || '';
    return crypto
        .createHash(option.algorithm)
        .update(`${[pass]}${pwdSuffix}`)
        .digest(option.encoding);
};
export { md5 };
