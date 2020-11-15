import { EntityModel } from '@midwayjs/orm';
import { Column, ManyToMany } from 'typeorm';
import Base from './base/base';
import Role from './role';

@EntityModel()
export default class Module extends Base {
    @Column({ nullable: true })
    pid: number;

    @Column({ length: 30, nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    url: string;

    @Column({ type: 'text', nullable: true })
    api: string;

    @ManyToMany(() => Role, (role: Role) => role.modules)
    roles: Role[];
}
