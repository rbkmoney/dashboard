import {
    Questionary,
    IndividualEntityContractor,
    RussianIndividualEntity,
    QuestionaryData,
    Contractor
} from '../../../api-codegen/questionary';
import { Replace } from '../../../../type-utils';

type RussianIndividualEntityContractor = Replace<
    IndividualEntityContractor,
    { individualEntity: RussianIndividualEntity }
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
