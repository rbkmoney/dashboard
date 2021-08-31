import { Overwrite } from 'utility-types';

import {
    Contractor,
    LegalEntity,
    LegalEntityContractor,
    LegalRegistrationInfo,
    LegalResidencyInfo,
    Questionary,
    QuestionaryData,
    RussianLegalEntity,
} from '@dsh/api-codegen/questionary';

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

export const isRussianLegalEntityContractor = (
    contractor: LegalEntityContractor
): contractor is RussianLegalEntityContractor =>
    contractor.contractorType === Contractor.ContractorTypeEnum.LegalEntityContractor &&
    contractor.legalEntity.legalEntityType === LegalEntity.LegalEntityTypeEnum.RussianLegalEntity;

export function isRussianLegalEntityQuestionary(
    questionary: Questionary
): questionary is RussianLegalEntityQuestionary {
    return questionary?.data?.contractor && isRussianLegalEntityContractor(questionary.data.contractor);
}
