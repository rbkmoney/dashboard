import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentsService, Refund, RefundParams } from '@dsh/api-codegen/capi/swagger-codegen';
import { IdGeneratorService } from '@dsh/app/shared/services/id-generator/id-generator.service';

@Injectable()
export class RefundService {
    constructor(private paymentsService: PaymentsService, private idsService: IdGeneratorService) {}

    createRefund(invoiceID: string, paymentID: string, refundParams: RefundParams): Observable<Refund> {
        return this.paymentsService.createRefund(
            this.idsService.generateRequestID(),
            invoiceID,
            paymentID,
            refundParams
        );
    }

    getRefunds(invoiceID: string, paymentID: string): Observable<Refund[]> {
        return this.paymentsService.getRefunds(this.idsService.generateRequestID(), invoiceID, paymentID);
    }
}
