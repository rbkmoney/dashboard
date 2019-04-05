import { Suggest } from './suggestions';
import { AddressSuggest } from './address';

export enum Status {
    ACTIVE = 'ACTIVE',
    LIQUIDATING = 'LIQUIDATING',
    LIQUIDATE = 'LIQUIDATED'
}

export enum Type {
    LEGAL = 'LEGAL',
    INDIVIDUAL = 'INDIVIDUAL'
}

export interface Params {
    count?: number;
    status?: Status[];
    type?: Type;
    locations?: {
        kladr_id: number;
    }[];
}

export interface Data {
    address: AddressSuggest;
    [name: string]: any;
}

export type PartySuggest = Suggest<Params, Data>;
