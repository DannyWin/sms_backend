import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('roleSurvey')
export default class RoleSurvey {
    @PrimaryColumn()
    roleId: number;

    @PrimaryColumn()
    surveyId: number;

    @Column({ nullable: true })
    order: number;
}
