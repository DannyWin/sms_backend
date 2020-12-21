import Survey from '../entity/survey';

/**
 * @description Survey-Service abstractions
 */
export interface ISurveyService {
    getSurveysByRoleId(roleId: number): Promise<Survey[]>;
    getSurveysByRoleIds(roleIds: number[]): Promise<Survey[]>;
}
