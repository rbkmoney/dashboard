import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { DaDataRequest, DaDataService as DaDataApiService } from '@dsh/api-codegen/aggr-proxy';

import { ParamsByRequestType } from './suggest-request';
import { ResponseByRequestType, SuggestionsByRequestType } from './suggest-response';

const RequestType = DaDataRequest.DaDataRequestTypeEnum; // can be removed
type RequestType = DaDataRequest.DaDataRequestTypeEnum;

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
