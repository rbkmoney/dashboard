import { Questionary, BeneficialOwner } from '../../../api-codegen/questionary';
import { isRussianIndividualEntityQuestionary } from './russian-individual-entity';
import { isRussianLegalEntityQuestionary } from './russian-legal-entity';

export function getBeneficialOwners(questionary: Questionary): BeneficialOwner[] {
    let beneficialOwners: BeneficialOwner[] = [];
    if (isRussianIndividualEntityQuestionary(questionary)) {
        beneficialOwners = questionary.data.contractor.individualEntity.beneficialOwners;
    } else if (isRussianLegalEntityQuestionary(questionary)) {
        beneficialOwners = questionary.data.contractor.legalEntity.beneficialOwner;
    } else {
        console.error('Unknown questionary');
        return;
    }
    return beneficialOwners;
}
