import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import Base from './base/base';
import Role from './role';
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

    @OneToMany(type => Message, message => message.user, { cascade: true })
    messages: Message[];

    @ManyToMany(() => Role, (role: Role) => role.users)
    @JoinTable({
        name: 'userRole',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
    })
    roles: Role[];

    @OneToMany(type => SurveyRecord, surveyRecord => surveyRecord.user, { cascade: true })
    surveyRecords: SurveyRecord[];

    @ManyToOne(type => Organization, organization => organization.users)
    organization: Organization;
}
