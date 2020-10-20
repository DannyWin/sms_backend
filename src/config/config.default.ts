import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1603196435910_6496';

  // add your config here
  config.middleware = [];
  config.orm = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'sms',
    synchronize: true,
    logging: false,
    //entities: [__dirname + '/entity/*.{ts,js}'],
  };
  return config;
};
