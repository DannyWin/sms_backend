import { Configuration } from '@midwayjs/decorator';
@Configuration({
    importConfigs: [
        './config/'               // 自动加载 config 目录下所有 配置文件
      ],
    imports: ['@midwayjs/orm'],})
export class ContainerConfiguration {}