import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ISurveyRecordService } from '../interface/isurveyRecord';
import SurveyRecord from '../entity/surveyRecord';
import Survey from '../entity/survey';
import User from '../entity/user';

@Provide()
export class SurveyRecordService implements ISurveyRecordService {
    @InjectEntityModel(Survey)
    surveyRepository: Repository<Survey>;
    @InjectEntityModel(SurveyRecord)
    surveyRecordRepository: Repository<SurveyRecord>;
    @InjectEntityModel(User)
    userRepository: Repository<User>;

    async addSurveyRecord(userId: number, surveyId: number): Promise<SurveyRecord> {
        // const survey = await this.surveyRepository.findOne(surveyId, { relations: ['surveyRecords'] });
        // const user = await this.userRepository.findOne(userId, { relations: ['surveyRecords'] });
        // const record = new SurveyRecord();
        // record.surveyDate = new Date();
        // try {
        //     survey.surveyRecords.push(record);
        //     user.surveyRecords.push(record);
        //     await this.surveyRepository.save(survey);
        //     await this.userRepository.save(user);
        //     await this.surveyRecordRepository.save(record);
        //     return true;
        // } catch (e) {
        //     return false;
        // }
        const record = new SurveyRecord();
        record.surveyDate = new Date();
        await this.surveyRecordRepository.save(record);
        //const user = await this.userRepository.findOne(userId);
        try {
            await this.surveyRecordRepository.createQueryBuilder().relation(SurveyRecord, 'user').of(record).set(userId);
            await this.surveyRecordRepository.createQueryBuilder().relation(SurveyRecord, 'survey').of(record).set(surveyId);
            return record;
        } catch (e) {
            return null;
        }
    }
    async getSurveyRecordsByUserId(userId: number): Promise<SurveyRecord[]> {
        return await this.surveyRecordRepository
            .createQueryBuilder('surveyRecord')
            .innerJoinAndSelect('surveyRecord.user', 'user', 'user.id=:userId', { userId: userId })
            .select(['surveyRecord.surveyId', 'user.id', 'surveyRecord.surveyDate'])
            .printSql()
            .getMany();
    }

    async getSurveyRecordsCountByUserIdAndSurveyId(userId: number, surveyId: number): Promise<number> {
        const result = await this.surveyRecordRepository
            .createQueryBuilder('surveyRecord')
            .innerJoinAndSelect('surveyRecord.user', 'user', 'user.id=:userId', { userId: userId })
            .innerJoinAndSelect('surveyRecord.survey', 'survey', 'survey.id=:surveyId', { surveyId: surveyId })
            .select('COUNT(*)', 'count')
            .printSql()
            .getRawOne();
        return result.count;
    }
}
