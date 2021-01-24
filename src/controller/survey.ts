import { Controller, Get, Post, Provide, Inject, Param, Body, ALL } from '@midwayjs/decorator';
import { ISurveyService } from '../interface/isurvey';
import { IRoleService } from '../interface/irole';
import { IUserService } from '../interface/iuser';
import { IToken } from '../utility/interface';
import { query_resourceNotFound, request_success, unknown_error } from '../common/constant';
import { IAnswerOptions } from '../interface/ianswer';
import { ISurveyRecordService } from '../interface/isurveyRecord';
import { IAnswerRecordService } from '../interface/ianswerRecord';

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
        if (surveys.map(survey => survey.id).includes(parseInt(surveyId))) {
            const surveyRecord = await this.surveyRecordService.addSurveyRecord(user.id, parseInt(surveyId));
            if (surveyRecord) {
                const count = await this.answerRecordService.addAnswerRecord(surveyRecord.id, body);
                console.log(count);
                return { ...request_success };
            } else {
                throw unknown_error;
            }
        } else {
            throw query_resourceNotFound(`surveyId:${surveyId}`);
        }
    }
}
