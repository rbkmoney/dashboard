import get from 'lodash.get';
import * as moment from 'moment';

import { RussianDomesticPassport } from '../../../../../../api-codegen/questionary';
import { FormValue } from '../../form-value';

export const toRussianDomesticPassport = (i: RussianDomesticPassport): FormValue => ({
    seriesNumber: get(i, ['seriesNumber'], null),
    issuer: get(i, ['issuer'], null),
    issuerCode: get(i, ['issuerCode'], null),
    issuedAt: get(
        i,
        ['issuedAt'],
        moment()
            .utc()
            .format()
    )
});
