import { Country } from '@dsh/api-codegen/capi';

export type CountryId = Country['id'];
export type CountryName = Country['name'];
export type DisplayWithFn = (value: CountryId) => string;
