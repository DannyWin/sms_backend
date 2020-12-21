import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import Survey from '../entity/survey';
import Question from '../entity/question';
import RoleSurvey from '../entity/roleSurvey';
import { ISurveyService } from '../interface/isurvey';

@Provide()
export class SurveyService implements ISurveyService {
    @InjectEntityModel(Survey)
    surveyRepository: Repository<Survey>;
    @InjectEntityModel(RoleSurvey)
    roleSurveyRepository: Repository<RoleSurvey>;

    /**
     * 通过roleId获取问卷
     *
     * @param {number} roleId
     * @return Survey[]
     */
    async getSurveysByRoleId(roleId: number): Promise<Survey[]> {
        // const roleSurveys = await this.roleSurveyRepositoryc
        // const surveys = [];
        // for (const rs of roleSurveys) {
        //     surveys.push(await this.surveyRepository.find({ where: { id: rs.surveyId } }));
        // }
        // return surveys;
        // return await this.surveyRepository
        //     .createQueryBuilder('survey') //.find({ relations: ['RoleSurvey'], where: { roleId: roleId } });
        //     .innerJoinAndSelect('survey.roleSurveys', 'roleSurvey')
        //     .where(`roleSurvey.roleId = ${roleId}`)
        //     .getMany();

        return await this.surveyRepository
            .createQueryBuilder('survey')
            .innerJoin('survey.roleSurveys', 'roleSurvey', 'roleSurvey.roleId=:roleId', { roleId: roleId })
            .leftJoinAndSelect('survey.surveyQuestions', 'surveyQuestion', 'surveyQuestion.surveyId=survey.id')
            .leftJoinAndSelect('surveyQuestion.question', 'question', 'question.id=surveyQuestion.questionId')
            .printSql()
            .getMany();
    }

    /**
     * 通过roleIds获取问卷
     *
     * @param {number[]} roleIds
     * @return Survey[]
     */
    async getSurveysByRoleIds(roleIds: number[]): Promise<Survey[]> {
        return await this.surveyRepository.createQueryBuilder('survey').innerJoin('survey.roles', 'role', 'role.id in (:roleId)', { roleId: roleIds }).printSql().getMany();
    }
}
