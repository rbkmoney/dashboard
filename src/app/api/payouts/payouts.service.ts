import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    Payout,
    PayoutParams,
    PayoutsService as ApiPayoutsService,
    PayoutTool,
} from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../utils';

@Injectable()
export class PayoutsService {
    constructor(private payoutsService: ApiPayoutsService) {}

    createPayout(params: PayoutParams): Observable<Payout> {
        return this.payoutsService.createPayout(genXRequestID(), params);
    }

    getPayoutTools(contractID: string): Observable<PayoutTool[]> {
        return this.payoutsService.getPayoutTools(genXRequestID(), contractID);
    }
}
