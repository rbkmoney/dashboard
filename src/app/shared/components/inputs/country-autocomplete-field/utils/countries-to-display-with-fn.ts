import { Country } from '@dsh/api-codegen/capi';

import { DisplayWithFn, CountryId, CountryName } from '../types';

const toMap = (countries: Country[]): Map<CountryId, CountryName> => {
    const result = new Map<CountryId, CountryName>();
    for (const { id, name } of countries) {
        result.set(id, name);
    }
    return result;
};

export const countriesToDisplayWithFn = (countries: Country[]): DisplayWithFn => {
    const map = toMap(countries);
    return (countryId: CountryId): string => {
        const countryName = map.get(countryId);
        return countryName && `${countryId} - ${countryName}`;
    };
};
