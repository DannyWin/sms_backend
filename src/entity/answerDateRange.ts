import { EntityModel } from '@midwayjs/orm';
import { Column, OneToOne } from 'typeorm';
import Base from './base/base';
import AnswerRecord from './answerRecord';

@EntityModel('answerDateRange')
export default class AnswerDateRange extends Base {
    @Column({ nullable: true })
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @OneToOne(type => AnswerRecord, answerRecord => answerRecord.answerDateRange)
    answerRecord: AnswerRecord;
}
