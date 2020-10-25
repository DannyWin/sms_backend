import { Controller, Get, Provide, Inject } from '@midwayjs/decorator';
import { ISurveyService } from '../interface/isurvey';
import { IRoleService } from '../interface/irole';
import { IUserService } from '../interface/iuser';
import { IToken } from '../utility/interface';

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
        const roles = await this.roleService.getRolesByUserId(user.id);
        const survey = [];
        for (const role of roles) {
            survey.push(await this.surveyService.getSurveysByRoleId(role.id));
        }
        return survey;
    }
}
