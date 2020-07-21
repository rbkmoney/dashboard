import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    Payout,
    PayoutParams,
    PayoutsService as PayoutsAPIService,
    PayoutTool,
} from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../utils';

@Injectable()
export class PayoutsService {
    constructor(private payoutsService: PayoutsAPIService) {}

    createPayout(params: PayoutParams): Observable<Payout> {
        return this.payoutsService.createPayout(genXRequestID(), params);
    }

    getPayoutTools(contractID: string): Observable<PayoutTool[]> {
        return this.payoutsService.getPayoutTools(genXRequestID(), contractID);
    }

    getPayoutToolByID(contractID: string, payoutToolID: string) {
        return this.payoutsService.getPayoutToolByID(genXRequestID(), contractID, payoutToolID);
    }
}
