import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import Base from './base/base';
import User from './user';
import Survey from './survey';
import AnswerRecord from './answerRecord';

@EntityModel('surveyRecord')
export default class SurveyRecord extends Base {
    @Column({ nullable: true })
    surveyDate: Date;

    @OneToMany(type => AnswerRecord, answerRecord => answerRecord.surveyRecord)
    answerRecords: AnswerRecord[];

    @ManyToOne(type => Survey, survey => survey.surveyRecords)
    survey: Survey;

    @ManyToOne(type => User, user => user.surveyRecords)
    user: User;
}
