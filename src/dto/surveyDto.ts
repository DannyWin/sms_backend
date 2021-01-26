import Question from '../entity/question';

export default class SurveyDto {
    id: number;
    name: string;

    description: string;

    expectedCount: number;

    startDate: Date;

    endDate: Date;

    finished: boolean;

    submitCount: number;

    questions: Question[];
}
