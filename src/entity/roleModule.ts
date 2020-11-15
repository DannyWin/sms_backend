import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('roleModule')
export default class RoleModule {
    @PrimaryColumn()
    roleId: number;

    @PrimaryColumn()
    moduleId: number;

    @Column({ nullable: true })
    order: number;
}
