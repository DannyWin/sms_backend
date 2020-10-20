import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import Base from '../base';
import SurveyQuestion from '../survey/surveyQuestion';
import QuestionOption from './questionOption';
import Answer from './answer';
import Category from './category';
import Sort from './sort';
import AnswerRecord from '../record/answerRecord';

@EntityModel()
export default class Question extends Base {
  @Column('text')
  content: string;

  // @Column()
  // categoryId: number;

  // @Column()
  // sortId: number;

  @ManyToOne(type => Category, category => category.questions)
  category: Category;

  @ManyToOne(type => Sort, sort => sort.questions)
  sort: Sort;

  @OneToOne(type => Answer, answer => answer.question)
  @JoinColumn()
  answer: Answer;

  @OneToMany(type => AnswerRecord, answerRecord => answerRecord.question)
  answerRecords: AnswerRecord[];

  @OneToMany(type => SurveyQuestion, surveyQuestion => surveyQuestion.question)
  surveyQuestions: SurveyQuestion[];

  @OneToMany(type => QuestionOption, questionOption => questionOption.question)
  questionOptions: QuestionOption[];
}
