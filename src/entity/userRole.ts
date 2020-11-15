import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryColumn } from 'typeorm';

@EntityModel('userRole')
export default class UserRole {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    roleId: number;

    @Column({ nullable: true })
    order: number;
}
