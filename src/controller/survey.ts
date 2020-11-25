import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';
import { ISurveyService } from '../interface/isurvey';
import { IRoleService } from '../interface/irole';
import { IUserService } from '../interface/iuser';
import { IToken } from '../utility/interface';
import { request_success } from '../common/constant';

@Provide()
@Controller('/')
export class SurveyController {
    @Inject()
    surveyService: ISurveyService;
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
        console.log(user);
        // const roles = await this.roleService.getRolesByUserId(user.id);

        //console.log(roles);
        let surveys = [];
        const questions = [];
        for (const role of user.roles) {
            // surveys.push(...(await this.surveyService.getSurveysByRoleId(role.id)));
            const surveyArr = await role.surveys;
            for (const survey of surveyArr) {
                await survey.questions;
            }

            console.log(questions);
            surveys = surveys.concat(await role.surveys);
        }
        return { ...request_success, data: { surveys } };
    }
}
