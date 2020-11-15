import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToMany } from 'typeorm';
import Base from './base/base';
import Question from './question';

@EntityModel()
export default class Option extends Base {
    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToMany(() => Question, (question: Question) => question.options)
    questions: Question[];
}
