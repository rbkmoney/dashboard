import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { DaDataService as DaDataApiService, DaDataRequest } from '../../api-codegen/aggr-proxy';
import { ParamsByRequestType } from './suggest-request';
import { SuggestionsByRequestType, ResponseByRequestType } from './suggest-response';

const RequestType = DaDataRequest.DaDataRequestTypeEnum;
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
