import { Injectable } from '@angular/core';

import { PayoutsService as PayoutsAPIService } from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../utils';

@Injectable()
export class PayoutsService {
    constructor(private payoutsService: PayoutsAPIService) {}

    getPayoutToolByID(contractID: string, payoutToolID: string) {
        return this.payoutsService.getPayoutToolByID(genXRequestID(), contractID, payoutToolID);
    }
}
