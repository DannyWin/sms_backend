import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, ManyToOne } from 'typeorm';
import Base from '../base';
import UserRole from './userRole';
import Organization from '../organization/organization';
import Message from '../message/message';
import SurveyRecord from '../record/surveyRecord';

@EntityModel()
export default class User extends Base {
  @Column({
    length: 30,
  })
  uid: string;

  @Column({
    length: 30,
  })
  pwd: string;

//   @Column()
//   organizationId: number;

  @Column({
    length: 30,
  })
  name: string;

  @Column({
    width: 3,
  })
  age: number;

  @Column()
  regDate: Date;

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @OneToMany(type => UserRole, userRole => userRole.user)
  userRoles: UserRole[];

  @OneToMany(type => SurveyRecord, surveyRecord => surveyRecord.user)
  surveyRecords: SurveyRecord[];

  @ManyToOne(type => Organization, organization => organization.users)
  organization: Organization;
}
