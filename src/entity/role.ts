import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, ManyToOne } from 'typeorm';
import Base from './base/base';
import UserRole from './userRole';
import RoleModule from './roleModule';
import RoleSurvey from './roleSurvey';
import Organization from './organization';

@EntityModel()
export default class Role extends Base {
    @Column({ length: 30, nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @OneToMany(type => UserRole, userRole => userRole.role, { cascade: true })
    userRoles: UserRole[];

    @OneToMany(type => RoleModule, roleModule => roleModule.role, { cascade: true })
    roleModules: RoleModule[];

    @OneToMany(type => RoleSurvey, roleSurvey => roleSurvey.role, { cascade: true })
    roleSurveys: RoleSurvey[];

    @ManyToOne(type => Organization, organization => organization.roles)
    organization: Organization;
}
