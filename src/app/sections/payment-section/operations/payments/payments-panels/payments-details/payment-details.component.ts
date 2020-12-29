import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import isNil from 'lodash.isnil';
import isObject from 'lodash.isobject';
import { Observable } from 'rxjs';

import { Invoice } from '@dsh/api-codegen/capi';
import { ComponentChange, ComponentChanges } from '@dsh/type-utils';

import { Payment } from '../../types/payment';
import { InvoiceDetailsService } from './services/invoice-details.service';

@Component({
    selector: 'dsh-payment-details',
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDetailsComponent implements OnChanges {
    @Input() payment: Payment;

    invoiceInfo$: Observable<Invoice> = this.invoiceDetails.invoice$;

    constructor(private invoiceDetails: InvoiceDetailsService) {}

    ngOnChanges(changes: ComponentChanges<PaymentDetailsComponent>): void {
        if (isObject(changes.payment)) {
            this.updatePayment(changes.payment);
        }
    }

    private updatePayment({ currentValue: payment }: ComponentChange<PaymentDetailsComponent, 'payment'>): void {
        if (isNil(payment)) {
            return;
        }
        this.invoiceDetails.setInvoiceID(payment.invoiceID);
    }
}
