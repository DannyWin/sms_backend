import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel()
export default abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column()
  enabled: boolean;

  @Column()
  deleted: boolean;
}
