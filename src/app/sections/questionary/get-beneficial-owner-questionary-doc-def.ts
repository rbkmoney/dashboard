import { Questionary } from '../../api-codegen/questionary';
import { DocDef } from './create-questionary';
import { getDocDef, getData } from './beneficial-owner';
import { isRussianIndividualEntityQuestionary } from './russian-individual-entity';
import { isRussianLegalEntityQuestionary } from './russian-legal-entity';

export function getBeneficialOwnerQuestionaryDocDef(questionary: Questionary): DocDef[] {
    const companyName = questionary.data.shopInfo.details.name;
    let beneficialOwners = [];
    if (isRussianIndividualEntityQuestionary(questionary)) {
        beneficialOwners = questionary.data.contractor.individualEntity.beneficialOwners;
    } else if (isRussianLegalEntityQuestionary(questionary)) {
        beneficialOwners = questionary.data.contractor.legalEntity.beneficialOwner;
    } else {
        console.error('Unknown questionary');
        return;
    }
    return beneficialOwners.map(beneficialOwner => getDocDef(getData(beneficialOwner, companyName)));
}
