import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Mapping } from '../../../type-utils';
import {
    EgrDetailsQuery,
    EgrDetailsResponses,
    KonturFocusRequest,
    KonturFocusResponse,
    KonturFocusService as KonturFocusApiService,
    LicencesQuery,
    LicencesResponses,
    ReqQuery,
    ReqResponses
} from '../../api-codegen/aggr-proxy';

const RequestType = KonturFocusRequest.KonturFocusRequestTypeEnum;
type RequestType = KonturFocusRequest.KonturFocusRequestTypeEnum;

type ParamsByRequestType = Mapping<
    RequestType,
    KonturFocusRequest,
    {
        ReqQuery: ReqQuery;
        EgrDetailsQuery: EgrDetailsQuery;
        LicencesQuery: LicencesQuery;
        BeneficialOwnerQuery: KonturFocusRequest;
    }
>;

export type ResponsesByRequestType = Mapping<
    RequestType,
    KonturFocusResponse,
    {
        ReqQuery: ReqResponses;
        EgrDetailsQuery: EgrDetailsResponses;
        LicencesQuery: LicencesResponses;
        BeneficialOwnerQuery: KonturFocusResponse;
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
