import { Suggest } from './suggestions';

interface LocationBase {
    kladr_id?: string;
}

enum Bound {
    region = 'region',
    area = 'area',
    city = 'city',
    settlement = 'settlement',
    street = 'street',
    house = 'house'
}

export interface Params {
    locations?: Array<
        LocationBase & {
            [name: string]: any;
        }
    >;
    locations_boost?: LocationBase[];
    from_bound?: { value: Bound };
    to_bound?: { value: Bound };
    restrict_value?: boolean;
}

export interface Data {
    inn: string;
    kpp: string;
    ogrn: string;
    ogrn_date: string;
    hid: string;
    [name: string]: any;
}

export type AddressSuggest = Suggest<Params, Data>;
