import { Injectable } from '@angular/core';

import {
    DaDataService as DaDataApiService,
    DaDataEndpoint,
    DaDataRequest,
    PartyQuery,
    FioQuery,
    AddressQuery,
    FmsUnitQuery,
    OkvedQuery,
    BankQuery
} from '../../api-codegen/aggr-proxy';

const DaDataRequestType = DaDataRequest.DaDataRequestTypeEnum;

@Injectable()
export class DaDataService {
    constructor(private daDataService: DaDataApiService) {}

    suggestParty(query: PartyQuery) {
        return this.request(DaDataRequestType.PartyQuery, query);
    }

    suggestFio(query: FioQuery) {
        return this.request(DaDataRequestType.FioQuery, query);
    }

    suggestAddress(query: AddressQuery) {
        return this.request(DaDataRequestType.AddressQuery, query);
    }

    suggestFmsUnit(query: FmsUnitQuery) {
        return this.request(DaDataRequestType.FmsUnitQuery, query);
    }

    suggestOkved(query: OkvedQuery) {
        return this.request(DaDataRequestType.OkvedQuery, query);
    }

    suggestBank(query: BankQuery) {
        return this.request(DaDataRequestType.BankQuery, query);
    }

    private request(daDataRequestType: DaDataRequest.DaDataRequestTypeEnum, request: DaDataRequest) {
        const endpointByRequestType = {
            [DaDataRequestType.AddressQuery]: DaDataEndpoint.SuggestAddress,
            [DaDataRequestType.BankQuery]: DaDataEndpoint.SuggestBank,
            [DaDataRequestType.FioQuery]: DaDataEndpoint.SuggestFio,
            [DaDataRequestType.FmsUnitQuery]: DaDataEndpoint.SuggestFmsUnit,
            [DaDataRequestType.OkvedQuery]: DaDataEndpoint.Okved2,
            [DaDataRequestType.PartyQuery]: DaDataEndpoint.SuggestParty
        }[daDataRequestType];
        return this.daDataService.requestDaData({
            endpoint: endpointByRequestType,
            request: { daDataRequestType, ...request }
        });
    }
}
