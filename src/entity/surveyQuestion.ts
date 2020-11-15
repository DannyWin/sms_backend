import { EntityModel } from '@midwayjs/orm';
import { PrimaryColumn, Column } from 'typeorm';

@EntityModel('surveyQuestion')
export default class SurveyQuestion {
    @PrimaryColumn()
    surveyId: number;

    @PrimaryColumn()
    questionId: number;

    @Column({ nullable: true })
    order: number;
}
