import { Replace } from '../../../../type-utils';
import {
    Contractor,
    IndividualEntityContractor,
    IndividualRegistrationInfo,
    IndividualResidencyInfo,
    Questionary,
    QuestionaryData,
    RussianIndividualEntity
} from '../../../api-codegen/questionary';

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
