import { BeneficialOwner } from '../../../api-codegen/questionary';
import { DocDef } from './create-questionary';
import { getDocDef, getData } from './beneficial-owner';

export function getBeneficialOwnerDocDef(
    beneficialOwner: BeneficialOwner,
    companyName: string,
    companyInn: number
): DocDef {
    return getDocDef(getData(beneficialOwner, companyName, companyInn));
}
