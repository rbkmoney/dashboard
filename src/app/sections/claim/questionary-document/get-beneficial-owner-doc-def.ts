import { BeneficialOwner } from '../../../api-codegen/questionary';
import { DocDef } from './create-questionary';
import { getDocDef } from './beneficial-owner';

export function getBeneficialOwnerDocDef(
    beneficialOwner: BeneficialOwner,
    companyName: string,
    companyInn: string
): DocDef {
    return getDocDef(beneficialOwner, companyName, companyInn);
}
