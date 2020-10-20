import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import Base from '../base';
import QuestionOption from './questionOption';

@EntityModel()
export default class Option extends Base {
  @Column('text')
  content: string;

  @OneToMany(type => QuestionOption, questionOption => questionOption.option)
  questionOptions: QuestionOption[];
}
