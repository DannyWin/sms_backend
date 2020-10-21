import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import Base from './base/base';
import Question from './question';

@EntityModel()
export default class Category extends Base {
    @Column({ nullable: true })
    pid: number;

    @Column({ length: 30, nullable: true })
    name: string;

    @OneToMany(type => Question, question => question.category)
    questions: Question[];
}
