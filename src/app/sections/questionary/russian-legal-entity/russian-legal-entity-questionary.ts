import {
    Questionary,
    LegalEntityContractor,
    RussianLegalEntity,
    QuestionaryData,
    Contractor
} from '../../../api-codegen/questionary';
import { Replace } from '../../../../type-utils';

type RussianLegalEntityContractor = Replace<LegalEntityContractor, { legalEntity: RussianLegalEntity }>;
type RussianLegalEntityQuestionaryData = Replace<QuestionaryData, { contractor: RussianLegalEntityContractor }>;

export type RussianLegalEntityQuestionary = Replace<Questionary, { data: RussianLegalEntityQuestionaryData }>;

export function isRussianLegalEntityQuestionary(
    questionary: Questionary
): questionary is RussianLegalEntityQuestionary {
    return questionary.data.contractor.contractorType === Contractor.ContractorTypeEnum.LegalEntity;
}
