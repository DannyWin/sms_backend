import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import Survey from '../entity/survey';
import { ISurveyService } from '../interface/isurvey';

@Provide()
export class SurveyService implements ISurveyService {
    @InjectEntityModel(Survey)
    surveyRepository: Repository<Survey>;

    /**
     * 通过roleId获取问卷
     *
     * @param {number} roleId
     * @return Survey[]
     */
    async getSurveysByRoleId(roleId: number): Promise<Survey[]> {
        return await this.surveyRepository
            .createQueryBuilder('survey') //.find({ relations: ['RoleSurvey'], where: { roleId: roleId } });
            .innerJoinAndSelect('survey.roleSurveys', 'roleSurvey')
            .where(`roleSurvey.roleId = ${roleId}`)
            .getMany();
    }
}
