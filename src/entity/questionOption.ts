import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('questionOption')
export default class QuestionOption {
    @PrimaryColumn()
    questionId: number;

    @PrimaryColumn()
    optionId: number;

    @Column({ nullable: true })
    order: number;
}
