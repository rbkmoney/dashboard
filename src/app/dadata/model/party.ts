import { Suggest, SuggestionData } from './suggestions';
import { SuggestionType } from './type';

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
    address: SuggestionData<SuggestionType.address>;
    [name: string]: any;
}

export type PartySuggest = Suggest<Params, Data>;
