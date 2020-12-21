import { Controller, Get, Provide, Inject, Param } from '@midwayjs/decorator';
import { IQuestionService } from '../interface/iquestion';
import { IToken } from '../utility/interface';
import { request_success } from '../common/constant';

@Provide()
@Controller('/')
export class QuestionController {
    @Inject()
    questionService: IQuestionService;
    @Inject()
    token: IToken;

    @Get('/survey/:surveyId/question')
    async getQuestion(@Param() surveyId: number) {
        const questions = await this.questionService.getQuestionsBySurveyId(surveyId);

        return { ...request_success, data: { questions } };
    }
}
