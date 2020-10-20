import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import Base from '../base';
import Question from '../question/question';
import Answer from '../question/answer';
import SurveyRecord from './surveyRecord';
import AnswerDateRange from './answerDateRange';

@EntityModel('answerRecord')
export default class AnswerRecord extends Base {
  // @Column()
  // userId: number;

  // @Column()
  // questionId: number;

  // @Column()
  // answerId: number;

  @Column('text')
  content: string;

  // @Column()
  // answerDateRangeId: number;
  @OneToOne(type => AnswerDateRange, answerDateRange => answerDateRange.answerRecord)
  @JoinColumn()
  answerDateRange: AnswerDateRange;

  @ManyToOne(type => Question, question => question.answerRecords)
  question: Question;

  @ManyToOne(type => Answer, answer => answer.answerRecords)
  answer: Answer;

  @ManyToOne(type => SurveyRecord, surveyRecord => surveyRecord.answerRecords)
  surveyRecord: SurveyRecord;
}
