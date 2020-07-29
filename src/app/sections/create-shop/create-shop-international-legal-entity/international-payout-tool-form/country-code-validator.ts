import { FormControl } from '@angular/forms';

import { CountryCodes } from '../country-codes';

export const countryCodeValidator = (control: FormControl) =>
    CountryCodes[control.value] !== undefined ? null : { unknownCountryCode: true };
