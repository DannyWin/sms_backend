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
        return await this.questionRepository
            .createQueryBuilder('question')
            .leftJoin('question.surveys', 'survey', 'survey.id =:surveyId', { surveyId: surveyId })
            .leftJoinAndSelect('question.options', 'option', 'option.id =optionId')
            .leftJoinAndSelect('question.sort', 'sort')
            //.leftJoinAndMapOne('question.sortName', 'question.sort.name', 'sort')
            .select(['question.id', 'question.content', 'option.id', 'option.content', 'sort.id'])
            .printSql()
            .getMany();
    }
}
