import { BeneficialOwner } from '../../../api-codegen/questionary';
import { DocDef } from './create-questionary';
import { getDocDef, getData } from './beneficial-owner';

export function getBeneficialOwnerDocDef(beneficialOwner: BeneficialOwner, companyName: string): DocDef {
    return getDocDef(getData(beneficialOwner, companyName));
}
