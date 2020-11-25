import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import Base from './base/base';
import SurveyRecord from './surveyRecord';
import Question from './question';
import Role from './role';

@EntityModel()
export default class Survey extends Base {
    @Column({ length: 30, nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    expectedCount: number;

    @Column({ nullable: true })
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column({ nullable: true })
    finish: boolean;

    @ManyToMany(() => Role, (role: Role) => role.surveys)
    roles: Promise<Role[]>;

    @OneToMany(type => SurveyRecord, surveyRecord => surveyRecord.survey, { cascade: true })
    surveyRecords: SurveyRecord[];

    @ManyToMany(() => Question, (question: Question) => question.surveys)
    @JoinTable({
        name: 'surveyQuestion',
        joinColumn: {
            name: 'surveyId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'questionId',
            referencedColumnName: 'id',
        },
    })
    questions: Promise<Question[]>;
}
