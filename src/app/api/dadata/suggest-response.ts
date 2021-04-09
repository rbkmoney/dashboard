import {
    AddressResponse,
    BankResponse,
    DaDataRequest,
    DaDataResponse,
    FioResponse,
    FmsUnitResponse,
    OkvedResponse,
    PartyResponse,
} from '@dsh/api-codegen/aggr-proxy';

import { Mapping } from '../../../type-utils';

const RequestType = DaDataRequest.DaDataRequestTypeEnum; // can be safely removed
type RequestType = DaDataRequest.DaDataRequestTypeEnum;

export type ResponseByRequestType = Mapping<
    RequestType,
    DaDataResponse,
    {
        AddressQuery: AddressResponse;
        BankQuery: BankResponse;
        FioQuery: FioResponse;
        FmsUnitQuery: FmsUnitResponse;
        OkvedQuery: OkvedResponse;
        PartyQuery: PartyResponse;
    }
>;

export type SuggestionsByRequestType = {
    [name in RequestType]: ResponseByRequestType[name]['suggestions'];
};

export type ContentByRequestType = {
    [name in RequestType]: SuggestionsByRequestType[name][number];
};
