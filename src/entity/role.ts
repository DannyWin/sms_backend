import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import Base from './base/base';
import User from './user';
import Module from './module';
import Survey from './survey';
import Organization from './organization';

@EntityModel()
export default class Role extends Base {
    @Column({ length: 30, nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToMany(() => User, (user: User) => user.roles)
    users: User[];

    @ManyToMany(() => Module, (module: Module) => module.roles)
    @JoinTable({
        name: 'roleModule',
        joinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'moduleId',
            referencedColumnName: 'id',
        },
    })
    modules: Module[];

    @ManyToMany(() => Survey, (survey: Survey) => survey.roles, { eager: true })
    @JoinTable({
        name: 'roleSurvey',
        joinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'surveyId',
            referencedColumnName: 'id',
        },
    })
    surveys: Survey[];

    @ManyToOne(type => Organization, organization => organization.roles)
    organization: Organization;
}
