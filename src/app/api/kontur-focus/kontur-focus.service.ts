import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import {
    KonturFocusService as KonturFocusApiService,
    KonturFocusResponse,
    KonturFocusRequest,
    ReqQuery,
    EgrDetailsQuery,
    LicencesQuery,
    EgrDetailsResponses,
    ReqResponses,
    LicencesResponses
} from '../../api-codegen/aggr-proxy';
import { Mapping } from '../../../type-utils';

const RequestType = KonturFocusRequest.KonturFocusRequestTypeEnum;
type RequestType = KonturFocusRequest.KonturFocusRequestTypeEnum;

type ParamsByRequestType = Mapping<
    RequestType,
    KonturFocusRequest,
    {
        ReqQuery: ReqQuery;
        EgrDetailsQuery: EgrDetailsQuery;
        LicencesQuery: LicencesQuery;
    }
>;

export type ResponsesByRequestType = Mapping<
    RequestType,
    KonturFocusResponse,
    {
        ReqQuery: ReqResponses;
        EgrDetailsQuery: EgrDetailsResponses;
        LicencesQuery: LicencesResponses;
    }
>;

@Injectable()
export class KonturFocusService {
    constructor(private konturFocusService: KonturFocusApiService) {}

    request<T extends RequestType>(
        konturFocusRequestType: T,
        requestParams: Partial<Omit<ParamsByRequestType[T], 'konturFocusRequestType'>>
    ): Observable<ResponsesByRequestType[T]['responses']> {
        return this.konturFocusService
            .requestKonturFocus({ request: { konturFocusRequestType, ...requestParams } })
            .pipe(pluck('responses'));
    }
}
