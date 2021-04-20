import { Injectable } from '@angular/core';

import { isNil } from '@dsh/utils';

import { CountryCodes } from './types/country-codes';

@Injectable()
export class CountryCodesService {
    getCountryCode(country: string): number {
        const code = CountryCodes[country];
        if (isNil(code)) {
            throw new Error(`Can't get code for country [${country}]`);
        }
        return code;
    }

    getCountryByCode(code: number): string {
        const country = CountryCodes[code];
        if (isNil(country)) {
            throw new Error(`Can't get country using code [${code}]`);
        }
        return country;
    }

    isCodeExist(code: number): boolean {
        try {
            this.getCountryByCode(code);
            return true;
        } catch (e) {
            return false;
        }
    }

    isCountryExist(country: string): boolean {
        try {
            this.getCountryCode(country);
            return true;
        } catch (e) {
            return false;
        }
    }
}
