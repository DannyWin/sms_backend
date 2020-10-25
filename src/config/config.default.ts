import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
    const config = {} as DefaultConfig;

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1603196435910_6496';
    config.pwdSecret = 'abcde';
    // add your config here
    config.middleware = ['authorizationMiddleware', 'responseMiddleware'];
    config.orm = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'sms',
        synchronize: true,
        logging: false,
        entities: [__dirname + '/entity/*.{ts,js}'],
    };
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true,
        },
        //domainWhiteList: ['http://localhost:8080'],//许访问⼝的⽩单
    };
    config.jwt = {
        //jwt配置项
        secret: '123456',
        sign: { expiresIn: '7d' },
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };
    return config;
};
