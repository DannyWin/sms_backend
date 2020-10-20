import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from '../base';
import Survey from './survey';
import Question from '../question/question';

@EntityModel('surveyQuestion')
export default class SurveyQuestion extends Base {
  @Column()
  surveyId: number;

  @Column()
  questionId: number;

  @ManyToOne(type => Survey, survey => survey.surveyQuestions)
  survey: Survey;

  @ManyToOne(type => Question, question => question.surveyQuestions)
  question: Question;
}
