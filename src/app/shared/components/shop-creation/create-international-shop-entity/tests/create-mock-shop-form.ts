import { AbstractControl, FormControl, FormGroup } from '@ngneat/reactive-forms';
import isNil from 'lodash-es/isNil';

import { InternationalShopEntityFormValue } from '../types/international-shop-entity-form-value';
import { createMockPayoutToolForm } from './create-mock-payout-tool-form';

export function createMockShopForm<T extends AbstractControl = AbstractControl>(
    params?: { [key in keyof InternationalShopEntityFormValue]?: T }
): FormGroup<InternationalShopEntityFormValue> {
    const mainParams = {
        shopUrl: new FormControl<string>(''),
        shopName: new FormControl<string>(''),
        organizationName: new FormControl<string>(''),
        tradingName: new FormControl<string>(''),
        registeredAddress: new FormControl<string>(''),
        actualAddress: new FormControl<string>(''),
        country: new FormControl<string>(''),
        category: new FormControl<any>(''),
        paymentInstitution: new FormControl<any>(''),
        payoutTool: createMockPayoutToolForm(),
    };

    if (isNil(params)) {
        return new FormGroup<InternationalShopEntityFormValue>(mainParams);
    }

    return new FormGroup({
        ...mainParams,
        ...params,
    });
}
