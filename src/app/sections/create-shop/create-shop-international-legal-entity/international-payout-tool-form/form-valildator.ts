import { FormGroup, ValidationErrors } from '@angular/forms';

export const formValidator = (control: FormGroup): ValidationErrors | null => {
    const iban = control.get('iban');
    const bic = control.get('bic');
    const abaRtn = control.get('abaRtn');
    const name = control.get('name');
    const country = control.get('country');
    const address = control.get('address');

    const isValid =
        (!!iban.value && iban.valid) ||
        (!!bic.value && bic.valid) ||
        (!!abaRtn.value && abaRtn.valid) ||
        (!!name.value && name.valid && !!country.value && country.valid && !!address.value && address.valid);

    return isValid ? null : { error: true };
};
