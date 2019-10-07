import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    DaDataService as DaDataApiService,
    DaDataEndpoint,
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

const DaDataRequestType = DaDataRequest.DaDataRequestTypeEnum;

const endpointByRequestType = {
    [DaDataRequestType.AddressQuery]: DaDataEndpoint.SuggestAddress,
    [DaDataRequestType.BankQuery]: DaDataEndpoint.SuggestBank,
    [DaDataRequestType.FioQuery]: DaDataEndpoint.SuggestFio,
    [DaDataRequestType.FmsUnitQuery]: DaDataEndpoint.SuggestFmsUnit,
    [DaDataRequestType.OkvedQuery]: DaDataEndpoint.Okved2,
    [DaDataRequestType.PartyQuery]: DaDataEndpoint.SuggestParty
};

@Injectable()
export class DaDataService {
    constructor(private daDataService: DaDataApiService) {}

    suggestParty(query: PartyQuery): Observable<PartyResponse> {
        return this.request(DaDataRequestType.PartyQuery, query);
    }

    suggestFio(query: FioQuery): Observable<FioResponse> {
        return this.request(DaDataRequestType.FioQuery, query);
    }

    suggestAddress(query: AddressQuery): Observable<AddressResponse> {
        return this.request(DaDataRequestType.AddressQuery, query);
    }

    suggestFmsUnit(query: FmsUnitQuery): Observable<FmsUnitResponse> {
        return this.request(DaDataRequestType.FmsUnitQuery, query);
    }

    suggestOkved(query: OkvedQuery): Observable<OkvedResponse> {
        return this.request(DaDataRequestType.OkvedQuery, query);
    }

    suggestBank(query: BankQuery): Observable<BankResponse> {
        return this.request(DaDataRequestType.BankQuery, query);
    }

    private request(daDataRequestType: DaDataRequest.DaDataRequestTypeEnum, request: DaDataRequest) {
        return this.daDataService.requestDaData({
            endpoint: endpointByRequestType[daDataRequestType],
            request: { daDataRequestType, ...request }
        });
    }
}
