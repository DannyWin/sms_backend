import { EntityModel } from '@midwayjs/orm';
import { Column,OneToMany } from 'typeorm';
import Base from '../base';
import Province from './province';


@EntityModel()
export default class Country extends Base {
  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 10,
  })
  code: string;

  @Column({
    length: 10,
  })
  timeZone: string;

  @Column({
    length: 30,
  })
  continent: string;

  @OneToMany(type => Province, province => province.country)
  provinces: Province[];
}
