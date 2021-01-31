import { Configuration } from '@midwayjs/decorator';
import * as swagger from '@midwayjs/swagger';
@Configuration({
    importConfigs: [
        './config/', // 自动加载 config 目录下所有 配置文件
    ],
    imports: [
        '@midwayjs/orm',
        {
            component: swagger,
            enabledEnvironment: ['local'],
        },
    ],
})
export class ContainerConfiguration {}
