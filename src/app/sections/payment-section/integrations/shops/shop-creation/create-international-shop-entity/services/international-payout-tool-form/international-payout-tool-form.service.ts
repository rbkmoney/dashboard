import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup } from '@ngneat/reactive-forms';
import isEmpty from 'lodash-es/isEmpty';

import { CountryCodesService } from '@dsh/app/shared/services/country-codes/country-codes.service';

import { InternationalBankAccountFormValue } from '../../types/international-bank-account-form-value';
import { payoutToolFormValidator } from './payout-tool-form-validator';

@Injectable()
export class InternationalPayoutToolFormService {
    constructor(private fb: FormBuilder, private countryCodes: CountryCodesService) {}

    getForm(): FormGroup<InternationalBankAccountFormValue> {
        return this.fb.group(
            {
                number: ['', [Validators.pattern(/^[0-9A-Z]{8,40}$/)]],
                iban: ['', [Validators.pattern(/^[A-Z0-9]{14,35}$/)]],
                bic: ['', [Validators.pattern(/^([A-Z0-9]{8}|[A-Z0-9]{11})$/)]],
                abaRtn: ['', [Validators.pattern(/^[0-9]{9}$/)]],
                name: ['', [Validators.maxLength(100)]],
                country: ['', [Validators.pattern(/^[A-Z]{3}$/), this.countryCodeValidator.bind(this)]],
                address: ['', [Validators.maxLength(1000)]],
            },
            { validator: payoutToolFormValidator }
        );
    }

    private countryCodeValidator(
        control: FormControl<InternationalBankAccountFormValue['country']>
    ): { unknownCountryCode: boolean } | null {
        return isEmpty(control.value) || this.countryCodes.isCountryExist(control.value)
            ? null
            : { unknownCountryCode: true };
    }
}
