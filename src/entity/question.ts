import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import Base from './base/base';
import SurveyQuestion from './surveyQuestion';
import QuestionOption from './questionOption';
import Answer from './answer';
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

    @OneToOne(type => Answer, answer => answer.question)
    @JoinColumn()
    answer: Answer;

    @OneToMany(type => AnswerRecord, answerRecord => answerRecord.question)
    answerRecords: AnswerRecord[];

    @OneToMany(
        type => SurveyQuestion,
        surveyQuestion => surveyQuestion.question
    )
    surveyQuestions: SurveyQuestion[];

    @OneToMany(
        type => QuestionOption,
        questionOption => questionOption.question
    )
    questionOptions: QuestionOption[];
}
