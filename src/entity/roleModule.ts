import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from './base/base';
import Role from './role';
import Module from './module';

@EntityModel('roleModule')
export default class RoleModule extends Base {
    @Column({ nullable: true })
    roleId: number;

    @Column({ nullable: true })
    moduleId: number;

    @ManyToOne(type => Role, role => role.roleModules)
    role: Role;

    @ManyToOne(type => Module, module => module.roleModules)
    module: Module;
}
