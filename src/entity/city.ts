import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne } from 'typeorm';
import Base from './base/base';
import Province from './province';

@EntityModel()
export default class City extends Base {
    @Column({ length: 50, nullable: true })
    name: string;

    @Column({ nullable: true })
    provinceId: number;

    @Column({ nullable: true })
    countryId: number;

    @Column({
        type: 'decimal',
        precision: 8,
        scale: 5,
        nullable: true,
    })
    longitude: number;

    @Column({
        type: 'decimal',
        precision: 8,
        scale: 5,
        nullable: true,
    })
    latitude: number;

    @ManyToOne(type => Province, province => province.cities)
    province: Province;
}
