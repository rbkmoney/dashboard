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
    BankResponse,
    DaDataResponse
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

export interface Suggestion {
    value?: string;
    unrestrictedValue?: string;
}

interface Response extends DaDataResponse {
    suggestions?: Suggestion[];
}

@Injectable()
export class DaDataService {
    constructor(private daDataService: DaDataApiService) {}

    suggest<Req extends { query?: string; count?: number }>(
        daDataRequestType: DaDataRequest.DaDataRequestTypeEnum,
        request: Req
    ) {
        return this.daDataService.requestDaData({
            endpoint: endpointByRequestType[daDataRequestType],
            request: { daDataRequestType, ...request }
        }) as Observable<Response>;
    }

    suggestParty(query: PartyQuery): Observable<PartyResponse> {
        return this.suggest(DaDataRequestType.PartyQuery, query);
    }

    suggestFio(query: FioQuery): Observable<FioResponse> {
        return this.suggest(DaDataRequestType.FioQuery, query);
    }

    suggestAddress(query: AddressQuery): Observable<AddressResponse> {
        return this.suggest(DaDataRequestType.AddressQuery, query);
    }

    suggestFmsUnit(query: FmsUnitQuery): Observable<FmsUnitResponse> {
        return this.suggest(DaDataRequestType.FmsUnitQuery, query);
    }

    suggestOkved(query: OkvedQuery): Observable<OkvedResponse> {
        return this.suggest(DaDataRequestType.OkvedQuery, query);
    }

    suggestBank(query: BankQuery): Observable<BankResponse> {
        return this.suggest(DaDataRequestType.BankQuery, query);
    }
}
