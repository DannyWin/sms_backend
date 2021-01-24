import SurveyRecord from '../entity/surveyRecord';

/**
 * @description Survey-Service abstractions
 */
export interface ISurveyRecordService {
    addSurveyRecord(userId: number, surveyId: number): Promise<SurveyRecord>;
    getSurveyRecordsByUserId(userId: number): Promise<SurveyRecord[]>;
}
