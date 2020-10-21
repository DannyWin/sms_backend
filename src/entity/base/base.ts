import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel()
export default abstract class Base {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    order: number;

    @Column({ nullable: true })
    enabled: boolean;

    @Column({ nullable: true })
    deleted: boolean;
}
