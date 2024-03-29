import get from 'lodash-es/get';

import { RussianDomesticPassport } from '@dsh/api-codegen/questionary';

import { FormValue } from '../../form-value';

export const toRussianDomesticPassport = (i: RussianDomesticPassport): FormValue => ({
    seriesNumber: get(i, ['seriesNumber'], null),
    issuer: get(i, ['issuer'], null),
    issuerCode: get(i, ['issuerCode'], null),
    issuedAt: get(i, ['issuedAt'], null),
});
