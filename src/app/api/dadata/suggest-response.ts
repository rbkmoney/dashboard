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

type RequestType = DaDataRequest.DaDataRequestTypeEnum;

export type ResponseByRequestType = Mapping<
    RequestType,
    DaDataResponse,
    {
        /* eslint-disable @typescript-eslint/naming-convention */
        AddressQuery: AddressResponse;
        BankQuery: BankResponse;
        FioQuery: FioResponse;
        FmsUnitQuery: FmsUnitResponse;
        OkvedQuery: OkvedResponse;
        PartyQuery: PartyResponse;
        /* eslint-enable @typescript-eslint/naming-convention */
    }
>;

export type SuggestionsByRequestType = {
    [name in RequestType]: ResponseByRequestType[name]['suggestions'];
};

export type ContentByRequestType = {
    [name in RequestType]: SuggestionsByRequestType[name][number];
};
