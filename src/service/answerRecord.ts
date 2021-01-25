import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { IAnswerRecordService } from '../interface/ianswerRecord';
import AnswerRecord from '../entity/answerRecord';
import Survey from '../entity/survey';
import User from '../entity/user';
import { IAnswerOptions } from '../interface/ianswer';
import Question from '../entity/question';
import AnswerDateRange from '../entity/answerDateRange';

@Provide()
export class AnswerRecordService implements IAnswerRecordService {
    @InjectEntityModel(Question)
    questionRepository: Repository<Question>;
    @InjectEntityModel(Survey)
    surveyRepository: Repository<Survey>;
    @InjectEntityModel(AnswerRecord)
    answerRecordRepository: Repository<AnswerRecord>;
    @InjectEntityModel(AnswerDateRange)
    answerDateRangeRepository: Repository<AnswerDateRange>;
    @InjectEntityModel(User)
    userRepository: Repository<User>;

    async addAnswerRecord(surveyRecordId: number, answers: IAnswerOptions[]): Promise<number> {
        let count = 0;
        for (const qa of answers) {
            // answers.forEach(async qa => {
            const correctAnswerId = await (await this.questionRepository.findOne(qa.qid, { relations: ['answer'] })).answer.id;
            const record = new AnswerRecord();
            if (qa.startDate && qa.endDate) {
                const dateRange = new AnswerDateRange();
                dateRange.startDate = qa.startDate;
                dateRange.endDate = qa.endDate;
                await this.answerDateRangeRepository.save(dateRange);
                record.answerDateRange = dateRange;
            }

            await this.answerRecordRepository.save(record);
            count++;

            await this.answerRecordRepository.createQueryBuilder().relation(AnswerRecord, 'question').of(record).set(qa.qid);
            await this.answerRecordRepository.createQueryBuilder().relation(AnswerRecord, 'answer').of(record).set(correctAnswerId);
            await this.answerRecordRepository.createQueryBuilder().relation(AnswerRecord, 'surveyRecord').of(record).set(surveyRecordId);

            // });
        }
        return count;
    }
    async getAnswerRecordsByUserId(userId: number): Promise<AnswerRecord[]> {
        return await this.answerRecordRepository
            .createQueryBuilder('AnswerRecord')
            .innerJoinAndSelect('AnswerRecord.user', 'user', 'user.id=:userId', { userId: userId })
            .select(['AnswerRecord.surveyId', 'user.id', 'AnswerRecord.surveyDate'])
            .printSql()
            .getMany();
    }
}
