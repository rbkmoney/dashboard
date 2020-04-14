import { Mapping } from '../../../type-utils';
import {
    AddressResponse,
    BankResponse,
    DaDataRequest,
    DaDataResponse,
    FioResponse,
    FmsUnitResponse,
    OkvedResponse,
    PartyResponse
} from '../../api-codegen/aggr-proxy';

const RequestType = DaDataRequest.DaDataRequestTypeEnum;
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
