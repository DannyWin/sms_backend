import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import Base from '../base';
import Question from './question';

@EntityModel()
export default class Sort extends Base {
  @Column({
    length: 30,
  })
  name: string;

  @OneToMany(type => Question, question => question.category)
  questions: Question[];
}
