import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    BankResponse
} from '../../api-codegen/aggr-proxy';
import { Omit } from '../../../type-utils';

const RequestType = DaDataRequest.DaDataRequestTypeEnum;
type RequestType = DaDataRequest.DaDataRequestTypeEnum;

type ByRequestType<P extends { [name in RequestType]: any }> = { [name in RequestType]: P[name] };

type FullParamsByRequestType = ByRequestType<{
    AddressQuery: AddressQuery;
    BankQuery: BankQuery;
    FioQuery: FioQuery;
    FmsUnitQuery: FmsUnitQuery;
    OkvedQuery: OkvedQuery;
    PartyQuery: PartyQuery;
}>;

export type ParamsByRequestType = {
    [name in RequestType]: Omit<FullParamsByRequestType[name], 'daDataRequestType'>;
};

export type ResponseByRequestType = ByRequestType<{
    AddressQuery: AddressResponse;
    BankQuery: BankResponse;
    FioQuery: FioResponse;
    FmsUnitQuery: FmsUnitResponse;
    OkvedQuery: OkvedResponse;
    PartyQuery: PartyResponse;
}>;

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
        const request = this.daDataService.requestDaData({
            request: { daDataRequestType, ...params }
        }) as Observable<ResponseByRequestType[T]>;
        return request.pipe(map(({ suggestions }) => suggestions));
    }
}
