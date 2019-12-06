import { Questionary } from '../../../api-codegen/questionary';
import {
    getData as getRussianIndividualEntityData,
    getDocDef as getRussianIndividualEntityDocDef,
    isRussianIndividualEntityQuestionary
} from './russian-individual-entity';
import {
    getData as getRussianLegalEntityData,
    getDocDef as getRussianLegalEntityDocDef,
    isRussianLegalEntityQuestionary
} from './russian-legal-entity';
import { DocDef } from './create-questionary';

export function getEntityQuestionaryDocDef(questionary: Questionary): DocDef {
    if (isRussianIndividualEntityQuestionary(questionary)) {
        return getRussianIndividualEntityDocDef(getRussianIndividualEntityData(questionary));
    } else if (isRussianLegalEntityQuestionary(questionary)) {
        return getRussianLegalEntityDocDef(getRussianLegalEntityData(questionary));
    }
    console.error('Unknown questionary');
}
