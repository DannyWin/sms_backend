import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, ManyToOne } from 'typeorm';
import Base from '../base';
import UserRole from '../user/userRole';
import RoleModule from './roleModule';
import RoleSurvey from './roleSurvey';
import Organization from '../organization/organization';

@EntityModel()
export default class Role extends Base {
  @Column({
    length: 30,
  })
  name: string;

  @Column('text')
  description: string;

  @OneToMany(type => UserRole, userRole => userRole.role)
  userRoles: UserRole[];

  @OneToMany(type => RoleModule, roleModule => roleModule.role)
  roleModules: RoleModule[];

  @OneToMany(type => RoleSurvey, roleSurvey => roleSurvey.role)
  roleSurveys: RoleSurvey[];

  @ManyToOne(type => Organization, organization => organization.roles)
  organization: Organization;
}
