import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import Base from './base/base';
import QuestionOption from './questionOption';

@EntityModel()
export default class Option extends Base {
    @Column({ type: 'text', nullable: true })
    content: string;

    @OneToMany(type => QuestionOption, questionOption => questionOption.option, { cascade: true })
    questionOptions: QuestionOption[];
}
