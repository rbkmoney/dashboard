import { FormGroup, ValidatorFn } from '@ngneat/reactive-forms';
import isEmpty from 'lodash-es/isEmpty';

import { InternationalBankAccountFormValue } from '../../types/international-bank-account-form-value';

// bic | iban | abaRtn | country & address & name should be provided;
export const payoutToolFormValidator: ValidatorFn = (
    form: FormGroup<InternationalBankAccountFormValue>
): { error: boolean } | null => {
    const { bic, iban, abaRtn, country, address, name } = form.controls;

    const isValidNumbers = [
        !isEmpty(bic.value) && bic.valid,
        !isEmpty(iban.value) && iban.valid,
        !isEmpty(abaRtn.value) && abaRtn.valid,
    ].some((valid: boolean) => valid); // multi "or" alternative

    const isValidGeo = [
        !isEmpty(country.value) && country.valid,
        !isEmpty(address.value) && address.valid,
        !isEmpty(name.value) && name.valid,
    ].every((valid: boolean) => valid); // multi "and" alternative

    return isValidNumbers || isValidGeo ? null : { error: true };
};
