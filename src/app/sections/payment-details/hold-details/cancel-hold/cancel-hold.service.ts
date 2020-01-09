import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentService } from '../../../../api';

@Injectable()
export class CancelHoldService {
    constructor(private paymentService: PaymentService) {}

    cancelPayment(invoiceID: string, paymentID: string, reason: string): Observable<void> {
        return this.paymentService.cancelPayment(invoiceID, paymentID, reason);
    }
}
