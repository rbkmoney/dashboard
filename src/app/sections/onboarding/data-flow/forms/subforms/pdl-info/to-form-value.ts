import get from 'lodash.get';

import { BeneficialOwner, LegalOwnerInfo } from '@dsh/api-codegen/questionary';

import { FormValue } from '../../form-value';

export const toPdlInfo = (i: BeneficialOwner | LegalOwnerInfo): FormValue => ({
    pdlCategory: get(i, ['pdlCategory'], null),
    pdlRelationDegree: get(i, ['pdlRelationDegree'], null),
});
