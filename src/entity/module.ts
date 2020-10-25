import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import Base from './base/base';
import RoleModule from './roleModule';

@EntityModel()
export default class Module extends Base {
    @Column({ nullable: true })
    pid: number;

    @Column({ length: 30, nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    url: string;

    @Column({ type: 'text', nullable: true })
    api: string;

    @OneToMany(type => RoleModule, roleModule => roleModule.module, { cascade: true })
    roleModules: RoleModule[];
}
