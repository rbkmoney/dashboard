import {
    DaDataRequest,
    PartyResponse,
    FioResponse,
    AddressResponse,
    FmsUnitResponse,
    OkvedResponse,
    BankResponse,
    DaDataResponse
} from '../../api-codegen/aggr-proxy';
import { Mapping } from '../../../type-utils';

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
