import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from '../base';
import Province from './province';

@EntityModel()
export default class City extends Base {
  @Column({
    length: 50,
  })
  name: string;

  @Column()
  provinceId: number;

  @Column()
  countryId: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 5,
  })
  longitude: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 5,
  })
  latitude: number;

  @ManyToOne(type => Province, province => province.cities)
  province: Province;
}
