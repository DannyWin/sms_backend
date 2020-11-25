import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, OneToOne, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import Base from './base/base';
import Survey from './survey';
import Answer from './answer';
import Option from './option';
import Category from './category';
import Sort from './sort';
import AnswerRecord from './answerRecord';

@EntityModel()
export default class Question extends Base {
    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToOne(type => Category, category => category.questions)
    category: Category;

    @ManyToOne(type => Sort, sort => sort.questions)
    sort: Sort;

    @OneToOne(type => Answer, answer => answer.question, { cascade: true })
    @JoinColumn()
    answer: Answer;

    @OneToMany(type => AnswerRecord, answerRecord => answerRecord.question, { cascade: true })
    answerRecords: AnswerRecord[];

    @ManyToMany(() => Survey, (survey: Survey) => survey.questions)
    surveys: Promise<Survey[]>;

    @ManyToMany(() => Option, (option: Option) => option.questions)
    @JoinTable({
        name: 'questionOption',
        joinColumn: {
            name: 'questionId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'optionId',
            referencedColumnName: 'id',
        },
    })
    options: Option[];
}
