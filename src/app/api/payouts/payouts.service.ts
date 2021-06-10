import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import {
    Payout,
    PayoutParams,
    PayoutsService as PayoutsAPIService,
    PayoutTool,
} from '@dsh/api-codegen/capi/swagger-codegen';

@Injectable()
export class PayoutsService {
    constructor(private payoutsService: PayoutsAPIService, private idGenerator: IdGeneratorService) {}

    createPayout(params: PayoutParams): Observable<Payout> {
        return this.payoutsService.createPayout(this.idGenerator.shortUuid(), params);
    }

    getPayoutTools(contractID: string): Observable<PayoutTool[]> {
        return this.payoutsService.getPayoutTools(this.idGenerator.shortUuid(), contractID);
    }

    getPayoutToolByID(contractID: string, payoutToolID: string): Observable<PayoutTool> {
        return this.payoutsService.getPayoutToolByID(this.idGenerator.shortUuid(), contractID, payoutToolID);
    }
}
