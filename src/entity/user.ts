import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, ManyToOne } from 'typeorm';
import Base from './base/base';
import UserRole from './userRole';
import Organization from './organization';
import Message from './message';
import SurveyRecord from './surveyRecord';

@EntityModel()
export default class User extends Base {
    @Column({ length: 30, nullable: true })
    uid: string;

    @Column({ length: 32, nullable: true })
    pwd: string;

    @Column({ length: 30, nullable: true })
    name: string;

    @Column({
        width: 3,
        nullable: true,
    })
    age: number;

    @Column({ nullable: true })
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
