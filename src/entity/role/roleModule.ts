import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from '../base';
import Role from '../role/role';
import Module from '../module/module';
@EntityModel('roleModule')
export default class RoleModule extends Base {
  @Column()
  roleId: number;

  @Column()
  moduleId: number;

  @ManyToOne(type => Role, role => role.roleModules)
  role: Role;

  @ManyToOne(type => Module, module => module.roleModules)
  module: Module;
}
