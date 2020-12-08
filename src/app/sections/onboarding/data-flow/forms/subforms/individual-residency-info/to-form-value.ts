import get from 'lodash.get';

import { ResidencyInfo } from '@dsh/api-codegen/questionary';

import { FormValue } from '../../form-value';

export const toResidencyInfo = (i: ResidencyInfo): FormValue => ({
    usaTaxResident: get(i, ['usaTaxResident'], false),
    exceptUsaTaxResident: get(i, ['exceptUsaTaxResident'], false),
});
