import { Questionary, Contractor } from '../../api-codegen/questionary';
import {
    getData as getRussianIndividualEntityData,
    getTemplateWithData as getRussianIndividualEntityTemplateWithData,
    RussianIndividualEntityQuestionary
} from './russian-individual-entity';
import {
    getData as getRussianLegalEntityData,
    getTemplateWithData as getRussianLegalEntityTemplateWithData,
    RussianLegalEntityQuestionary
} from './russian-legal-entity';
import { Data } from './create-questionary';

const ContractorType = Contractor.ContractorTypeEnum;

export function getQuestionaryTemplate(questionary: Questionary): Data {
    switch (questionary.data.contractor.contractorType) {
        case ContractorType.IndividualEntity:
            return getRussianIndividualEntityTemplateWithData(
                getRussianIndividualEntityData(questionary as RussianIndividualEntityQuestionary)
            );
        case ContractorType.LegalEntity:
            return getRussianLegalEntityTemplateWithData(
                getRussianLegalEntityData(questionary as RussianLegalEntityQuestionary)
            );
    }
    console.error('Unknown questionary');
}
