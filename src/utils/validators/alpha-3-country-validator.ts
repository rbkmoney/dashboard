import { FormControl } from '@ngneat/reactive-forms';
import { ValidationErrors } from '@ngneat/reactive-forms/lib/types';

import { CountryCodes } from './country-codes';

export function alpha3CountryValidator(
    control: FormControl<string>
): ValidationErrors<{ unknownCountryCode: boolean }> {
    return CountryCodes[control.value] ? null : { unknownCountryCode: true };
}
