import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { AbstractControlsOf } from '@ngneat/reactive-forms/lib/types';
import isNil from 'lodash-es/isNil';

import { ShopDetailsForm } from '@dsh/app/shared/components/shop-creation/shop-details-form/shop-details-form.component';

import { InternationalShopEntityFormValue } from '../types/international-shop-entity-form-value';
import { createMockPayoutToolForm } from './create-mock-payout-tool-form';

export function createMockShopForm(
    params?: Partial<AbstractControlsOf<InternationalShopEntityFormValue>>
): FormGroup<InternationalShopEntityFormValue> {
    const mainParams = {
        shopDetails: new FormControl<ShopDetailsForm>({
            url: '',
            name: '',
        }),
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

    return new FormGroup<InternationalShopEntityFormValue>({
        ...mainParams,
        ...params,
    });
}
