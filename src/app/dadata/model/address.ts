import { Suggest } from './suggestions';

// tslint:disable-next-line:no-empty-interface
export interface Params {}

// tslint:disable-next-line:no-empty-interface
export interface Data {}

export type AddressSuggest = Suggest<Params, Data>;
