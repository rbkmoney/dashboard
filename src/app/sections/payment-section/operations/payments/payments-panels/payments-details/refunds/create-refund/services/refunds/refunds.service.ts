import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Refund, RefundParams } from '@dsh/api-codegen/capi';
import { RefundService } from '@dsh/api/refund';

@Injectable()
export class RefundsService {
    constructor(private refundService: RefundService) {}

    createRefund(invoiceID: string, paymentID: string, params?: RefundParams): Observable<Refund> {
        return this.refundService.createRefund(invoiceID, paymentID, params);
    }
}
