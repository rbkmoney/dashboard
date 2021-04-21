import { Params } from '@angular/router';
import isNil from 'lodash-es/isNil';

import { BIN_LENGTH, PAN_LENGTH } from '../card-bin-pan-filter';
import { PaymentsFiltersData } from '../types/payments-filters-data';

export function getBinPanDataFromParams({ first6, last4 }: Params): PaymentsFiltersData['binPan'] | null {
    const bin = Number(first6);
    const pan = Number(last4);
    const isValidBin = !isNil(first6) && !isNaN(bin) && first6.length === BIN_LENGTH;
    const isValidPan = !isNil(last4) && !isNaN(pan) && last4.length === PAN_LENGTH;

    if (isValidBin || isValidPan) {
        return {
            paymentMethod: 'bankCard',
            bin: isValidBin ? first6 : null,
            pan: isValidPan ? last4 : null,
        };
    }

    return null;
}
