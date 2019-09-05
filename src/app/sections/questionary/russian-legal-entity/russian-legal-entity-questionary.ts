import {
    Questionary,
    LegalEntityContractor,
    RussianLegalEntity,
    QuestionaryData
} from '../../../api-codegen/questionary';
import { Replace } from '../replace';

export type RussianLegalEntityQuestionary = Replace<
    Questionary,
    {
        data: Replace<
            QuestionaryData,
            { contractor: Replace<LegalEntityContractor, { legalEntity: RussianLegalEntity }> }
        >;
    }
>;
