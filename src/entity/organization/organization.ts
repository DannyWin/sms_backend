import { EntityModel } from '@midwayjs/orm';
import { Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import Base from '../base';
import User from '../user/user';
import Role from '../role/role';
import Address from '../address/address';

@EntityModel()
export default class Organization extends Base {
  @Column()
  pid: number;

  @Column({
    length: 30,
  })
  name: string;

  @Column('text')
  description: string;

  @Column({
    length: 20,
  })
  phone: string;

  @Column()
  employeeCount: number;

  @OneToOne(type => Address, address => address.organization)
  @JoinColumn()
  address: Address;

  @OneToMany(type => User, user => user.organization)
  users: User[];

  @OneToMany(type => Role, role => role.organization)
  roles: Role[];
}
