import { Overwrite } from 'utility-types';

import {
    Questionary,
    IndividualEntityContractor,
    RussianIndividualEntity,
    QuestionaryData,
    Contractor,
    IndividualResidencyInfo,
    IndividualRegistrationInfo
} from '../../../api-codegen/questionary';

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

export function isRussianIndividualEntityQuestionary(
    questionary: Questionary
): questionary is RussianIndividualEntityQuestionary {
    return questionary.data.contractor.contractorType === Contractor.ContractorTypeEnum.IndividualEntityContractor;
}
