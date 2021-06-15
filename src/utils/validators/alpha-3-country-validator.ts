import { FormControl } from '@ngneat/reactive-forms';
import { ValidationErrors } from '@ngneat/reactive-forms/lib/types';
import isNil from 'lodash-es/isNil';

import { CountryCodes } from './country-codes';

export function alpha3CountryValidator(
    control: FormControl<string>
): ValidationErrors<{ unknownCountryCode: boolean }> {
    return isNil(CountryCodes[control.value]) ? { unknownCountryCode: true } : null;
}
