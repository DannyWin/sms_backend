import { Provide, Plugin, Config, Scope } from '@midwayjs/decorator';

@Provide()
@Scope()
export default class Token {
    @Plugin('jwt')
    jwt;

    @Config('jwt')
    jwtConfig;

    decodeToken: any;

    generateToken = param => {
        return this.jwt.sign({ uid: param }, this.jwtConfig.secret, { expiresIn: this.jwtConfig.sign.expiresIn });
    };

    verifyToken = bearerToken => {
        const token = bearerToken.split(' ')[1];
        return this.jwt.verify(token, this.jwtConfig.secret);
    };
}
