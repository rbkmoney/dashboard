import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import {
    DaDataService as DaDataApiService,
    DaDataRequest,
    PartyQuery,
    FioQuery,
    AddressQuery,
    FmsUnitQuery,
    OkvedQuery,
    BankQuery,
    PartyResponse,
    FioResponse,
    AddressResponse,
    FmsUnitResponse,
    OkvedResponse,
    BankResponse,
    DaDataResponse
} from '../../api-codegen/aggr-proxy';
import { Omit, Mapping } from '../../../type-utils';

const RequestType = DaDataRequest.DaDataRequestTypeEnum;
type RequestType = DaDataRequest.DaDataRequestTypeEnum;

type FullParamsByRequestType = Mapping<
    RequestType,
    DaDataRequest,
    {
        AddressQuery: AddressQuery;
        BankQuery: BankQuery;
        FioQuery: FioQuery;
        FmsUnitQuery: FmsUnitQuery;
        OkvedQuery: OkvedQuery;
        PartyQuery: PartyQuery;
    }
>;

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

export type ParamsByRequestType = {
    [name in RequestType]: Omit<FullParamsByRequestType[name], 'daDataRequestType'>;
};

export type SuggestionsByRequestType = {
    [name in RequestType]: ResponseByRequestType[name]['suggestions'];
};

export type ContentByRequestType = {
    [name in RequestType]: SuggestionsByRequestType[name][number];
};

@Injectable()
export class DaDataService {
    constructor(private daDataService: DaDataApiService) {}

    suggest<T extends RequestType>(
        daDataRequestType: T,
        params: ParamsByRequestType[T]
    ): Observable<SuggestionsByRequestType[T]> {
        const requestParams = { request: { daDataRequestType, ...params } };
        const request = this.daDataService.requestDaData(requestParams) as Observable<ResponseByRequestType[T]>;
        return request.pipe(pluck('suggestions'));
    }
}
