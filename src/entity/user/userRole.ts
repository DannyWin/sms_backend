import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from '../base';
import User from './user';
import Role from '../role/role';

@EntityModel('userRole')
export default class UserRole extends Base {
  @Column()
  userId: number;

  @Column()
  roleId: number;

  @ManyToOne(type => User, user => user.userRoles)
  user: User;

  @ManyToOne(type => Role, role => role.userRoles)
  role: Role;
}
