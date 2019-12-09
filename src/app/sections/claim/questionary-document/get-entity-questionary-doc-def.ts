import { Questionary } from '../../../api-codegen/questionary';
import {
    getDocDef as getRussianIndividualEntityDocDef,
    isRussianIndividualEntityQuestionary
} from './russian-individual-entity';
import { getDocDef as getRussianLegalEntityDocDef, isRussianLegalEntityQuestionary } from './russian-legal-entity';
import { DocDef } from './create-questionary';

export function getEntityQuestionaryDocDef(questionary: Questionary): DocDef {
    if (isRussianIndividualEntityQuestionary(questionary)) {
        return getRussianIndividualEntityDocDef(questionary);
    } else if (isRussianLegalEntityQuestionary(questionary)) {
        return getRussianLegalEntityDocDef(questionary);
    }
    console.error('Unknown questionary');
}
