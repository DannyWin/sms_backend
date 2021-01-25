import { Controller, Get, Post, Provide, Inject, Param, Body, ALL } from '@midwayjs/decorator';
import { ISurveyService } from '../interface/isurvey';
import { IRoleService } from '../interface/irole';
import { IUserService } from '../interface/iuser';
import { IToken } from '../utility/interface';
import { query_resourceNotFound, request_success, unknown_error } from '../common/constant';
import { IAnswerOptions } from '../interface/ianswer';
import { ISurveyRecordService } from '../interface/isurveyRecord';
import { IAnswerRecordService } from '../interface/ianswerRecord';
import Survey from '../entity/survey';

@Provide()
@Controller('/')
export class SurveyController {
    @Inject()
    surveyService: ISurveyService;
    @Inject()
    surveyRecordService: ISurveyRecordService;
    @Inject()
    answerRecordService: IAnswerRecordService;
    @Inject()
    roleService: IRoleService;
    @Inject()
    userService: IUserService;
    @Inject()
    token: IToken;

    @Get('/survey')
    async getSurvey() {
        const uid = this.token.decodeToken.uid;
        const user = await this.userService.getUserByUid(uid);
        const roleIds = user.roles.map(role => role.id);
        const surveys = await this.surveyService.getSurveysByRoleIds(roleIds);

        return { ...request_success, data: { surveys } };
    }

    @Post('/survey/:surveyId/answer')
    async updateAnswer(@Param() surveyId: string, @Body(ALL) body: IAnswerOptions[]) {
        const uid = this.token.decodeToken.uid;
        const user = await this.userService.getUserByUid(uid);
        const roleIds = user.roles.map(role => role.id);
        const surveys = await this.surveyService.getSurveysByRoleIds(roleIds);
        const survey = surveys.find(s => s.id === parseInt(surveyId)) as Survey;
        const now = new Date();
        if (survey && survey.startDate <= now && now <= survey.endDate) {
            const surveyRecord = await this.surveyRecordService.addSurveyRecord(user.id, parseInt(surveyId));
            if (surveyRecord) {
                await this.answerRecordService.addAnswerRecord(surveyRecord.id, body);
                return { ...request_success };
            } else {
                throw unknown_error;
            }
        } else {
            throw query_resourceNotFound(` surveyId:${surveyId} `);
        }
    }
}
