import AnswerRecord from '../entity/answerRecord';
import { IAnswerOptions } from './ianswer';

/**
 * @description Survey-Service abstractions
 */
export interface IAnswerRecordService {
    addAnswerRecord(surveyRecordId: number, answers: IAnswerOptions[]): Promise<number>;
    getAnswerRecordsByUserId(userId: number): Promise<AnswerRecord[]>;
}
