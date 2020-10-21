import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import Base from './base/base';
import Province from './province';

@EntityModel()
export default class Country extends Base {
    @Column({ length: 50, nullable: true })
    name: string;

    @Column({ length: 10, nullable: true })
    code: string;

    @Column({ length: 10, nullable: true })
    timeZone: string;

    @Column({ length: 30, nullable: true })
    continent: string;

    @OneToMany(type => Province, province => province.country)
    provinces: Province[];
}
