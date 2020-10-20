import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from '../base';
import User from '../user/user';

@EntityModel()
export default class Message extends Base {
  @Column({
    length: 100,
  })
  title: string;

  @Column('text')
  content: string;

  @Column()
  addDate: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(type => User, user => user.messages)
  user: User;
}
