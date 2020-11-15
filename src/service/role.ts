import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import Role from '../entity/role';
import { IRoleService } from '../interface/irole';

@Provide()
export class RoleService implements IRoleService {
    @InjectEntityModel(Role)
    roleRepository: Repository<Role>;

    /**
     * 通过roleId获取问卷
     *
     * @param uid
     * @return Role[]
     */
    async getRolesByUserId(userId: number): Promise<Role[]> {
        // return await this.roleRepository
        //     .createQueryBuilder('role') //.find({ relations: ['UserRole'], where: { userId: uid } });
        //     .innerJoinAndSelect('role.userRoles', 'userRole')
        //     .where(`userRole.userId = ${userId}`)
        //     .getMany();
        return await this.roleRepository
            .createQueryBuilder('role') //.find({ relations: ['UserRole'], where: { userId: uid } });
            .innerJoinAndSelect('role.userRoles', 'userRole')
            .where(`userRole.userId = ${userId}`)
            .getMany();
    }
}
