import { FormControl } from '@angular/forms';

import { CountryCodes } from '../../types/country-codes';

export const countryCodeValidator = (control: FormControl) =>
    CountryCodes[control.value] !== undefined || !control.value ? null : { unknownCountryCode: true };
