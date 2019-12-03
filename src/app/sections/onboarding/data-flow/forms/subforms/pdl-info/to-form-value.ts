import get from 'lodash.get';

import { FormValue } from '../../form-value';
import { BeneficialOwner, LegalOwnerInfo } from '../../../../../../api-codegen/questionary';

export const toPdlInfo = (i: BeneficialOwner | LegalOwnerInfo): FormValue => ({
    pdlCategory: get(i, ['pdlCategory'], null),
    pdlRelationDegree: get(i, ['pdlRelationDegree'], null)
});
