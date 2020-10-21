import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from './base/base';
import User from './user';

@EntityModel()
export default class Message extends Base {
    @Column({ length: 100, nullable: true })
    title: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ nullable: true })
    addDate: Date;

    @Column({ nullable: true })
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @ManyToOne(type => User, user => user.messages)
    user: User;
}
