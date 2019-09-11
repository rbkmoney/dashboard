import {
    Questionary,
    IndividualEntityContractor,
    RussianIndividualEntity,
    QuestionaryData
} from '../../../api-codegen/questionary';
import { Replace } from '../../../../type-utils';

export type RussianIndividualEntityQuestionary = Replace<
    Questionary,
    {
        data: Replace<
            QuestionaryData,
            { contractor: Replace<IndividualEntityContractor, { individualEntity: RussianIndividualEntity }> }
        >;
    }
>;
