import Question from '../entity/question';

/**
 * @description Question-Service abstractions
 */
export interface IQuestionService {
    getQuestionsBySurveyId(SurveyId: number): Promise<Question[]>;
}
