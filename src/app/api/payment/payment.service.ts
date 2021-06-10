import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import { CaptureParams, Payment, PaymentsService } from '@dsh/api-codegen/capi/swagger-codegen';

@Injectable()
export class PaymentService {
    constructor(private paymentsService: PaymentsService, private idGenerator: IdGeneratorService) {}

    cancelPayment(invoiceID: string, paymentID: string, reason: string): Observable<void> {
        return this.paymentsService.cancelPayment(this.idGenerator.shortUuid(), invoiceID, paymentID, { reason });
    }

    capturePayment(invoiceID: string, paymentID: string, params: CaptureParams): Observable<void> {
        return this.paymentsService.capturePayment(this.idGenerator.shortUuid(), invoiceID, paymentID, params);
    }

    getPaymentByID(invoiceID: string, paymentID: string): Observable<Payment> {
        return this.paymentsService.getPaymentByID(this.idGenerator.shortUuid(), invoiceID, paymentID);
    }

    getPayments(invoiceID: string): Observable<Payment[]> {
        return this.paymentsService.getPayments(this.idGenerator.shortUuid(), invoiceID);
    }
}
