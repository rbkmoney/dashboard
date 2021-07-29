import { FormControl, FormGroup } from '@ngneat/reactive-forms';

import { InternationalBankAccountFormValue } from '../types/international-bank-account-form-value';

export function createMockPayoutToolForm(): FormGroup<InternationalBankAccountFormValue> {
    return new FormGroup<InternationalBankAccountFormValue>({
        number: new FormControl<string>(''),
        iban: new FormControl<string>(''),
        bic: new FormControl<string>(''),
        abaRtn: new FormControl<string>(''),
        name: new FormControl<string>(''),
        country: new FormControl<string>(''),
        address: new FormControl<string>(''),
        currency: new FormControl<string>(''),
    });
}
