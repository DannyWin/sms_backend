import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from './base/base';
import Role from './role';
import Survey from './survey';

@EntityModel('roleSurvey')
export default class RoleSurvey extends Base {
    @Column({ nullable: true })
    roleId: number;

    @Column({ nullable: true })
    surveyId: number;

    @ManyToOne(type => Role, role => role.roleSurveys)
    role: Role;

    @ManyToOne(type => Survey, survey => survey.roleSurveys)
    survey: Survey;
}
