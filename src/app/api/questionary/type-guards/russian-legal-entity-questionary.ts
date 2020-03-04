import { Overwrite } from 'utility-types';

import {
    Questionary,
    LegalEntityContractor,
    RussianLegalEntity,
    QuestionaryData,
    Contractor,
    LegalResidencyInfo,
    LegalRegistrationInfo
} from '../../../api-codegen/questionary';

type RussianLegalEntityContractor = Overwrite<
    LegalEntityContractor,
    {
        legalEntity: Overwrite<
            RussianLegalEntity,
            {
                residencyInfo: LegalResidencyInfo;
                registrationInfo: LegalRegistrationInfo;
            }
        >;
    }
>;
type RussianLegalEntityQuestionaryData = Overwrite<
    QuestionaryData,
    {
        contractor: RussianLegalEntityContractor;
    }
>;
export type RussianLegalEntityQuestionary = Overwrite<
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
