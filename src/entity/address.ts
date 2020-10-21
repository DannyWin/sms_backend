import { EntityModel } from '@midwayjs/orm';
import { Column, OneToOne, JoinColumn } from 'typeorm';
import Base from './base/base';
import Organization from './organization';
import City from './city';

@EntityModel()
export default class Address extends Base {
    @Column({ type: 'text', nullable: true })
    address: string;

    @OneToOne(type => City)
    @JoinColumn()
    city: City;

    @OneToOne(type => Organization, organization => organization.address)
    organization: Organization;
}
