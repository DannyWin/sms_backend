import { EggPlugin } from 'egg';
export default {
    static: true, // default is true
    jwt: {
        enable: true,
        package: 'egg-jwt',
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    },
} as EggPlugin;
