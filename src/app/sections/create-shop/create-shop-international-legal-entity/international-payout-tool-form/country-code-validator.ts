import { FormControl } from '@angular/forms';

import { CountryCodes } from '../country-codes';

export const countryCodeValidator = (control: FormControl) =>
    CountryCodes[control.value] !== undefined || !control.value ? null : { unknownCountryCode: true };
