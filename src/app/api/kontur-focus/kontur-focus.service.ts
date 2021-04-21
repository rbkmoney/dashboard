import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import {
    BeneficialOwnerQuery,
    BeneficialOwnerResponses,
    EgrDetailsQuery,
    EgrDetailsResponses,
    KonturFocusRequest,
    KonturFocusResponse,
    KonturFocusService as KonturFocusApiService,
    LicencesQuery,
    LicencesResponses,
    ReqQuery,
    ReqResponses,
} from '@dsh/api-codegen/aggr-proxy';

import { Mapping } from '../../../type-utils';

type RequestType = KonturFocusRequest.KonturFocusRequestTypeEnum;

type ParamsByRequestType = Mapping<
    RequestType,
    KonturFocusRequest,
    {
        /* eslint-disable @typescript-eslint/naming-convention */
        ReqQuery: ReqQuery;
        EgrDetailsQuery: EgrDetailsQuery;
        LicencesQuery: LicencesQuery;
        BeneficialOwnerQuery: BeneficialOwnerQuery;
        /* eslint-enable @typescript-eslint/naming-convention */
    }
>;

export type ResponsesByRequestType = Mapping<
    RequestType,
    KonturFocusResponse,
    {
        /* eslint-disable @typescript-eslint/naming-convention */
        ReqQuery: ReqResponses;
        EgrDetailsQuery: EgrDetailsResponses;
        LicencesQuery: LicencesResponses;
        BeneficialOwnerQuery: BeneficialOwnerResponses;
        /* eslint-enable @typescript-eslint/naming-convention */
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
