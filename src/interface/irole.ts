import Role from '../entity/role';

/**
 * @description Role-Service abstractions
 */
export interface IRoleService {
    getRolesByUserId(userId: number): Promise<Role[]>;
}
