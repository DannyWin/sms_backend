import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from './base/base';
import Question from './question';
import Option from './option';

@EntityModel('questionOption')
export default class QuestionOption extends Base {
    @Column({ nullable: true })
    questionId: number;

    @Column({ nullable: true })
    optionId: number;

    @ManyToOne(type => Question, question => question.questionOptions)
    question: Question;

    @ManyToOne(type => Option, option => option.questionOptions)
    option: Option;
}
