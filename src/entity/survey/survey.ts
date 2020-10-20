import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import Base from '../base';
import RoleSurvey from '../role/roleSurvey';
import SurveyQuestion from '../survey/surveyQuestion';
import SurveyRecord from '../record/surveyRecord';

@EntityModel()
export default class Survey extends Base {
  @Column({
    length: 30,
  })
  name: string;

  @Column('text')
  description: string;

  @Column()
  expectedCount: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  finish: boolean;

  @OneToMany(type => RoleSurvey, roleSurvey => roleSurvey.survey)
  roleSurveys: RoleSurvey[];

  @OneToMany(type => SurveyRecord, surveyRecord => surveyRecord.survey)
  surveyRecords: SurveyRecord[];

  @OneToMany(type => SurveyQuestion, surveyQuestion => surveyQuestion.survey)
  surveyQuestions: SurveyQuestion[];
}
