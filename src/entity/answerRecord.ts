import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Base from './base/base';
import Question from './question';
import Answer from './answer';
import SurveyRecord from './surveyRecord';
import AnswerDateRange from './answerDateRange';

@EntityModel('answerRecord')
export default class AnswerRecord extends Base {
    @Column({ type: 'text', nullable: true })
    content: string;

    @OneToOne(type => AnswerDateRange, answerDateRange => answerDateRange.answerRecord, { cascade: true })
    @JoinColumn()
    answerDateRange: AnswerDateRange;

    @ManyToOne(type => Question, question => question.answerRecords)
    question: Question;

    @ManyToOne(type => Answer, answer => answer.answerRecords)
    answer: Answer;

    @ManyToOne(type => SurveyRecord, surveyRecord => surveyRecord.answerRecords)
    surveyRecord: SurveyRecord;
}
