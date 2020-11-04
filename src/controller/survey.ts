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
        const roles = await this.roleService.getRolesByUserId(user.id);
        const surveys = [];
        for (const role of roles) {
            surveys.push(...(await this.surveyService.getSurveysByRoleId(role.id)));
        }
        return { ...request_success, data: { surveys } };
    }
}
