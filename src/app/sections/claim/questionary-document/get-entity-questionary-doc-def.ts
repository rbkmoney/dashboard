import { Questionary } from '../../../api-codegen/questionary';
import { getDocDef as getRussianIndividualEntityDocDef } from './russian-individual-entity';
import { getDocDef as getRussianLegalEntityDocDef } from './russian-legal-entity';
import { DocDef } from './create-questionary';
import { isRussianLegalEntityQuestionary, isRussianIndividualEntityQuestionary } from '../../../api';

export function getEntityQuestionaryDocDef(questionary: Questionary): DocDef {
    if (isRussianIndividualEntityQuestionary(questionary)) {
        return getRussianIndividualEntityDocDef(questionary);
    } else if (isRussianLegalEntityQuestionary(questionary)) {
        return getRussianLegalEntityDocDef(questionary);
    }
    console.error('Unknown questionary');
    return null;
}
