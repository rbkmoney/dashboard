import { Questionary, Contractor } from '../../api-codegen/questionary';
import {
    getData as getRussianIndividualEntityData,
    getDocDef as getRussianIndividualEntityDocDef,
    RussianIndividualEntityQuestionary
} from './russian-individual-entity';
import {
    getData as getRussianLegalEntityData,
    getDocDef as getRussianLegalEntityDocDef,
    RussianLegalEntityQuestionary
} from './russian-legal-entity';
import { DocDef } from './create-questionary';

const ContractorType = Contractor.ContractorTypeEnum;

export function getEntityQuestionaryTemplate(questionary: Questionary): DocDef {
    switch (questionary.data.contractor.contractorType) {
        case ContractorType.IndividualEntity:
            return getRussianIndividualEntityDocDef(
                getRussianIndividualEntityData(questionary as RussianIndividualEntityQuestionary)
            );
        case ContractorType.LegalEntity:
            return getRussianLegalEntityDocDef(getRussianLegalEntityData(questionary as RussianLegalEntityQuestionary));
    }
    console.error('Unknown questionary');
}
