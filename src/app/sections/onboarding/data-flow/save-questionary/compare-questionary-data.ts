import { QuestionaryData } from '../../../../api-codegen/questionary';

export const compareQuestionaryData = (x: QuestionaryData, y: QuestionaryData): boolean =>
    JSON.stringify(x) === JSON.stringify(y);
