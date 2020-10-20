import { EntityModel } from '@midwayjs/orm';
import { Column, OneToOne, OneToMany } from 'typeorm';
import Base from '../base';
import Question from './question';
import AnswerRecord from '../record/answerRecord';

@EntityModel()
export default class Answer extends Base {
  @Column('text')
  content: string;

  // @Column()
  // questionId: number;

  @OneToOne(type => Question, question => question.answer)
  question: Question;

  @OneToMany(type => AnswerRecord, answerRecord => answerRecord.answer)
  answerRecords: AnswerRecord[];
}
