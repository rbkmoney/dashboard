import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentService } from '../../../../api';
import { CaptureParams } from '../../../../api-codegen/capi/swagger-codegen';

@Injectable()
export class ConfirmHoldService {
    constructor(private paymentService: PaymentService) {}

    capturePayment(invoiceID: string, paymentID: string, params: CaptureParams): Observable<void> {
        return this.paymentService.capturePayment(invoiceID, paymentID, params);
    }
}
