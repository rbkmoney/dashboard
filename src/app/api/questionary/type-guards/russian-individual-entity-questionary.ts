import {
    Questionary,
    IndividualEntityContractor,
    RussianIndividualEntity,
    QuestionaryData,
    Contractor,
    IndividualResidencyInfo,
    IndividualRegistrationInfo
} from '../../../api-codegen/questionary';
import { Replace } from '../../../../type-utils';

type RussianIndividualEntityContractor = Replace<
    IndividualEntityContractor,
    {
        individualEntity: Replace<
            RussianIndividualEntity,
            {
                residencyInfo: IndividualResidencyInfo;
                registrationInfo: IndividualRegistrationInfo;
            }
        >;
    }
>;
type RussianIndividualEntityQuestionaryData = Replace<
    QuestionaryData,
    { contractor: RussianIndividualEntityContractor }
>;

export type RussianIndividualEntityQuestionary = Replace<Questionary, { data: RussianIndividualEntityQuestionaryData }>;

export function isRussianIndividualEntityQuestionary(
    questionary: Questionary
): questionary is RussianIndividualEntityQuestionary {
    return questionary.data.contractor.contractorType === Contractor.ContractorTypeEnum.IndividualEntityContractor;
}
