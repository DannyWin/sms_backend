import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import Base from './base/base';
import Country from './country';
import City from './city';

@EntityModel()
export default class Province extends Base {
    @Column({ length: 50, nullable: true })
    name: string;

    @ManyToOne(type => Country, country => country.provinces)
    country: Country;

    @OneToMany(type => City, city => city.province)
    cities: City[];
}
