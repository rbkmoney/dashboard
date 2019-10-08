import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
import { Suggestion } from './suggestion';

const DaDataRequestType = DaDataRequest.DaDataRequestTypeEnum;
type DaDataRequestType = DaDataRequest.DaDataRequestTypeEnum;

interface Request {
    query?: string;
    count?: number;
}

interface Response extends DaDataResponse {
    suggestions?: Suggestion[];
}

@Injectable()
export class DaDataService {
    constructor(private daDataService: DaDataApiService) {}

    suggest<Q extends Request, S extends Response>(daDataRequestType: DaDataRequestType, request: Q) {
        return this.daDataService.requestDaData({
            request: { daDataRequestType, ...request }
        }) as Observable<S>;
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
