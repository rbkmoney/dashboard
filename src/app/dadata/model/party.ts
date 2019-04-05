export enum Status {
    ACTIVE = 'ACTIVE',
    LIQUIDATING = 'LIQUIDATING',
    LIQUIDATE = 'LIQUIDATED'
}

export enum Type {
    LEGAL = 'LEGAL',
    INDIVIDUAL = 'INDIVIDUAL'
}

export interface PartyParams {
    count?: number;
    status?: Status[];
    type?: Type;
    locations?: {
        kladr_id?: number;
    }[];
}
