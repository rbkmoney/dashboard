import {
    Questionary,
    LegalEntityContractor,
    RussianLegalEntity,
    QuestionaryData
} from '../../../api-codegen/questionary';
import { Replace } from '../../../../type-utils';

type RussianLegalEntityContractor = Replace<LegalEntityContractor, { legalEntity: RussianLegalEntity }>;
type RussianLegalEntityQuestionaryData = Replace<QuestionaryData, { contractor: RussianLegalEntityContractor }>;

export type RussianLegalEntityQuestionary = Replace<Questionary, { data: RussianLegalEntityQuestionaryData }>;
