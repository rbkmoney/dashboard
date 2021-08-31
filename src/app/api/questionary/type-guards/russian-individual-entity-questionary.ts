import { Overwrite } from 'utility-types';

import {
    Contractor,
    IndividualEntity,
    IndividualEntityContractor,
    IndividualRegistrationInfo,
    IndividualResidencyInfo,
    Questionary,
    QuestionaryData,
    RussianIndividualEntity,
} from '@dsh/api-codegen/questionary';

type RussianIndividualEntityContractor = Overwrite<
    IndividualEntityContractor,
    {
        individualEntity: Overwrite<
            RussianIndividualEntity,
            {
                residencyInfo: IndividualResidencyInfo;
                registrationInfo: IndividualRegistrationInfo;
            }
        >;
    }
>;
type RussianIndividualEntityQuestionaryData = Overwrite<
    QuestionaryData,
    { contractor: RussianIndividualEntityContractor }
>;

export type RussianIndividualEntityQuestionary = Overwrite<
    Questionary,
    { data: RussianIndividualEntityQuestionaryData }
>;

export const isRussianIndividualEntityContractor = (
    contractor: IndividualEntityContractor
): contractor is RussianIndividualEntityContractor =>
    contractor.contractorType === Contractor.ContractorTypeEnum.IndividualEntityContractor &&
    contractor.individualEntity.individualEntityType ===
        IndividualEntity.IndividualEntityTypeEnum.RussianIndividualEntity;

export function isRussianIndividualEntityQuestionary(
    questionary: Questionary
): questionary is RussianIndividualEntityQuestionary {
    return questionary?.data?.contractor && isRussianIndividualEntityContractor(questionary.data.contractor);
}
