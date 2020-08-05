import {
    Contractor,
    InternationalLegalEntity,
    LegalEntity,
    LegalEntityContractorary';

import { Replace } from '../../../../type-utils';

type InternationalLegalEntityContractor = Replace<
    LegalEntityContractor,
    {
        legalEntity: Replace<LegalEntity, InternationalLegalEntity>;
    }
>;
// type LegalEntityQuestionaryData = Replace<QuestionaryData,
//     { contractor: InternationalLegalEntityContractor }>;

// export type InternationalEntityQuestionary = Replace<Questionary, { data: LegalEntityQuestionaryData }>;

export const isInternationalLegalEntityContractor = (
    contractor: LegalEntityContractor
): contractor is InternationalLegalEntityContractor =>
    contractor.contractorType === Contractor.ContractorTypeEnum.LegalEntityContractor &&
    contractor.legalEntity.legalEntityType === LegalEntity.LegalEntityTypeEnum.InternationalLegalEntity;

// // WHERE TO USE?
// export function isInternationalLegalEntityQuestionary(
//     questionary: Questionary
// ): questionary is InternationalEntityQuestionary {
//     return questionary?.data?.contractor && isInternationalLegalEntityContractor(questionary.data.contractor);
// }
