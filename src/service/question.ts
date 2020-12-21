import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import Question from '../entity/question';
import { IQuestionService } from '../interface/iquestion';

@Provide()
export class QuestionService implements IQuestionService {
    @InjectEntityModel(Question)
    questionRepository: Repository<Question>;

    /**
     * 通过surveyId获取问题
     *
     * @param {number} surveyId
     * @return Question[]
     */
    async getQuestionsBySurveyId(surveyId: number): Promise<Question[]> {
        return await this.questionRepository.createQueryBuilder('question').leftJoin('question.surveys', 'survey', 'survey.id =:surveyId', { surveyId: surveyId }).printSql().getMany();
    }
}
