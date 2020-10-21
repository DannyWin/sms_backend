import { EntityModel } from '@midwayjs/orm';
import { Column, OneToOne, OneToMany } from 'typeorm';
import Base from './base/base';
import Question from './question';
import AnswerRecord from './answerRecord';

@EntityModel()
export default class Answer extends Base {
    @Column({ type: 'text', nullable: true })
    content: string;

    @OneToOne(type => Question, question => question.answer)
    question: Question;

    @OneToMany(type => AnswerRecord, answerRecord => answerRecord.answer)
    answerRecords: AnswerRecord[];
}
