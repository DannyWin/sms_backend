import { EntityModel } from '@midwayjs/orm';
import { Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import Base from './base/base';
import User from './user';
import Role from './role';
import Address from './address';

@EntityModel()
export default class Organization extends Base {
    @Column({ nullable: true })
    pid: number;

    @Column({ length: 30, nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ nullable: true })
    employeeCount: number;

    @OneToOne(type => Address, address => address.organization)
    @JoinColumn()
    address: Address;

    @OneToMany(type => User, user => user.organization)
    users: User[];

    @OneToMany(type => Role, role => role.organization)
    roles: Role[];
}
