import { Replace } from '../../../../type-utils';
import {
    Contractor,
    IndividualEntity,
    IndividualEntityContractor,
    IndividualRegistrationInfo,
    IndividualResidencyInfo,
    Questionary,
    QuestionaryData,
    RussianIndividualEntity,
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
