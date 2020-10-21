import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from './base/base';
import User from './user';
import Role from './role';

@EntityModel('userRole')
export default class UserRole extends Base {
    @Column({ nullable: true })
    userId: number;

    @Column({ nullable: true })
    roleId: number;

    @ManyToOne(type => User, user => user.userRoles)
    user: User;

    @ManyToOne(type => Role, role => role.userRoles)
    role: Role;
}
