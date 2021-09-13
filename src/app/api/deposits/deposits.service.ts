import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import {
    DepositsService as ApiDepositsService,
    InlineResponse2001,
    InlineResponse2002,
} from '@dsh/api-codegen/wallet-api/swagger-codegen';

import { toDateLike } from '../utils';
import { DepositsSearchParams } from './deposits-search-params';

export type DepositsWithToken = InlineResponse2002;
export type DepositRevertsWithToken = InlineResponse2001;

@Injectable()
export class DepositsService {
    constructor(private depositsService: ApiDepositsService, private idGenerator: IdGeneratorService) {}

    listDeposits(params: DepositsSearchParams, limit = 20, continuationToken?: string): Observable<DepositsWithToken> {
        return this.depositsService.listDeposits(
            this.idGenerator.shortUuid(),
            limit,
            undefined,
            params.walletID,
            params.identityID,
            params.depositID,
            params.sourceID,
            params.status,
            params.fromTime ? toDateLike(params.fromTime) : undefined,
            params.toTime ? toDateLike(params.toTime) : undefined,
            params.amountFrom,
            params.amountTo,
            params.currencyID,
            continuationToken
        );
    }

    listDepositReverts(
        params: DepositsSearchParams,
        limit = 20,
        continuationToken?: string
    ): Observable<DepositRevertsWithToken> {
        return this.depositsService.listDepositReverts(
            this.idGenerator.shortUuid(),
            limit,
            undefined,
            params.walletID,
            params.identityID,
            params.depositID,
            params.sourceID,
            params.status,
            params.fromTime ? toDateLike(params.fromTime) : undefined,
            params.toTime ? toDateLike(params.toTime) : undefined,
            params.amountFrom,
            params.amountTo,
            params.currencyID,
            continuationToken
        );
    }
}
