import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from '../base';
import Role from '../role/role';
import Survey from '../survey/survey';

@EntityModel('roleSurvey')
export default class RoleSurvey extends Base {
  @Column()
  roleId: number;

  @Column()
  surveyId: number;

  @ManyToOne(type => Role, role => role.roleSurveys)
  role: Role;

  @ManyToOne(type => Survey, survey => survey.roleSurveys)
  survey: Survey;
}
