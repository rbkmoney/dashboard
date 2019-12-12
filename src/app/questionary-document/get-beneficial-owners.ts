import { Questionary, BeneficialOwner } from '../api-codegen/questionary';
import { isRussianIndividualEntityQuestionary, isRussianLegalEntityQuestionary } from '../api';

export function getBeneficialOwners(questionary: Questionary): BeneficialOwner[] | null {
    let beneficialOwners: BeneficialOwner[] = [];
    if (isRussianIndividualEntityQuestionary(questionary)) {
        beneficialOwners = questionary.data.contractor.individualEntity.beneficialOwners;
    } else if (isRussianLegalEntityQuestionary(questionary)) {
        beneficialOwners = questionary.data.contractor.legalEntity.beneficialOwner;
    } else {
        console.error('Unknown questionary');
        return null;
    }
    return beneficialOwners;
}
