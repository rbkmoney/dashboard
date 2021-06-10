import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import { PaymentsService, Refund, RefundParams } from '@dsh/api-codegen/capi/swagger-codegen';

@Injectable()
export class RefundService {
    constructor(private paymentsService: PaymentsService, private idsService: IdGeneratorService) {}

    createRefund(invoiceID: string, paymentID: string, refundParams: RefundParams): Observable<Refund> {
        return this.paymentsService.createRefund(this.idsService.shortUuid(), invoiceID, paymentID, refundParams);
    }

    getRefunds(invoiceID: string, paymentID: string): Observable<Refund[]> {
        return this.paymentsService.getRefunds(this.idsService.shortUuid(), invoiceID, paymentID);
    }
}
