import { EntityModel } from '@midwayjs/orm';
import { Column, OneToMany } from 'typeorm';
import Base from '../base';
import RoleModule from '../role/roleModule';

@EntityModel()
export default class Module extends Base {
  @Column()
  pid: number;

  @Column({
    length: 30,
  })
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  url: string;

  @Column('text')
  api: string;

  @OneToMany(type => RoleModule, roleModule => roleModule.module)
  roleModules: RoleModule[];
}
