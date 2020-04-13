import { Replace } from '../../../../type-utils';
import {
    Contractor,
    LegalEntityContractor,
    LegalRegistrationInfo,
    LegalResidencyInfo,
    Questionary,
    QuestionaryData,
    RussianLegalEntity
} from '../../../api-codegen/questionary';

type RussianLegalEntityContractor = Replace<
    LegalEntityContractor,
    {
        legalEntity: Replace<
            RussianLegalEntity,
            {
                residencyInfo: LegalResidencyInfo;
                registrationInfo: LegalRegistrationInfo;
            }
        >;
    }
>;
type RussianLegalEntityQuestionaryData = Replace<
    QuestionaryData,
    {
        contractor: RussianLegalEntityContractor;
    }
>;
export type RussianLegalEntityQuestionary = Replace<
    Questionary,
    {
        data: RussianLegalEntityQuestionaryData;
    }
>;

export function isRussianLegalEntityQuestionary(
    questionary: Questionary
): questionary is RussianLegalEntityQuestionary {
    return questionary.data.contractor.contractorType === Contractor.ContractorTypeEnum.LegalEntityContractor;
}
