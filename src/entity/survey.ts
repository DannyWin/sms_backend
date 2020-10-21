import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import Base from './base/base';
import RoleSurvey from './roleSurvey';
import SurveyQuestion from './surveyQuestion';
import SurveyRecord from './surveyRecord';

@EntityModel()
export default class Survey extends Base {
    @Column({ length: 30, nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    expectedCount: number;

    @Column({ nullable: true })
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column({ nullable: true })
    finish: boolean;

    @OneToMany(type => RoleSurvey, roleSurvey => roleSurvey.survey)
    roleSurveys: RoleSurvey[];

    @OneToMany(type => SurveyRecord, surveyRecord => surveyRecord.survey)
    surveyRecords: SurveyRecord[];

    @OneToMany(type => SurveyQuestion, surveyQuestion => surveyQuestion.survey)
    surveyQuestions: SurveyQuestion[];
}
